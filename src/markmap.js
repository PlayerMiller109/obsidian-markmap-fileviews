const mmViewType = 'mm-fileview', mmIcon = 'star'
module.exports = (app, ob)=> {
  const md2htmlText = require('./utils/getTextForTransform.js')(app, ob)
  const genMM = require('./utils/genMM.js')(app, ob), genMM2 = (ob.debounce)(genMM)
  class mmView extends ob.FileView {
    onload() {
      setTimeout(async ()=> await this.updateLeaf(this.file)); this.genPinBtn()
      this.registerEvent(
        this.app.vault.on('modify', async file=>
          file.path == this.file?.path && await this.updateLeaf(file)
        ),
      )
    }
    updateLeaf = async file=> {
      if (file?.extension != 'md') return
      const mdLines = (await app.vault.read(file)).split('\n')
      , { frontmatterPosition: fmPos } = app.metadataCache.getFileCache(file)
      if (fmPos) mdLines.splice(0, fmPos.end.line+1)
      const text = await md2htmlText(mdLines.join('\n'), file.path)
      await genMM2(this.contentEl, text, file.path)
      this.leaf.view.titleEl.textContent = file.name
      this.leaf.tabHeaderInnerTitleEl.textContent = file.name
    }
    onFileOpen = async file=> (this.file = file, await this.updateLeaf(file))
    navigation = !1
    genPinBtn = ()=> {
      if (this.navigation) this.leaf.setPinned(!0); this.setUnpin()
      this.leaf.view.addAction('pin', 'Pin mindmap source file', evt=> {
        this.pinned = !this.pinned
        evt.target.style.color = this.pinned ? 'var(--color-purple)' : 'var(--icon-color)'
        this.pinned ? this.offUnpin() : this.setUnpin()
      })
    }
    setUnpin = ()=> this.registerEvent(this.app.workspace.on('file-open', this.onFileOpen))
    offUnpin = ()=> this.app.workspace.off('file-open', this.onFileOpen)
    getViewType() { return mmViewType }
    getDisplayText() { return this.file?.name || 'Markmap' }
    getIcon() { return mmIcon }
  }
  const blockParser = async (source, el, ctx)=> {
    const fmRgx = new RegExp(String.raw`---\nmarkmap:\n  height: (\d+)\n---\n`, '')
    let height
    const md = source.replace(fmRgx, (m, p1)=> { height = p1; return '' })
    const text = await md2htmlText(md, ctx.sourcePath)
    if (ctx.el.parentNode?.className == 'print') {
      const svg = await genMM(el, text, ctx.sourcePath)
      const img = Object.assign(new Image(), {src: await svg2src(svg)})
      img.onload = ()=> { el.empty(); el.append(img) }
    } else setTimeout(async ()=> {
      el.style.height = `${height || 400}px`
      await genMM(el, text, ctx.sourcePath)
    })
  }
  return function() {
    this.registerView(mmViewType, leaf=> new mmView(leaf))
    this.registerMarkdownCodeBlockProcessor('markmap', blockParser)
    this.addCommand({
      id: 'mm-active-note', name: 'Markmap active note',
      callback: async ()=> {
        const view = app.workspace.getActiveFileView()
        const leaf = app.workspace.getLeaf('split')
        await leaf.setViewState({ type: mmViewType, state: {file: view.path} })
      },
      hotkeys: [{modifiers: ['Mod'], key: 'M'}],
    })
    // compatible with excalidraw when "Delete file"
    app.plugins.plugins = new Proxy(app.plugins.plugins, {
      get: (target, prop)=> !!(prop == 'obsidian-hover-editor')||target[prop]
    })
  }
}
const mmViewType = 'mm-fileview', mmIcon = 'star'
module.exports = (plg, ob)=> {
  const { app } = plg
  const md2htmlText = require('./getText/md2htmlText.js')(app, ob)
  const { genMM2 } = require('./genMM.js')(app, ob)
  class mmView extends ob.FileView {
    onload() {
      setTimeout(async ()=> await this.updateLeaf(this.file))
      this.genPinBtn()
      this.registerEvent(
        this.app.vault.on('modify', async file=> {
          file.path == this.file?.path && await this.updateLeaf(file)
        }),
      )
    }
    updateLeaf = async file=> {
      if (file?.extension != 'md') return
      const mdLines = (await this.app.vault.read(file)).split('\n')
      , { frontmatterPosition: fmPos } = this.app.metadataCache.getFileCache(file)
      if (fmPos) mdLines.splice(0, fmPos.end.line+1)

      const text = await md2htmlText(mdLines.join('\n'), file.path)
      await genMM2(this.contentEl, text, file.path, {})
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
  plg.registerView(mmViewType, leaf=> new mmView(leaf))
  plg.addCommand({
    id: 'mm-active-note', name: 'Markmap active note',
    callback: async ()=> {
      const view = app.workspace.getActiveFileView()
      const leaf = app.workspace.getLeaf('split')
      await leaf.setViewState({ type: mmViewType, state: {file: view.path} })
    },
    hotkeys: [{modifiers: ['Mod'], key: 'M'}],
  })
}
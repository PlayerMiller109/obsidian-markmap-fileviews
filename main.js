const dataJson = {
  handlePagePreview: !1,
  colors: ['#cb4b16', '#859900', '#b58900'],
  jsonOpts: {
    maxWidth: 700,
  },
  imgAbbr: 'png',
}
, mmViewType = 'mm-fileview', mmIcon = 'star'
, forExport = `
  svg.markmap {
    --markmap-text-color: #222;
    --markmap-highlight-bg: rgba(255, 208, 0, 0.4);
    background-color: #fff;
  }
  .markmap-foreign.markmap-foreign {
    & code {white-space: pre-wrap;}
    & .copy-code-button {display: none;}
  }
`
const import_poper = (app, ob)=> {
  const userLeaf = (ctx, parent, linkpath, rPath)=> class extends ob.WorkspaceLeaf {
    initial_num = {width: 576, height: 480}
    initial = {width: `${this.initial_num.width}px`, height: `${this.initial_num.height}px`}
    load = async ()=> {
      parent.setCssProps(this.initial)
      const wrapper = parent.createDiv()
      this.containerEl.setCssProps({height: '100%'})
      wrapper.setCssProps({width: '100%'})
      wrapper.append(this.containerEl)
      await this.openLinkText(linkpath, rPath)
      this.genUserEls()
      this.view.headerEl.children[1].onmousedown = this.onDrag
      this.view.contentEl.onmousedown = this.onDrag
    }
    onDrag = (evt)=> {
      this.togglePin(!0); if (!evt.ctrlKey) return
      let { clientX: clickX, clientY: clickY } = evt
      const updatePosition = moveEvt=> {
        const { clientX, clientY } = moveEvt
        parent.setCssProps({
          left: `${parent.offsetLeft + clientX - clickX}px`,
          top: `${parent.offsetTop + clientY - clickY}px`,
        })
        clickX = clientX; clickY = clientY
      }
      const document = evt.target.ownerDocument
      document.addEventListener('mousemove', updatePosition)
      document.addEventListener('mouseup', function listener() {
        document.removeEventListener('mousemove', updatePosition)
        document.removeEventListener('mouseup', listener)
      }, {once: !0})
    }
    genUserEls = ()=> {
      const leftEl = this.view.headerEl.children[0]
      leftEl.empty(); this.leftEl = leftEl
      this.genPinEl(); this.genMaxEl(); this.genMinEl()
    }
    genPinEl = ()=> {
      this.pinEl = this.leftEl.createEl('button', 'pin-icon clickable-icon')
      ob.setIcon(this.pinEl, 'pin-off')
      this.pinEl.onclick = ()=> this.togglePin(!ctx.pinned)
    }
    togglePin = pinned=> (ctx.pinned = pinned, ob.setIcon(this.pinEl, 'pin'))
    genMaxEl = ()=> {
      let isMax = !1
      const maxBtn = this.leftEl.createEl('button', 'clickable-icon')
      , syncMaxEl = ()=> {
        isMax = !isMax
        ob.setIcon(maxBtn, isMax ? 'maximize' : 'minimize')
        maxBtn.ariaLabel = isMax ? 'Maximize' : 'Restore'
      }
      syncMaxEl()
      maxBtn.onclick = evt=> {
        if (!ctx.pinned) this.togglePin(!0)
        const { view: { innerWidth, innerHeight } } = evt
        parent.setCssProps(isMax ? {
          left: '42px', top: '28px', 'max-height': 'unset',
          width: `${Math.max(innerWidth * 0.9, this.initial_num.width)}px`,
          height: `${Math.max(innerHeight * 0.9, this.initial_num.height)}px`,
        } : {left: `${innerWidth - 42 - this.initial_num.width}px`, ...this.initial})
        syncMaxEl()
      }
    }
    genMinEl = ()=> {
      let isMin = !1
      this.view.addAction('minus', 'Minimize', ()=> {
        if (!ctx.pinned) this.togglePin(!0)
        isMin = !isMin
        parent.setCssProps({height: isMin ? '42px' : this.initial.height})
      })
    }
  }
  return class Poper extends ob.HoverPopover {
    constructor({view, target}) {
      super(view, target, 140); this.hoverEl.addClass('ample')
    }
    openLink = async (linkpath, rPath)=> {
      const file = app.metadataCache.getFirstLinkpathDest(linkpath.split('#')[0], rPath)
      let u1; if (file) u1 = app.embedRegistry.getEmbedCreator(file)
      if (file && u1) await new (userLeaf(this, this.hoverEl, linkpath, rPath))(app).load();
      else this.blank()
    }
    blank = ()=> {
      this.hoverEl.setCssProps({width: '24px', 'align-items': 'center'})
      ob.setIcon(this.hoverEl, 'coffee')
    }
    hide = ()=> {
      if (this.pinned) return
      this.state = ob.PopoverState.Hidden
      this.hoverEl.detach()
      if (this.targetEl) {
        this.targetEl.removeEventListener('mouseover', this.onMouseIn)
        this.targetEl.removeEventListener('mouseout', this.onMouseOut)
        this.onTarget = this.onHover = !1
      }
      this.onHide(); this.unload()
    }
  }
}
const import_patch = (app, ob)=> {
  const Poper = import_poper(app, ob)
  function userHover(view, target, linkpath, rPath) {
    let a1 = view.hoverPopover, isCtrlKeyDown = !0
    if (a1 && a1.state !== ob.PopoverState.Hidden && a1.targetEl === target) return
    const document = target.ownerDocument
    document.addEventListener('keyup', function listener(evt) {
      if (evt.key == 'Control') isCtrlKeyDown = !1
      document.removeEventListener('keyup', listener)
    }, {once: !0})
    if (this.timeoutId) clearTimeout(this.timeoutId)
    this.timeoutId = setTimeout(()=> {
      if (!isCtrlKeyDown) return
      a1 = new Poper({view, target}); a1.openLink(linkpath, rPath)
      this.timeoutId = void 0
    }, 280)
  }
  return function patcher() {
    const PagePreview = app.internalPlugins.plugins['page-preview']
    if (!PagePreview.enabled) return
    const _constr = PagePreview.instance.constructor
    const { onLinkHover: old1 } = _constr.prototype
    Object.assign(_constr.prototype, {onLinkHover: userHover})
    PagePreview.disable(); PagePreview.enable()
    this.register(()=> {
      Object.assign(_constr.prototype, {onLinkHover: old1})
      PagePreview.disable(); PagePreview.enable()
    })
  }
}
const getTextForTransform = (app, ob)=> {
  const inlink2btn = dom=> dom.querySelectorAll('a.internal-link').forEach(async link=> {
    const linkpath = link.dataset.href, linktext = link.textContent
    , file = app.metadataCache.getFirstLinkpathDest(linkpath.split('#')[0], linkpath)
    if (file) link.outerHTML = `<button data-k="f" aria-label="${linkpath}">${linktext}</button>`;
    else {
      const folder = app.vault.getFolderByPath(linkpath); if (!folder) return
      link.outerHTML = `<button data-k="fd" aria-label="${folder.path}">${linktext}</button>`
    }
  })
  return md2htmlText = async (mdText, sourcePath)=> {
    const mdEl = document.createElement('div')
    await ob.MarkdownRenderer.render(app, mdText, mdEl, sourcePath, new ob.Component)
    inlink2btn(mdEl); return mdEl.innerHTML
  }
}
const afterTransform = (app, ob)=> {
  const Poper = import_poper(app, ob)
  return funcBtns = (dom, path)=> dom.querySelectorAll('button[data-k]').forEach(btn=> {
    btn.onclick = async evt=> {
      const linkpath = btn.ariaLabel
      if (btn.dataset.k == 'fd') {
        const folder = app.vault.getFolderByPath(linkpath)
        app.internalPlugins.getEnabledPluginById('file-explorer').revealInFolder(folder)
      } else new Poper(evt).openLink(linkpath, path)
    }
  })
}
const svg2src = async (svg)=> {
  const scale = 3
  , cvs = document.createElement('canvas')
  , { width, height } = svg.getBoundingClientRect()
  Object.assign(cvs, {width: width * scale, height: height * scale})
  const ctxt = cvs.getContext('2d'); ctxt.scale(scale, scale)

  const svgClone = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svgClone.innerHTML = svg.innerHTML
  for (const attr of svg.attributes) svgClone.setAttribute(attr.name, attr.value)
  svgClone.append(Object.assign(document.createElement('style'), {textContent: forExport}))

  const svgStr = unescape(encodeURI(new XMLSerializer().serializeToString(svgClone)))
  // encode-unescape to support latin1
  , img = Object.assign(new Image(), {src: `data:image/svg+xml;base64,${btoa(svgStr)}`})
  await new Promise(r=> img.onload = ()=> r(ctxt.drawImage(img, 0, 0)))
  return cvs.toDataURL(`image/${dataJson.imgAbbr}`)
}
const import_genMM = (app, ob)=> {
  const { colors } = dataJson, maxDepth = colors.length
  , opts = {
    color: ({state: s})=> s.depth <= maxDepth ? colors[s.depth-1] : colors[maxDepth-1],
    ...dataJson.jsonOpts,
  }
  , assumePath = `${app.vault.adapter.basePath}/${app.plugins.manifests['obsidian-markmap-fileviews'].dir}`
  , { Transformer } = require(assumePath + '/packs/markmap-lib@0.17.js').markmap
  , { Markmap } = require(assumePath + '/packs/markmap-view@0.17.js').markmap
  , funcBtns = afterTransform(app, ob)
  , { Toolbar } = require(assumePath + '/packs/markmap-toolbar@0.17.js').markmap
  , addBar = (wrapper, mm)=> {
    const bar = Toolbar.create(mm); bar.setBrand(!1) // hide markmap logo & url
    , exportAsImg = async (svg)=> {
      await mm.fit()
      Object.assign(document.createElement('a'), {
        download: `.${dataJson.imgAbbr}`, href: await svg2src(svg)
      }).click()
    }
    , customBtn = (bar)=> {
      bar.register({
        id: 'export-as-img', content: '', title: 'Export',
        onClick: async ()=> await exportAsImg(bar.markmap.svg['_groups'][0][0])
      })
      bar.setItems([...Toolbar.defaultItems, 'export-as-img'])
      const barEl = bar.render()
      ob.setIcon(barEl.children[4], 'download')
      barEl.children[4].firstChild.setCssProps({width: '16px', height: '20px'})
      return barEl
    }
    wrapper.append(customBtn(bar))
  }
  return genMM = async (wrapper, htmlText, sourcePath)=> {
    wrapper.empty(); const svg = wrapper.createSvg('svg')
    , lib = new Transformer(), { root } = lib.transform(htmlText)
    , mm = Markmap.create(svg, opts, root); await mm.fit()
    funcBtns(svg, sourcePath); addBar(wrapper, mm); return svg
  }
}
const import_mmPlug = (app, ob)=> {
  const patcher = import_patch(app, ob)
  const md2htmlText = getTextForTransform(app, ob), genMM = import_genMM(app, ob), genMM2 = (ob.debounce)(genMM)
  class mmView extends ob.FileView {
    onload() {
      setTimeout(async ()=> await this.updateLeaf(this.file)); this.genPinBtn()
      this.registerEvent(
        this.app.vault.on('modify', async file=> file.path == this.file?.path && await this.updateLeaf(file)),
      )
    }
    updateLeaf = async file=> {
      if (file?.extension != 'md') return; let md = await app.vault.read(file)
      const { frontmatterPosition: fmPos } = app.metadataCache.getFileCache(file)
      if (fmPos) md = md.split('\n').slice(fmPos.end.line+1).join('\n')
      await genMM2(this.contentEl, await md2htmlText(md, file.path), file.path)
      this.leaf.view.titleEl.textContent = file.name
      this.leaf.tabHeaderInnerTitleEl.textContent = file.name
    }
    onFileOpen = async file=> (this.file = file, await this.updateLeaf(file))
    genPinBtn = ()=> {
      this.leaf.setPinned(!0); this.setUnpin()
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
    let height; const md = source.replace(fmRgx, (m, p1)=> { height = p1; return '' })
    if (ctx.el.parentNode?.className =='print') {
      const svg = await genMM(el, await md2htmlText(md, ctx.sourcePath), ctx.sourcePath)
      const img = Object.assign(new Image(), {src: await svg2src(svg)})
      img.onload = ()=> { el.empty(); el.append(img) }
    } else setTimeout(async ()=> {
      el.style.height = `${height || 400}px`
      await genMM(el, await md2htmlText(md, ctx.sourcePath), ctx.sourcePath)
    })
  }
  return function() {
    if (dataJson.handlePagePreview) this.app.workspace.onLayoutReady(()=> patcher.call(this))
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
  }
}
const ob = require('obsidian')
module.exports = class extends ob.Plugin {
  onload() {
    import_mmPlug(this.app, ob).call(this)
  }
  onunload() {}
}
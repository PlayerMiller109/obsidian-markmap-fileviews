module.exports = (plugin, ob)=> {
  const { app } = plugin
  const Poper = require('./utils/poper.js')(app, ob)
  const userHover = (coreHover, view, target, linkpath, rPath, oldState)=> {
    const { subpath } = (ob.parseLinktext)(linkpath)
    if (
      subpath.startsWith('#[^') // footnote
      || subpath.startsWith('#^') // block link
    ) { coreHover(); return }
    let a1 = view.hoverPopover, isCtrlKeyDown = !0
    if (a1 && a1.state !== ob.PopoverState.Hidden && a1.targetEl === target) return
    let eState = {}
    if (oldState && target.matches('.search-result-file-match')) {
      if (oldState.scroll && !oldState.line) eState.line = oldState.scroll
    }
    const document = target.ownerDocument
    document.addEventListener('keyup', function listener(evt) {
      if (evt.key == 'Control') isCtrlKeyDown = !1
      document.removeEventListener('keyup', listener)
    }, {once: !0})
    if (this.timeoutId) clearTimeout(this.timeoutId)
    this.timeoutId = setTimeout(()=> {
      if (!isCtrlKeyDown) return
      a1 = new Poper({view, target})
      a1.openLink(linkpath, rPath, eState)
      this.timeoutId = void 0
    }, 300)
  }
  const PagePreview = app.internalPlugins.plugins['page-preview']
  if (!PagePreview.enabled) return
  const _constr = PagePreview.instance.constructor
  const { onLinkHover: old1 } = _constr.prototype
  return new class {
    load = ()=> {
      Object.assign(_constr.prototype, {onLinkHover: function() {
        const coreHover = ()=> old1.call(this, ...arguments)
        userHover(coreHover, ...arguments)
      }})
      PagePreview.disable(); PagePreview.enable()
    }
    unload = ()=> {
      Object.assign(_constr.prototype, {onLinkHover: old1})
      PagePreview.disable(); PagePreview.enable()
    }
    toggle = (flag)=> flag ? this.load() : this.unload()
    constructor() {
      this.key = 'takeover'
      this.toggle(plugin.settings[this.key])
      plugin.register(this.unload)
    }
    setted = (ctx)=> {
      const { key } = this
      ctx.base.setName(plugin.getLocl(key).name).addToggle(
        box=> box.setValue(
          plugin.settings[key]
        ).onChange(async flag=> {
          plugin.settings[key] = flag
          this.toggle(flag)
          await plugin.saveSettings()
        })
      )
    }
  }
}
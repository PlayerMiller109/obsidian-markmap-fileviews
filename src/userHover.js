module.exports = (app, ob)=> {
  const Poper = require('./utils/poper.js')(app, ob)
  const userHover = (view, target, linkpath, rPath, oldState)=> {
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
      a1 = new Poper({view, target}); a1.openLink(linkpath, rPath, eState)
      this.timeoutId = void 0
    }, 300)
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
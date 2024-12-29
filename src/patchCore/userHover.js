module.exports = (app, ob)=> {
  const Poper = require('../utils/poper.js')(app, ob)
  return (coreHover, view, target, linkpath, rPath, oldState)=> {
    const { subpath } = (ob.parseLinktext)(linkpath)
    if (
      subpath.startsWith('#[^') // footnote
      || subpath.startsWith('#^') // block link
    ) { coreHover(); return }
    let a1 = view.hoverPopover
    if (a1 && a1.state !== ob.PopoverState.Hidden && a1.targetEl === target) return
    const eState = {}
    if (oldState && target.matches('.search-result-file-match')) {
      if (oldState.scroll && !oldState.line) eState.line = oldState.scroll
    }
    const document = target.ownerDocument; let ctrlKeyDown = !0
    document.addEventListener('keyup', (evt)=> {
      if (evt.key == 'Control') ctrlKeyDown = !1
    }, {once: !0})
    if (this.timeoutId) clearTimeout(this.timeoutId)
    this.timeoutId = setTimeout(()=> {
      if (!ctrlKeyDown) return
      a1 = new Poper({view, target})
      a1.openLink(linkpath, rPath, eState)
      this.timeoutId = void 0
    }, 300)
  }
}
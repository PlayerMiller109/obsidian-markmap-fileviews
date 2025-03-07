module.exports = (app, ob)=> {
  const Poper = require('../utils/poper.js')(app, ob)
  return (coreHover, view, target, linkpath, rPath, oldState)=> {
    const { subpath } = (ob.parseLinktext)(linkpath)
    if (
      subpath.startsWith('#[^') // footnote
      || subpath.startsWith('#^') // block link
    ) { coreHover(); return }

    const a1 = view.hoverPopover
    if (
      a1 && a1.state !== ob.PopoverState.Hidden && a1.targetEl === target
    ) return // recent popover debounce

    let show = !0
    target.addEventListener('mouseleave', ()=> show = !1, {once: !0})
    target.ownerDocument.addEventListener('keyup', (evt)=> {
      if (evt.key == 'Control') show = !1
    }, {once: !0})
    if (this.timeoutId) clearTimeout(this.timeoutId)
    this.timeoutId = setTimeout(()=> {
      this.timeoutId = void 0; if (!show) return
      const eState = {}
      if (oldState && target.matches('.search-result-file-match'))
        consignState(oldState, eState)
      new Poper({view, target}).openLink(linkpath, rPath, eState)
    }, 300)
  }
}
const consignState = (oldState, eState)=> {
  if (oldState.scroll && !oldState.line) eState.line = oldState.scroll
}
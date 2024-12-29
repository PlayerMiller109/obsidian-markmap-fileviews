this.trigger = function(name) {
  // 从 `this._` 中获取与事件名称对应的事件处理器列表
  const fnList = this._[name]; if (!fnList) return
  const cloneList = fnList.slice()
  const arg = arguments.slice(1)
  cloneList.forEach(({ fn, ctx })=> {
    try { fn.apply(ctx, arg) }
    catch (e) { setTimeout(()=> {throw e}) }
  })
}
genLeafBySplit = ()=> {
  const rootSplit = new (ob.WorkspaceSplit)(app.workspace, 'vertical')
  return app.workspace.createLeafInParent(rootSplit, 0)
}
adaptInlink = ()=> {
  const _old = this.view.editMode?.triggerClickableToken
  if (!_old) return
  this.view.editMode.triggerClickableToken = async (token, pane)=> {
    if (token.type == 'internal-link' && !pane) {
      await this.openLinkText(token.text, this.view.path)
    } else _old.call(this, token, pane)
  }
}
/**References
 * AttachFlow by @Yaozhuwa, @github https://github.com/Yaozhuwa/AttachFlow
 * Hover Editor by @NothingIsLost, @github https://github.com/nothingislost/obsidian-hover-editor
 */
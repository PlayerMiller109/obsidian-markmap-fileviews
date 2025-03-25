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

openGlobalSearch = async query=> {
  const type = 'search'; app.workspace.detachLeavesOfType(type)
  const leaf = app.workspace.openPopoutLeaf({width: 509, height: 1104, x: 1219, y: 0})
  await leaf.setViewState({ type, active: !0, state: {query} })
}
float_search = (editor, view)=> openGlobalSearch(`file:${view.path} ${editor.getSelection()}`)
canvasAllToFiles = ()=> {
  const cvsApi = app.workspace.getLeavesOfType('canvas')[0].view.canvas
  const nodes = [...cvsApi.nodes.values()]
  nodes.map(node=> node.convertToFile())
}
/**References
 * Mindmap NextGen by @james-tindal, @github https://github.com/james-tindal/obsidian-mindmap-nextgen
 * d3-svg-to-png by @JuanIrache, @github https://github.com/JuanIrache/d3-svg-to-png
 */
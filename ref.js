function Kc(e, t, n) {
  l = function() {
    var t = r // seems when this arg is app.workspace throw the Error: <g> error
      , n = o;
    return r = null,
    o = null,
    e.apply(t, n)
  }
}
lN = (linkpath, rPath)=> {
  const containerEl = this.hoverEl.createDiv()
  const e = {app, linkpath, rPath, containerEl}
  const [path, subpath] = linkpath.split('#')
  const item = app.metadataCache.getFirstLinkpathDest(path, rPath)
  if (!item) return
  const u1 = app.embedRegistry.getEmbedCreator(item)
  if (!u1) return
  const linkctx = u1(e, item, subpath)
  if (linkctx) {
    this.watchResize(containerEl); this.addChild(linkctx)
    const y = ()=> {
      linkctx.loadFile()
    }
    return [4, setTimeout(y)]
  } else return [3, 2]
}
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
openGlobalSearch = async query=> {
  const type = 'search'; app.workspace.detachLeavesOfType(type)
  const leaf = app.workspace.openPopoutLeaf({width: 509, height: 1104, x: 1219, y: 0})
  await leaf.setViewState({ type, active: !0, state: {query} })
}
float_search = (editor, view)=> openGlobalSearch(`file:${view.path} ${editor.getSelection()}`)
genLeafBySplit = ()=> {
  const rootSplit = new (ob.WorkspaceSplit)(app.workspace, 'vertical')
  return app.workspace.createLeafInParent(rootSplit, 0)
}
canvasAllToFiles = ()=> {
  const cvsApi = app.workspace.getLeavesOfType('canvas')[0].view.canvas
  const nodes = [...cvsApi.nodes.values()]
  nodes.map(node=> node.convertToFile())
}
/**References
 * AttachFlow by @Yaozhuwa, @github https://github.com/Yaozhuwa/AttachFlow
 * Hover Editor by @NothingIsLost, @github https://github.com/nothingislost/obsidian-hover-editor
 * Mindmap NextGen by @james-tindal, @github https://github.com/james-tindal/obsidian-mindmap-nextgen
 * d3-svg-to-png by @JuanIrache, @github https://github.com/JuanIrache/d3-svg-to-png
 */
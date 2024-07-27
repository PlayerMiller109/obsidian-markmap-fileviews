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
    return [4, setTImeout(y)]
  } else return [3, 2]
}
this.trigger = (name, ...arg)=> {
  // 从 `this._` 中获取与事件名称对应的事件处理器列表
  const fnList = this._[name]; if (!fnList) return
  const cloneList = fnList.slice()
  cloneList.forEach(({ fn, ctx })=> {
    try { fn.apply(ctx, [...arg]) }
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
/**References
 * AttachFlow by @Yaozhuwa, @github https://github.com/Yaozhuwa/AttachFlow
 * Hover Editor by @NothingIsLost, @github https://github.com/nothingislost/obsidian-hover-editor
 * Mindmap NextGen by @james-tindal, @github https://github.com/james-tindal/obsidian-mindmap-nextgen
 * d3-svg-to-png by @JuanIrache, @github https://github.com/JuanIrache/d3-svg-to-png
 */
function Kc(e, t, n) {
  l = function() {
    var t = r // seems when this arg is app.workspace throw the Error: <g> error
      , n = o;
    return r = null,
    o = null,
    e.apply(t, n)
  }
}
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
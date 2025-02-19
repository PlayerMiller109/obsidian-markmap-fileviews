const mmJson = {
  imgAbbr: 'png',
  colors: ['#cb4b16', '#859900', '#b58900'],
  jsonOpts: {
    maxWidth: 700,
  },
}
module.exports = new class {
  constructor() {
    Object.assign(this, mmJson)
  }
  opts = (({colors, jsonOpts})=> {
    const maxDepth = colors.length
    return {
      color: ({state})=> {
        const depth = Math.min(state.depth, maxDepth)
        return colors[depth-1]
      },
      ...jsonOpts,
    }
  })(mmJson)
}
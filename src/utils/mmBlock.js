module.exports = (plg, ob)=> {
  const md2htmlText = require('./getText/md2htmlText.js')(app, ob)
  const { genMM } = require('./genMM.js')(plg.app, ob)
  const mmBlock = async (source, el, ctx)=> {
    const fmRgx = new RegExp(String.raw`---\nmarkmap:\n  height: (\d+)\n---\n`, '')
    let height = 400
    const md = source.replace(fmRgx, (m, p1)=> { height = p1; return '' })
    el.style.height = `${height}px`
    const text = await md2htmlText(md, ctx.sourcePath)
    if (ctx.el.parentNode?.className == 'print') {
      await genMM(el, text, ctx.sourcePath, height)
      el.style.height = 'fit-content'
    }
    else setTimeout(async ()=> {
      await genMM(el, text, ctx.sourcePath)
    }, 100)
  }
  plg.registerMarkdownCodeBlockProcessor('markmap', mmBlock)
}
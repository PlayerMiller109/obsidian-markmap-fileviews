const { Transformer } = require('../.packs/markmap-lib@0.18.js').markmap
const { Markmap } = require('../.packs/markmap-view@0.18.js').markmap
const { Toolbar } = require('../.packs/markmap-toolbar@0.18.js').markmap
const afterTransform = (app, ob)=> {
  const Poper = require('./poper.js')(app, ob)
  return funcBtns = (dom, path)=> dom.querySelectorAll('button[data-k]').forEach(btn=> {
    btn.onclick = async evt=> {
      const linkpath = btn.ariaLabel
      if (btn.dataset.k == 'fd') {
        const folder = app.vault.getFolderByPath(linkpath)
        app.internalPlugins.getEnabledPluginById('file-explorer').revealInFolder(folder)
      }
      else new Poper(evt).openLink(linkpath, path)
    }
  })
}
const mmJson = require('./svg2img/mmJson.js')
const svg2img = require('./svg2img/svg2img.js')
module.exports = (app, ob)=> {
  const funcBtns = afterTransform(app, ob)
  const customBar = (mm)=> {
    const bar = Toolbar.create(mm); bar.setBrand(!1) // hide markmap logo & url

    bar.register({
      id: 'export-as-img', content: '', title: 'Export',
      onClick: async ()=> {
        await mm.fit()
        const svg = bar.markmap.svg['_groups'][0][0]
        const img = await svg2img(svg)
        createEl('a', {attr: {
          download: `.${mmJson.imgAbbr}`, href: img.src,
        }}).click()
      },
    })

    bar.setItems([...Toolbar.defaultItems, 'export-as-img'])
    const barEl = bar.render()
    ob.setIcon(barEl.children[4], 'download')
    barEl.children[4].firstChild.setCssProps({width: '16px', height: '20px'})
    return barEl
  }
  const genMM = async (
    wrapper, htmlText, sourcePath, {printHeight, isEditModeOpenInReading}
  )=> {
    wrapper.empty()
    const svg = wrapper.createSvg('svg')
    const lib = new Transformer(), { root } = lib.transform(htmlText)
    const mm = Markmap.create(svg, mmJson.opts)
    await mm.setData(root)
    funcBtns(svg, sourcePath)
    if (!isEditModeOpenInReading) await mm.fit()
    if (printHeight) {
      await mm.fit()
      // seems markmap@0.18 requires calling fit() again before exporting a PDF
      await svg2img(svg, printHeight)
    }
    else wrapper.append(customBar(mm))
  }
  const genMM2 = (ob.debounce)(genMM)
  return { genMM, genMM2 }
}
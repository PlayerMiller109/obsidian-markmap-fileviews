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
  const customBar = (mm, htmlText, sourcePath)=> {
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
    
    // 添加全屏按钮 - 修改为传递markmap内容
    bar.register({
      id: 'fullscreen', content: '', title: '全屏显示',
      onClick: async ()=> {
        // 获取当前的transformer和root，以便获取原始的markdown内容
        const leaf = app.workspace.getLeaf('split')
        await leaf.setViewState({ 
          type: 'mm-block-view', 
          state: {
            sourcePath: sourcePath,
            htmlContent: htmlText,
            // 传递原始内容，用于在新视图中渲染
            originalContent: mm.state.data.payload 
          }
        })
      },
    })

    bar.setItems([...Toolbar.defaultItems, 'export-as-img', 'fullscreen'])
    const barEl = bar.render()
    ob.setIcon(barEl.children[4], 'download')
    barEl.children[4].firstChild.setCssProps({width: '16px', height: '20px'})
    // 设置全屏按钮图标
    ob.setIcon(barEl.children[5], 'maximize-2')
    barEl.children[5].firstChild.setCssProps({width: '16px', height: '20px'})
    return barEl
  }
  const genMM = async (wrapper, htmlText, sourcePath, printHeight)=> {
    wrapper.empty()
    const svg = wrapper.createSvg('svg')
    const lib = new Transformer(), { root } = lib.transform(htmlText)
    const mm = Markmap.create(svg, mmJson.opts, root)
    funcBtns(svg, sourcePath); await mm.fit()
    if (printHeight) {
      await mm.fit()
      // seems markmap@0.18 requires calling fit() again before exporting a PDF
      await svg2img(svg, printHeight)
    }
    else wrapper.append(customBar(mm, htmlText, sourcePath))
  }
  const genMM2 = (ob.debounce)(genMM)
  return { genMM, genMM2 }
}
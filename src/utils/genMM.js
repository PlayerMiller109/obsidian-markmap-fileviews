const { Transformer } = require('../.packs/markmap-lib@0.17.js').markmap
const { Markmap } = require('../.packs/markmap-view@0.17.js').markmap
const { Toolbar } = require('../.packs/markmap-toolbar@0.17.js').markmap
const mmJson = {
  colors: ['#cb4b16', '#859900', '#b58900'],
  jsonOpts: {
    maxWidth: 700,
  },
  imgAbbr: 'png',
}
, forExport = `
  svg.markmap {
    --markmap-text-color: #222;
    --markmap-highlight-bg: rgba(255, 208, 0, 0.4);
    background-color: #fff;
  }
  .markmap-foreign.markmap-foreign {
    & code {white-space: pre-wrap;}
    & .copy-code-button {display: none;}
  }
`
const afterTransform = (app, ob)=> {
  const Poper = require('./poper.js')(app, ob)
  return funcBtns = (dom, path)=> dom.querySelectorAll('button[data-k]').forEach(btn=> {
    btn.onclick = async evt=> {
      const linkpath = btn.ariaLabel
      if (btn.dataset.k == 'fd') {
        const folder = app.vault.getFolderByPath(linkpath)
        app.internalPlugins.getEnabledPluginById('file-explorer').revealInFolder(folder)
      } else new Poper(evt).openLink(linkpath, path)
    }
  })
}
const svg2src = async (svg)=> {
  const scale = 3
  , cvs = document.createElement('canvas')
  , { width, height } = svg.getBoundingClientRect()
  Object.assign(cvs, {width: width * scale, height: height * scale})
  const ctxt = cvs.getContext('2d'); ctxt.scale(scale, scale)

  const svgClone = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svgClone.innerHTML = svg.innerHTML
  for (const attr of svg.attributes) svgClone.setAttribute(attr.name, attr.value)
  svgClone.append(Object.assign(document.createElement('style'), {textContent: forExport}))

  const svgStr = unescape(encodeURI(new XMLSerializer().serializeToString(svgClone)))
  // encode-unescape to support latin1
  , img = Object.assign(new Image(), {src: `data:image/svg+xml;base64,${btoa(svgStr)}`})
  await new Promise(r=> img.onload = ()=> r(ctxt.drawImage(img, 0, 0)))
  return cvs.toDataURL(`image/${mmJson.imgAbbr}`)
}
module.exports = (app, ob)=> {
  const { colors } = mmJson, maxDepth = colors.length
  , opts = {
    color: ({state: s})=> s.depth <= maxDepth ? colors[s.depth-1] : colors[maxDepth-1],
    ...mmJson.jsonOpts,
  }
  , funcBtns = afterTransform(app, ob)
  , addBar = (wrapper, mm)=> {
    const bar = Toolbar.create(mm); bar.setBrand(!1) // hide markmap logo & url
    , exportAsImg = async (svg)=> {
      await mm.fit()
      Object.assign(document.createElement('a'), {
        download: `.${mmJson.imgAbbr}`, href: await svg2src(svg)
      }).click()
    }
    , customBtn = (bar)=> {
      bar.register({
        id: 'export-as-img', content: '', title: 'Export',
        onClick: async ()=> await exportAsImg(bar.markmap.svg['_groups'][0][0])
      })
      bar.setItems([...Toolbar.defaultItems, 'export-as-img'])
      const barEl = bar.render()
      ob.setIcon(barEl.children[4], 'download')
      barEl.children[4].firstChild.setCssProps({width: '16px', height: '20px'})
      return barEl
    }
    wrapper.append(customBtn(bar))
  }
  return genMM = async (wrapper, htmlText, sourcePath)=> {
    wrapper.empty(); const svg = wrapper.createSvg('svg')
    , lib = new Transformer(), { root } = lib.transform(htmlText)
    , mm = Markmap.create(svg, opts, root); await mm.fit()
    funcBtns(svg, sourcePath); addBar(wrapper, mm); return svg
  }
}
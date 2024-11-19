const S = String.raw
, listSym = S`\n?^[ \t]*?(-|\d\.) `
, headSym = S`#{1,6} `
, headingInList = S`(?<=${listSym})${headSym}`
, keepText = new class {
  listRgx = new RegExp(S`${listSym}`, 'gm')
  headRgx = new RegExp(S`\n?^${headSym}`, 'gm')
  magicComments = /\<\!-- markmap\: [a-zA-Z]+ --\>/g
}
module.exports = (app, ob)=> {
  const inlink2btn = (dom, path)=> dom.querySelectorAll('a.internal-link').forEach(link=> {
    const newEl = createEl('button')
    , linkpath = link.dataset.href, linktext = link.textContent
    , file = app.metadataCache.getFirstLinkpathDest(linkpath.split('#')[0], path)
    if (file) { newEl.dataset.k = 'f'; newEl.ariaLabel = linkpath }
    else {
      const folder = app.vault.getFolderByPath(linkpath)
      if (folder) { newEl.dataset.k = 'fd'; newEl.ariaLabel = folder.path }
    }
    newEl.textContent = linktext; link.replaceWith(newEl)
  })
  return md2htmlText = async (mdText, sourcePath)=> {
    const tohtml = async (seg)=> {
      const el = createDiv()
      await ob.MarkdownRenderer.render(app, seg, el, sourcePath, new ob.Component)
      inlink2btn(el, sourcePath)
      const cEl0 = el.children[0]; let _ihtml = ''
      if (cEl0) {
        for (const cEl of el.children) {
          if (cEl.textContent) {
            _ihtml += (
              cEl.tagName != 'P' && cEl.children[0]
            ) ? cEl.outerHTML : cEl.innerHTML
          }
          else {
            const img0 = cEl.querySelector('img')
            if (img0) _ihtml += `${img0.outerHTML}</span>`
          }
        }
      } else _ihtml = el.innerHTML
      return _ihtml
    }
    const r = []
    for (const sec of mdText.split('\n\n')) {
      const segs = sec.split('\n').filter(p=> p.match(/\S/))
      const sec2 = segs.join('\n')
      if (segs[0]?.startsWith('```')) { r.push(await tohtml(sec2)); continue }
      let matched = []
      for (const rgx of Object.values(keepText)) {
        const matcher = sec2.matchAll(rgx)
        for (const match of matcher) {
          const s = match.index, value = match[0]
          matched.push({range: [s, s + value.length], value})
        }
      }
      let _r = ''
      if (matched[0]) {
        matched = matched.sort((a, b)=> a.range[0] - b.range[0])
        const matchEnd = matched[matched.length-1].range[1]
        for (let i = 0; i < matched.length; i++) {
          const last = matched[i-1]
          , lastEnd = last ? last.range[1] : 0
          , pre = sec2.slice(lastEnd, matched[i].range[0])
          _r += await tohtml(pre) + matched[i].value
        }
        if (matchEnd < sec2.length)
          _r += await tohtml(sec2.slice(matchEnd))
      } else _r = await tohtml(sec2)
      _r = _r
        .replace(new RegExp(headingInList, 'gm'), '')
        .replace(/\<br\>$/gm, '')
      if (_r) r.push(_r)
    }
    return r.join('\n\n')
  }
}
module.exports = (app, ob, sourcePath)=> {
  const inlink2btn = (dom, path)=> dom.querySelectorAll('a.internal-link').forEach(link=> {
    const newEl = createEl('button')
    const linkpath = link.dataset.href, linktext = link.textContent
    const file = app.metadataCache.getFirstLinkpathDest(linkpath.split('#')[0], path)
    if (file) { newEl.dataset.k = 'f'; newEl.ariaLabel = linkpath }
    else {
      const folder = app.vault.getFolderByPath(linkpath)
      if (folder) { newEl.dataset.k = 'fd'; newEl.ariaLabel = folder.path }
    }
    newEl.textContent = linktext; link.replaceWith(newEl)
  })
  return tohtml = async (seg)=> {
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
    }
    else _ihtml = el.innerHTML
    return _ihtml
  }
}
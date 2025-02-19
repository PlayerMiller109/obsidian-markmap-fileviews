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
  return md2htmlText = async (mdText, sourcePath)=> {
    const tohtml = require('./tohtml.js')(app, ob, sourcePath)
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
          const lastEnd = last ? last.range[1] : 0
          const pre = sec2.slice(lastEnd, matched[i].range[0])
          _r += await tohtml(pre) + matched[i].value
        }
        if (matchEnd < sec2.length)
          _r += await tohtml(sec2.slice(matchEnd))
      }
      else _r = await tohtml(sec2)

      _r = _r.replace(new RegExp(headingInList, 'gm'), '')
      _r = _r.replace(/\<br\>$/gm, '')
      _r = _r.replace(/\<\/([a-z]+?)\>\<pre/g, '</$1>\n<pre')

      if (_r) r.push(_r)
    }
    return r.join('\n\n')
  }
}
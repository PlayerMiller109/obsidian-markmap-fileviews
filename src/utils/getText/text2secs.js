const codeblockRgx = /^(`{3,})(.*)\n.*?\S[\s\S]*?\1$/gm
const splitRest = (text)=> text.split('\n\n')
const text2secs = (mdText)=> {
  const secs = []
  let match, lastEnd = 0
  while (match = codeblockRgx.exec(mdText)) {
    const pre = mdText.slice(lastEnd, match.index)
    if (pre) secs.push(...splitRest(pre))
    lastEnd = codeblockRgx.lastIndex
    const [
      codeblockText, sBacktick, codeblockLang
    ] = match
    if (!codeblockLang.startsWith('markmap'))
      secs.push(codeblockText)
  }
  const suf = mdText.slice(lastEnd)
  if (suf) secs.push(...splitRest(suf))
  return secs
}
module.exports = text2secs
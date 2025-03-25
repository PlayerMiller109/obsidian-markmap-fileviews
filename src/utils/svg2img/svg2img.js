const b64b = require('./getBase64.js')
const encodeImg2B64 = async (svg)=> {
  const imgs = svg.querySelectorAll('img')
  for (const img of imgs) {
    const b64 = await b64b.getByUrl(img.src)
    if (img.src.startsWith('blob:')) {
      const newImg = await b64b.loadNewImg(b64)
      newImg.style.cssText = img.style.cssText
      newImg.style.width = '100%'
      img.replaceWith(newImg)
    }
    else img.src = b64
  }
}
const rule = require('./cssRule.js')
const svg2img = async (svg, printHeight)=> {
  const { width: w1, height: h1, x, y } = svg.getBBox()
  // setViewBox
  const vbWidth = printHeight ? w1 + w1 * 0.03 : w1
  const margin = printHeight ? Math.max(h1 * 0.03, 8) : 8
  const vbY = y - margin
  const vbHeight = h1 + (margin * 2)
  svg.setAttribute('viewBox', `${x} ${vbY} ${vbWidth} ${vbHeight}`)
  if (printHeight) {
    if (!isNaN(printHeight)) svg.style.height = printHeight
    return
  }

  const svgClone = svg.cloneNode(!0)
  svgClone.prepend(createEl('style', {text: rule}))
  await encodeImg2B64(svgClone)

  const svgStr = unescape(encodeURI(new XMLSerializer().serializeToString(svgClone)))
  // encode-unescape to support latin1
  const img = await b64b.loadNewImg(`data:image/svg+xml;base64,${btoa(svgStr)}`)

  const baseValue = 4200, maxValue = 2e4
  const ratio = vbWidth / vbHeight
  let width, height
  if (ratio < 1) {
    width = baseValue; height = width / ratio
    if (height > maxValue) {
      height = maxValue; width = maxValue * ratio
    }
  }
  else {
    height = baseValue; width = height * ratio
    if (width > maxValue) {
      width = maxValue; height = maxValue / ratio
    }
  }
  const b64 = b64b.getByDraw(width, height, 1, img, [0, 0])
  img.src = b64; return img
}
module.exports = svg2img
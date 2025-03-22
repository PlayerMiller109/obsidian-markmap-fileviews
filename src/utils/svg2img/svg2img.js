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
const svg2img = async (svg)=> {
  const { width: w1, height: h1 } = svg.getBoundingClientRect()
  const { width: w2, height: h2, x, y } = svg.getBBox()
  , scale = 2 * 1e-2 * Math.max(w2, h2)
  , ratio = h2 / w2; let width, height
  if (h1 / w1 < ratio) {
    height = h1 * scale; width = height / ratio
  }
  else {
    width = w1 * scale; height = width * ratio
  }
  const margin = h2 / 75 // custom. when height is 75, margin is 1.

  const svgClone = svg.cloneNode(!0)
  svgClone.prepend(Object.assign(
    document.createElement('style'), {textContent: rule}
  ))
  await encodeImg2B64(svgClone)

  const svgStr = unescape(encodeURI(new XMLSerializer().serializeToString(svgClone)))
  // encode-unescape to support latin1
  const img = await b64b.loadNewImg(`data:image/svg+xml;base64,${btoa(svgStr)}`)
  const b64 = b64b.getByDraw(width, height, scale, img, [-x + margin, -y + margin])
  img.src = b64; return img
}
module.exports = svg2img
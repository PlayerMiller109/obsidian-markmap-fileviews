const mmJson = require('./mmJson.js')
module.exports = new class {
  loadNewImg = async (src)=> {
    const img = new Image(); img.src = src
    await new Promise(r=> img.onload = r)
    return img
  }
  getByDraw = (
    width, height, scale, img, dxy = [0, 0]
  )=> {
    const cvs = document.createElement('canvas')
    Object.assign(cvs, {width, height})
    const ctxt = cvs.getContext('2d')
    ctxt.scale(scale, scale)
    ctxt.drawImage(img, ...dxy)
    return cvs.toDataURL(`image/${mmJson.imgAbbr}`)
  }
  getByUrl = async (url)=> {
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error('Res fail')
      const blob = await response.blob()
      return new Promise((resolve, reject)=> {
        const reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onloadend = ()=> resolve(reader.result)
        reader.onerror = reject
      })
    }
    catch (err) {
      console.error('Error fetching the image:', err)
      return null
    }
  }
}
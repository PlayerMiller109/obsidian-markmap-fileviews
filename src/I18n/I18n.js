const en = require('./locl/en.js')
const sc = require('./locl/sc.js')
const tc = require('./locl/tc.js')
const loclMap = {
  en, 'zh': sc, 'zh-TW': tc,
}
module.exports = new class {
  setLocl = (lang)=> {
    this.locl = loclMap[lang] || en
  }
  getLocl = (key)=> this.locl[key]
}
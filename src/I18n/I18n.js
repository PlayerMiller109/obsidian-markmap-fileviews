const en = require('./locl/en.js')
const ja = require('./locl/ja.js')
const sc = require('./locl/zh-sc.js')
const tc = require('./locl/zh-tc.js')
const loclMap = {
  en, ja, 'zh': sc, 'zh-TW': tc,
}
module.exports = new class {
  setLocl = (lang)=> {
    this.locl = loclMap[lang] || en
  }
  getLocl = (key)=> this.locl[key]
}
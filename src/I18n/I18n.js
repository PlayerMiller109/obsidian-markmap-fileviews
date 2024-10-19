const en = require('./locl/en.js')
const sc = require('./locl/sc.js')
const tc = require('./locl/tc.js')
const ja = require('./locl/ja.js')
const loclMap = {
  en, 'zh': sc, 'zh-TW': tc, ja,
}
module.exports = new class {
  setLocl = (lang)=> {
    this.locl = loclMap[lang] || en
  }
  getLocl = (key)=> this.locl[key]
}
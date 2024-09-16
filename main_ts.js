const ob = require('obsidian')
module.exports = class extends ob.Plugin {
  onload() {
    const mmPlug = require('./src/markmap.js')(this.app, ob)
    const patcher = require('./src/userHover.js')(this.app, ob)
    mmPlug.call(this)
    // this.app.workspace.onLayoutReady(()=> patcher.call(this))
  }
  onunload() {}
}
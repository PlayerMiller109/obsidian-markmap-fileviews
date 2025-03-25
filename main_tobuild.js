const ob = require('obsidian')
module.exports = class extends ob.Plugin {
  async onload() {
    const mmPlug = require('./src/mmPlug.js')
    await mmPlug(this, ob)
  }
  onunload() {}
  async loadSettings() {
    this.settings = Object.assign({}, await this.loadData())
  }
  async _save() {
    await this.saveData(this.settings)
  }
  saveSettings = (ob.debounce)(this._save, 200, !0)
}
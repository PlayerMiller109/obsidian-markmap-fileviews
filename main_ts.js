const { setLocl, getLocl } = require('./src/I18n/I18n.js')
const ob = require('obsidian')
module.exports = class extends ob.Plugin {
  async onload() {
    const mmPlug = require('./src/markmap.js')(this.app, ob)
    mmPlug.call(this)
    setLocl(localStorage.getItem('language'))
    await this.loadSettings()
    this.addSettingTab(import_mmTab(this))
  }
  onunload() {}
  getLocl = getLocl
  async loadSettings() {
    this.settings = Object.assign({}, await this.loadData())
  }
  async _save() {
    await this.saveData(this.settings)
  }
  saveSettings = (ob.debounce)(this._save, 200, !0)
}
const import_mmTab = (plugin)=> {
  const patchPP = require('./src/patchCore/PagePreview.js')(plugin, ob)
  return new class extends ob.PluginSettingTab {
    Setting = ob.Setting
    get base() { return new this.Setting(this.containerEl) }
    display() {
      this.containerEl.empty()
      patchPP.setted(this)
    }
    hide() {}
  }(plugin.app, plugin)
}
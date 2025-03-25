const i18n = require('./I18n/I18n.js')
const mmPlug = async (plg, ob)=> {
  i18n.setLocl(localStorage.getItem('language'))
  await plg.loadSettings(); addTab(plg, ob)
  const mmView = require('./utils/mmView.js'); mmView(plg, ob)
  const mmBlock = require('./utils/mmBlock.js'); mmBlock(plg, ob)
  // compatible with excalidraw when "Delete file"
  plg.app.plugins.plugins = new Proxy(plg.app.plugins.plugins, {
    get: (target, prop)=> !!(prop == 'obsidian-hover-editor')||target[prop]
  })
}
const addTab = (plg, ob)=> {
  const patchPP = require('./patch/PagePreview.js')(plg, ob)
  const plugTab = new class extends ob.PluginSettingTab {
    getLocl = i18n.getLocl
    get base() { return new ob.Setting(this.containerEl) }
    display() {
      this.containerEl.empty(); patchPP.setted(this)
    }
    hide() {}
  }(plg.app, plg)
  plg.addSettingTab(plugTab)
}
module.exports = mmPlug
module.exports = (plg, ob)=> {
  const { app } = plg
  const userHover = require('./userHover.js')(app, ob)
  const PagePreview = app.internalPlugins.plugins['page-preview']
  if (!PagePreview.enabled) return
  const _constr = PagePreview.instance.constructor
  const { onLinkHover: old1 } = _constr.prototype
  return new class {
    key = 'takeover'
    load = ()=> {
      Object.assign(_constr.prototype, {onLinkHover: function() {
        const coreHover = ()=> old1.call(this, ...arguments)
        userHover(coreHover, ...arguments)
      }})
      PagePreview.disable(); PagePreview.enable()
    }
    unload = ()=> {
      Object.assign(_constr.prototype, {onLinkHover: old1})
      PagePreview.disable(); PagePreview.enable()
    }
    toggle = (flag)=> flag ? this.load() : this.unload()
    constructor() {
      this.toggle(plg.settings[this.key])
      plg.register(this.unload)
    }
    setted = (plgTab)=> {
      const { key } = this
      plgTab.base.setName(plgTab.getLocl(key).name).addToggle(
        box=> box.setValue(plg.settings[key]
        ).onChange(async flag=> {
          plg.settings[key] = flag
          this.toggle(flag)
          await plg.saveSettings()
        })
      )
    }
  }
}
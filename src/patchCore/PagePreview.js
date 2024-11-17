module.exports = (plugin, ob)=> {
  const { app } = plugin
  const userHover = require('./userHover.js')(app, ob)
  const PagePreview = app.internalPlugins.plugins['page-preview']
  if (!PagePreview.enabled) return
  const _constr = PagePreview.instance.constructor
  const { onLinkHover: old1 } = _constr.prototype
  return new class {
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
      this.key = 'takeover'
      this.toggle(plugin.settings[this.key])
      plugin.register(this.unload)
    }
    setted = (ctx)=> {
      const { key } = this
      ctx.base.setName(plugin.getLocl(key).name).addToggle(
        box=> box.setValue(
          plugin.settings[key]
        ).onChange(async flag=> {
          plugin.settings[key] = flag
          this.toggle(flag)
          await plugin.saveSettings()
        })
      )
    }
  }
}
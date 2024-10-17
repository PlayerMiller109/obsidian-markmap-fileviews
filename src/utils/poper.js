module.exports = (app, ob)=> {
  const userLeaf = (ctx, parent)=> new class extends ob.WorkspaceLeaf {
    _width = 576; _height = 480
    initial = {width: `${this._width}px`, height: `${this._height}px`}
    load = async (linkpath, rPath, eState)=> {
      parent.setCssProps(this.initial)
      const wrapper = parent.createDiv()
      this.containerEl.setCssProps({height: '100%'})
      wrapper.setCssProps({width: '100%'})
      wrapper.append(this.containerEl)
      await this.openLinkText(linkpath, rPath)
      setTimeout(()=> eState && this.setEphemeralState(eState), 120)
      const erf = app.vault.on('delete', file=> {
        if (file.path != this.view.path) return
        this.parent = parent; ctx.pinned = !1; app.vault.offref(erf)
      })
      this.genUserEls()
      this.view.headerEl.children[1].onmousedown = this.onDrag
      this.view.contentEl.onmousedown = this.onDrag
      this.view.contentEl.onkeydown = evt=> {
        evt.ctrlKey && evt.altKey && this.active()
      }
    }
    get activeLeaf() { return app.workspace.activeLeaf }
    get isSameLeaf() { return this.activeLeaf?.id === this.id }
    active = ()=> {
      const set = ()=> app.workspace.activeLeaf = this
      if (!this.isSameLeaf) set()
      setTimeout(()=> {
        if (this.activeLeaf === null || this.isSameLeaf) return
        set(); this.view.editor.focus()
      }, 280)
    }
    onDrag = (evt)=> {
      this.togglePin(!0); this.active()
      if (!evt.ctrlKey) return
      let { clientX: clickX, clientY: clickY } = evt
      const updatePosition = moveEvt=> {
        const { clientX, clientY } = moveEvt
        parent.setCssProps({
          left: `${parent.offsetLeft + clientX - clickX}px`,
          top: `${parent.offsetTop + clientY - clickY}px`,
        })
        clickX = clientX; clickY = clientY
      }
      const document = evt.target.ownerDocument
      document.addEventListener('mousemove', updatePosition)
      document.addEventListener('mouseup', function listener() {
        document.removeEventListener('mousemove', updatePosition)
        document.removeEventListener('mouseup', listener)
      }, {once: !0})
    }
    genUserEls = ()=> {
      const leftEl = this.view.headerEl.children[0]
      leftEl.empty(); this.leftEl = leftEl
      this.genPinEl(); this.genMaxEl(); this.genMinEl()
    }
    genPinEl = ()=> {
      this.pinEl = this.leftEl.createEl('button', 'pin-icon clickable-icon')
      ob.setIcon(this.pinEl, 'pin-off')
      this.pinEl.onclick = ()=> this.togglePin(!ctx.pinned)
    }
    togglePin = pinned=> {
      ctx.pinned = pinned
      ob.setIcon(this.pinEl, pinned ? 'pin' : 'pin-off')
    }
    genMaxEl = ()=> {
      let isMax = !1
      const maxBtn = this.leftEl.createEl('button', 'clickable-icon')
      , syncMaxEl = ()=> {
        isMax = !isMax
        ob.setIcon(maxBtn, isMax ? 'maximize' : 'minimize')
        maxBtn.ariaLabel = isMax ? 'Maximize' : 'Restore'
      }
      syncMaxEl()
      maxBtn.onclick = evt=> {
        if (!ctx.pinned) this.togglePin(!0)
        const { view: { innerWidth, innerHeight } } = evt
        parent.setCssProps(isMax ? {
          left: '42px', top: '28px', 'max-height': 'unset',
          width: `${Math.max(innerWidth * 0.9, this._width)}px`,
          height: `${Math.max(innerHeight * 0.9, this._height)}px`,
        } : {left: `${innerWidth - 42 - this._width}px`, ...this.initial})
        syncMaxEl()
      }
    }
    genMinEl = ()=> {
      let isMin = !1
      this.view.addAction('minus', 'Minimize', ()=> {
        if (!ctx.pinned) this.togglePin(!0)
        isMin = !isMin
        parent.setCssProps({height: `${isMin ? 42 : this._height}px`})
      })
    }
  }(app)
  return class Poper extends ob.HoverPopover {
    constructor({view, target}) {
      super(view, target, 100); this.hoverEl.addClass('ample')
    }
    openLink = async (linkpath, rPath, eState)=> {
      const file = app.metadataCache.getFirstLinkpathDest(linkpath.split('#')[0], rPath)
      let u1; if (file) u1 = app.embedRegistry.getEmbedCreator(file)
      if (file && u1) await userLeaf(this, this.hoverEl).load(linkpath, rPath, eState);
      else this.blank()
    }
    blank = ()=> {
      this.hoverEl.setCssProps({width: '24px', 'align-items': 'center'})
      ob.setIcon(this.hoverEl, 'coffee')
    }
    hide = ()=> {
      if (this.pinned) return
      this.state = ob.PopoverState.Hidden
      this.hoverEl.detach()
      if (this.targetEl) {
        this.targetEl.removeEventListener('mouseover', this.onMouseIn)
        this.targetEl.removeEventListener('mouseout', this.onMouseOut)
        this.onTarget = this.onHover = !1
      }
      this.onHide(); this.unload()
    }
  }
}
module.exports = (app, ob)=> {
  const userLeaf = (ctx)=> new class extends ob.WorkspaceLeaf {
    _width = 576; _height = 480; parent = ctx.hoverEl
    initial = {width: `${this._width}px`, height: `${this._height}px`}
    load = async (linkpath, rPath, eState)=> {
      this.parent.setCssProps(this.initial)
      this.containerEl.setCssProps({height: '100%'})
      const erf = app.vault.on('delete', file=> {
        if (file.path != this.view.path) return
        ctx.pinned = !1; app.vault.offref(erf)
      })
      await sleep(50)
      await this.openLinkText(linkpath, rPath)
      if (eState?.line) {
        await sleep(50)
        this.setEphemeralState(eState)
      }
    }
    openLinkText = async (linkpath, rPath, pane)=> {
      this.onInlink = !0
      setTimeout(()=> this.onInlink = !1, 300)
      await super.openLinkText.call(this, linkpath, rPath, pane)
    }
    setLeaf = ()=> {
      if (!this.onInlink)
        app.workspace.activeLeaf = app.workspace.getMostRecentLeaf()
      setTimeout(()=> {
        app.workspace.activeLeaf = this; this.view.editor?.focus()
      }, 50)
    }
    setViewState() {
      this.setLeaf(); super.setViewState.call(this, ...arguments)
    }
    setEphemeralState() {
      this.genUserEls(); super.setEphemeralState.call(this, ...arguments)
    }
    genUserEls = ()=> {
      this.parent.empty()
      const wrapper = this.parent.createDiv()
      wrapper.setCssProps({width: '100%'})
      wrapper.append(this.containerEl)
      this.leftEl = this.view.headerEl.children[0]
      this.leftEl.empty()
      this.genMaxEl(); this.genPinEl()
      this.view.headerEl.children[1].onmousedown = this.onClick
      this.genMinEl()
      this.view.contentEl.onmousedown = this.onClick
    }
    togglePin = pinned=> {
      ctx.pinned = pinned
      ob.setIcon(this.pinEl, pinned ? 'pin' : 'pin-off')
    }
    genPinEl = ()=> {
      this.pinEl = createEl('button', {
        cls: 'pin-icon clickable-icon',
        onclick: ()=> this.togglePin(!ctx.pinned),
      })
      ob.setIcon(this.pinEl, ctx.pinned ? 'pin' : 'pin-off')
      this.leftEl.prepend(this.pinEl)
    }
    genMaxEl = ()=> {
      let isMax = !1
      this.maxBtn = createEl('button', 'clickable-icon')
      const syncMaxEl = ()=> {
        isMax = !isMax
        ob.setIcon(this.maxBtn, isMax ? 'maximize' : 'minimize')
        this.maxBtn.ariaLabel = isMax ? 'Maximize' : 'Restore'
      }
      syncMaxEl()
      this.maxBtn.onclick = evt=> {
        const { view: { innerWidth, innerHeight } } = evt
        this.parent.setCssProps(isMax ? {
          left: '42px', top: '28px', 'max-height': 'unset',
          width: `${Math.max(innerWidth * 0.9, this._width)}px`,
          height: `${Math.max(innerHeight * 0.9, this._height)}px`,
        } : {left: `${innerWidth - 42 - this._width}px`, ...this.initial})
        syncMaxEl()
      }
      this.leftEl.prepend(this.maxBtn)
    }
    genMinEl = ()=> {
      this.minEl?.remove(); let isMin = !1
      this.minEl = createEl('button', {
        cls: 'clickable-icon',
        onclick: ()=> {
          if (!ctx.pinned) this.togglePin(!0); isMin = !isMin
          this.parent.setCssProps({height: `${isMin ? 42 : this._height}px`})
        },
      })
      this.minEl.ariaLabel = 'Minimize'
      ob.setIcon(this.minEl, 'minus')
      this.view.actionsEl.prepend(this.minEl)
    }
    onClick = (evt)=> {
      if (evt.ctrlKey) {
        let {clientX: clickX, clientY: clickY} = evt
        const onDrag = moveEvt=> {
          const { clientX, clientY } = moveEvt
          this.parent.setCssProps({
            left: `${this.parent.offsetLeft + clientX - clickX}px`,
            top: `${this.parent.offsetTop + clientY - clickY}px`,
          })
          clickX = clientX; clickY = clientY
        }
        const document = evt.target.ownerDocument
        document.addEventListener('mousemove', onDrag)
        document.addEventListener('mouseup', function () {
          document.removeEventListener('mousemove', onDrag)
        }, {once: !0})
      } else {
        if (app.workspace.activeLeaf?.id != this.id)
          setTimeout(()=> app.workspace.activeLeaf = this, 50)
        if (!ctx.pinned) this.togglePin(!0)
      }
    }
  }(app)
  return class Poper extends ob.HoverPopover {
    constructor({view, target}) {
      super(view, target, 100); this.hoverEl.addClass('ample')
    }
    openLink = async (linkpath, rPath, eState)=> {
      const file = app.metadataCache.getFirstLinkpathDest(linkpath.split('#')[0], rPath)
      let u1; if (file) u1 = app.embedRegistry.getEmbedCreator(file)
      if (file && u1) await userLeaf(this).load(linkpath, rPath, eState);
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
'use strict'
import * as dat from 'lil-gui'
import Stats from 'stats.js'

export default class Debug {
  constructor() {
    this.active = window.location.hash === '#debug'
    this.status = new Stats()
    this.status.showPanel(0)

    if (this.active) {
      this.ui = new dat.GUI()
      document.body.appendChild(this.status.dom)
    }
  }
}
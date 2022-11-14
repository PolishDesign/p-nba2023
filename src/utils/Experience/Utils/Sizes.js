'use strict'
import EventEmitter from './EventEmitter.js'
export default class Sizes extends EventEmitter {
  constructor() {
    super()
    this.width = window.innerWidth
    this.height = innerHeight
    this.pixelRatio = Math.min(window.devicePixelRatio, 2)

    this.resize = () => {
      this.width = window.innerWidth
      this.height = innerHeight
      this.pixelRatio = Math.min(window.devicePixelRatio, 2)
      this.trigger('resize')
    }

    this.resizeHandler = this.resize.bind(this)

    window.addEventListener('resize', this.resizeHandler)
  }

  destory() {
    this.off('resize')
    window.removeEventListener('resize', this.resizeHandler)
  }
}
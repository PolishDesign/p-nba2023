'use strict'
import EventEmitter from './EventEmitter.js'
import normalizeWheel from 'normalize-wheel';
import Experience from '../Experience.js'
import { CONFIG } from '../../Experience/Utils/Config.js'

export default class Cursor extends EventEmitter {
  constructor() {
    super()

    this.experience = new Experience()
    this.canvas = this.experience.canvas
    this.sizes = this.experience.sizes
    this.region = this.experience.region
    this.debug = this.experience.debug
    this.config = CONFIG["CURSOR"]
    this.sidebar = this.experience.sidebar
    this.bottomSheet = this.experience.bottomSheet

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('cursor')

      this.debugFolder
        .add(this.config, 'peeking')
        .name('peeking')
        .min(0)
        .max(1)
        .step(0.01)

      this.debugFolder
        .add(this.config, 'scale')
        .name('speed')
        .min(1)
        .max(10)
        .step(0.1)

      this.debugFolder
        .add(this.config, 'left')
        .name('maxLeft')
        .min(1000)
        .max(20000)
        .step(100)

      this.debugFolder
        .add(this.config, 'right')
        .name('maxRight')
        .min(1000)
        .max(20000)
        .step(100)

      this.debugFolder
        .add(this.config, 'top')
        .name('maxTop')
        .min(1000)
        .max(20000)
        .step(100)

      this.debugFolder
        .add(this.config, 'bottom')
        .name('maxBottom')
        .min(1000)
        .max(20000)
        .step(100)

      this.debugFolder
        .add(this.config, 'maxDistance')
        .name('maxDistance')
        .min(30)
        .max(2500)
        .step(5)

      this.debugFolder
        .add(this.config, 'minDistance')
        .name('minDistance')
        .min(0)
        .max(900)
        .step(5)

      this.debugFolder
        .add(this.config, 'maxDistanceOnMobile')
        .name('maxDistanceOnMobile')
        .min(0)
        .max(2000)
        .step(5)

      this.debugFolder
        .add(this.config, 'minDistanceOnMobile')
        .name('minDistanceOnMobile')
        .min(0)
        .max(600)
        .step(5)
    }

    this.x = 0
    this.y = 0
    this.dragging = false
    this.zooming = false
    this.pointStart = {
      x: 0,
      y: 0
    }
    // displacement
    this.previousDx = null
    this.previousDz = null
    this.dX = -(this.x - this.pointStart.x)
    this.dZ = -(this.y - this.pointStart.y)

    this.dXs = 0
    this.dZs = 0

    this.evCache = []
    this.prevDiff = -1
    this.curDiff = 0
    this.prevDdiff = null
    this.dDiff = 0
    this.dDiffs = 0

    this.pixelY = 0
    this.totalPixelY = 0

    this.parallax = {
      x: 0,
      y: 0
    }

    this.maxLeft = this.config.left
    this.maxRight = this.config.right
    this.maxTop = this.config.top
    this.maxBottom = this.config.bottom

    this.pointermove = (e) => {
      for (let i = 0; i < this.evCache.length; i++) {
        if (e.pointerId == this.evCache[i].pointerId) {
          this.evCache[i] = e
          break
        }
      }
      // Mobile Scrolling Handle
      if (this.evCache.length === 2) {
        this.curDiff = Math.sqrt(Math.pow(this.evCache[1].clientX - this.evCache[0].clientX, 2) + Math.pow(this.evCache[1].clientY - this.evCache[0].clientY, 2))
        this.dDiff = this.prevDiff - this.curDiff

        if (this.prevDiff > 0) {
          if (this.prevDdiff !== this.dDiff) {
            this.dDiffs += this.dDiff
          }
          if (this.dDiffs > this.config.maxDistanceOnMobile) {
            this.dDiffs = this.config.maxDistanceOnMobile
          }
          if (this.dDiffs < -this.config.minDistanceOnMobile) {
            this.dDiffs = -this.config.minDistanceOnMobile
          }
        }
        this.prevDiff = this.curDiff
        this.prevDdiff = this.dDiff
      }

      if (!this.zooming) {
        this.x = e.clientX
        this.y = e.clientY

        if (!this.dragging) {
          this.pointStart.x = this.x
          this.pointStart.y = this.y
        }
      }
    }
    this.pointerdown = (e) => {
      this.evCache.push(e)
      if (!this.zooming) {
        this.x = e.clientX
        this.y = e.clientY
        this.pointStart.x = e.clientX
        this.pointStart.y = e.clientY
        this.dragging = true
      }
      this.canvas.classList.add('grabbing')
    }
    this.pointerup = (e) => {
      for (let i = 0; i < this.evCache.length; i++) {
        if (this.evCache[i].pointerId == e.pointerId) {
          this.evCache.splice(i, 1)
          break
        }
      }

      // If the number of pointers down is less than two then reset diff tracker
      if (this.evCache.length < 2) {
        this.prevDiff = -1
      }
      this.dragging = false
      this.zooming = false
      this.canvas.classList.remove('grabbing')
    }
    this.touchstart = (e) => {
      if (e.touches.length > 1) {
        this.zooming = true
        e.preventDefault()
      }
    }
    this.wheel = (e) => {
      const normalized = normalizeWheel(e);
      this.totalPixelY += normalized.pixelY

      if (this.totalPixelY > this.config.maxDistance) {
        this.totalPixelY = this.config.maxDistance
      }
      if (this.totalPixelY < -this.config.minDistance) {
        this.totalPixelY = -this.config.minDistance
      }
      e.preventDefault()
    }
    this.mousemove = (e) => {
      if (this.sizes.width < 768) {
        this.config.peeking = 0
      }
      this.parallax.x = (e.clientX / this.sizes.width - 0.5) * this.config.peeking
      this.parallax.y = (e.clientY / this.sizes.height - 0.5) * this.config.peeking
    }

    this.pointerMoveHandler = this.pointermove.bind(this)
    this.pointerDownHandler = this.pointerdown.bind(this)
    this.pointerUpHandler = this.pointerup.bind(this)
    this.touchstartHandler = this.touchstart.bind(this)
    this.wheelHandler = this.wheel.bind(this)
    this.mouseMoveHandler = this.mousemove.bind(this)
    this.setEventHandler()
  }

  update() {
    if (!this.zooming) {
      this.dX = -(this.x - this.pointStart.x) * this.config.scale
      this.dZ = -(this.y - this.pointStart.y) * this.config.scale

      if (this.previousDx !== this.dX) {
        this.dXs += this.dX
      }

      if (this.previousDz !== this.dZ) {
        this.dZs += this.dZ
      }

      if (this.dXs > this.maxLeft) {
        this.dXs = this.maxLeft
      }

      if (this.dXs < -this.maxRight) {
        this.dXs = -this.maxRight
      }

      if (this.dZs > this.maxTop) {
        this.dZs = this.maxTop
      }

      if (this.dZs < -this.maxBottom) {
        this.dZs = -this.maxBottom
      }

      this.pointStart.x = this.x
      this.pointStart.y = this.y

      this.previousDx = this.dX
      this.previousDz = this.dZ
    }
  }

  setEventHandler() {
    this.canvas.addEventListener('pointermove', this.pointerMoveHandler)
    this.canvas.addEventListener('pointerdown', this.pointerDownHandler)
    window.addEventListener('pointerup', this.pointerUpHandler)
    this.canvas.addEventListener('touchstart', this.touchstartHandler, { passive: false })
    this.canvas.addEventListener('wheel', this.wheelHandler, { passive: false });
    this.canvas.addEventListener('mousemove', this.mouseMoveHandler)
  }

  destory() {
    this.canvas.removeEventListener('pointermove', this.pointerMoveHandler)
    this.canvas.removeEventListener('pointerdown', this.pointerDownHandler)
    window.removeEventListener('pointerup', this.pointerUpHandler)
    this.canvas.removeEventListener('touchstart', this.touchstartHandler, { passive: false })
    this.canvas.removeEventListener('wheel', this.wheelHandler, { passive: false });
    this.canvas.removeEventListener('mousemove', this.mouseMoveHandler)
  }
}
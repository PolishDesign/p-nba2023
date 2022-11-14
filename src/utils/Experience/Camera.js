'use strict'
import * as THREE from 'three'
import Experience from './Experience.js'
import gsap from 'gsap'
import { CONFIG } from './Utils/Config'

export default class Camera {
  constructor() {
    this.experience = new Experience()

    this.debug = this.experience.debug
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas
    this.time = this.experience.time
    this.cursor = this.experience.cursor
    this.config = {
      ...CONFIG["CAMERA"],
      transitionIn: this.transitionIn.bind(this),
      transitionOut: this.transitionOut.bind(this),
      initScale: 1
    }
    this.scale = 1
    this.initX = this.config.initX * this.config.initialCameraScale
    this.initY = this.config.initY * this.config.initialCameraScale
    this.initZ = this.config.initZ * this.config.initialCameraScale
    this.offset = new THREE.Vector3(0, 0, 0)

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('map')

      this.debugFolder
        .add(this.config, 'damping')
        .name('damping')
        .min(1)
        .max(30)
        .step(0.1)

      this.debugFolder
        .add(this.config, 'scale')
        .min(2)
        .max(20)
        .step(1)

      this.debugFolder
        .add(this.config, 'duration')
        .min(1)
        .max(5)
        .step(0.1)

      this.debugFolder
        .add(this.config, 'transitionIn')
      this.debugFolder
        .add(this.config, 'transitionOut')
    }

    this.mode = 'MAP'

    this.setInstance()
  }

  setInstance() {
    this.cameraGroup = new THREE.Group()
    this.scene.add(this.cameraGroup)

    this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100)
    this.instance.position.set(this.initX, this.initY, this.initZ)
    this.instance.lookAt(new THREE.Vector3(0, 0, 0))
    this.cameraGroup.add(this.instance)
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
  }

  update() {
    if (this.mode === 'MAP') {
      this.updateZoomInOut()
      this.cameraGroup.position.x += (this.offset.x + ((this.cursor.parallax.x + this.cursor.dXs / 1000) - this.cameraGroup.position.x)) * this.config.damping * this.time.delta
      this.cameraGroup.position.z += (this.offset.z + ((this.cursor.parallax.y + this.cursor.dZs / 1000) - this.cameraGroup.position.z)) * this.config.damping * this.time.delta
    }
    // console.log(this.cameraGroup.position)
    // console.log(this.instance.position)
  }

  updateZoomInOut() {
    if (this.cursor.prevDiff !== -1 || this.cursor.totalPixelY) {
      const d = this.cursor.totalPixelY !== 0 ? this.cursor.totalPixelY : this.cursor.dDiffs * 10
      this.scale += (1 + ((d / 1000) - this.scale)) * 0.5
    }

    this.instance.position.x += (((this.initX * this.config.initScale) * this.scale) - this.instance.position.x) * 0.1
    this.instance.position.y += (((this.initY * this.config.initScale) * this.scale) - this.instance.position.y) * 0.1
    this.instance.position.z += (((this.initZ * this.config.initScale) * this.scale) - this.instance.position.z) * 0.1
  }

  reset() {
    this.cursor.dXs = 0
    this.cursor.dZs = 0
  }

  moveCamera(x, y, z) {
    this.reset()
    this.offset.x = this.cameraGroup.position.x - this.cursor.parallax.x
    this.offset.z = this.cameraGroup.position.z - this.cursor.parallax.y
    gsap.to(this.offset, {
      x,
      y,
      z,
      duration: 0.8,
      ease: 'power0.easeIn'
    }).eventCallback('onComplete', () => {
      this.moveCameraZoomIn()
      this.cursor.maxLeft = this.cursor.config.left - this.cameraGroup.position.x * 1000
      this.cursor.maxRight = this.cursor.config.right + this.cameraGroup.position.x * 1000
      this.cursor.maxTop = this.cursor.config.top - this.cameraGroup.position.z * 1000
      this.cursor.maxBottom = this.cursor.config.bottom + this.cameraGroup.position.z * 1000
    })
  }

  moveCameraZoomIn() {
    const distance = this.experience.isMobile ? this.cursor.config.minDistanceOnMobile : this.cursor.config.minDistance
    const params = {}
    if (this.experience.isMobile) {
      params['prevDiff'] = -2
      params['dDiffs'] = -distance
    } else {
      params['totalPixelY'] = -distance
    }
    params.duration = 0.8
    params.ease = 'Power0.easeOut'
    gsap.to(this.cursor, params).eventCallback('onComplete', () => {
      this.cursor.prevDdiff = -1
    })
  }

  moveCameraZoomOut() {
    const distance = this.experience.isMobile ? this.cursor.config.maxDistanceOnMobile : this.cursor.config.maxDistance
    const params = {}
    if (this.experience.isMobile) {
      params['prevDiff'] = -2
      params['dDiffs'] = distance
    } else {
      params['totalPixelY'] = distance
    }
    params.duration = 0.6
    params.ease = 'Strong.easeIn'
    gsap.to(this.cursor, params).eventCallback('onComplete', () => {
      this.cursor.prevDdiff = -1
    })
  }

  transitionIn() {
    gsap.from(this.instance.position, {
      x: this.initX * this.config.scale,
      y: this.initY * this.config.scale,
      z: this.initZ * this.config.scale,
      duration: this.config.duration,
      ease: 'power4.easeOut'
    })
  }

  transitionOut() {
    gsap.to(this.instance.position, {
      x: this.initX * this.config.scale,
      y: this.initY * this.config.scale,
      z: this.initZ * this.config.scale,
      duration: this.config.duration,
      ease: 'Strong.easeIn'
    })
  }
}
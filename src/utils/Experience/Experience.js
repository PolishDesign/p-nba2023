'use strict'
import SOURCES from './sources.js'
import { mobileCheck, isAndroid } from './Utils/Utils'
import * as THREE from 'three'
import Debug from './Utils/Debug.js'
import Sizes from './Utils/Sizes'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import Cursor from './Utils/Cursor.js'
import Resources from './Utils/Resources.js'
import PolishMan from './World/PolishMan.js'

let experience = null
export default class Experience {
  constructor(canvas) {
    if (experience) {
      return experience
    }
    experience = this
    this.canvas = canvas
    this.isMobile = mobileCheck()
    this.isAndroid = isAndroid()
    this.debug = new Debug()
    this.sizes = new Sizes()
    this.cursor = new Cursor()
    this.time = new Time()
    this.scene = new THREE.Scene()
    this.camera = new Camera()
    this.renderer = new Renderer()
    this.resources = new Resources(SOURCES)

    // 外面 functions
    // this.getSchoolLogo = () => {
    //   throw new Error('getSchoolLogo function must be override')
    // }

    // this.getRegionNames = () => {
    //   throw new Error('getRegionNames function must be override')
    // }

    // this.getSchoolCounts = () => {
    //   throw new Error('getSchoolCounts function must be override')
    // }

    this.sizes.on('resize', () => {
      this.resize()
    })

    this.time.on('tick', () => {
      this.update()
    })

    this.resources.on('ready', () => {

      this.polishMan = new PolishMan()

      this.resources.ready()
    })
  }

  resize() {
    this.camera.resize()
    this.renderer.resize()
  }

  update() {
    this.debug.status.begin()
    if (this.resources.isReady) {
      this.cursor.update()
      this.camera.update()
      this.polishMan.update()
    }
    this.renderer.update()
    this.debug.status.end()
  }

  destory() {
    if (this.debug.active) {
      this.debug.ui.destroy()
    }
    this.sizes.destory()
    this.time.destory()
    this.cursor.destory()

    // Tracerse the whole scene
    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose()
        for (const key in child.material) {
          const value = child.material[key]
          if (value && typeof value.dispose === 'function') {
            value.dispose()
          }
        }
      }
    })

    this.renderer.instance.dispose()
  }
}
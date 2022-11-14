import * as THREE from 'three'
import { CONFIG } from '../Utils/Config'
import Experience from '../Experience'

export default class Label {
  constructor(mesh) {
    this.experience = new Experience()
    this.camera = this.experience.camera
    this.isMobile = this.experience.isMobile
    this.isAndroid = this.experience.isAndroid
    this.config = CONFIG["LABEL"]
    this.name = mesh.name

    this.offset = new THREE.Vector3(
      this.config.labelOffsetX,
      this.config.labelOffsetY,
      this.config.labelOffsetZ,
    )

    this.position = new THREE.Vector3(
      mesh.position.x + this.offset.x,
      mesh.position.y + this.offset.y,
      mesh.position.z + this.offset.z
    )

    this.element = null
  }

  create() {
    throw new Error('create function must be override')
  }

  onMove(callback) {
    this.callback = callback
  }

  move() {
    this.callback()
  }
}
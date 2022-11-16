'use strict'
import * as THREE from 'three'
import BaseModel from './BaseModel.js'
export default class PolishMan extends BaseModel {
  constructor() {
    super()

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('open house')

      this.debugFolder
        .add(this.config, 'playhead')
        .name('playhead')
        .min(0.001)
        .max(2)
        .step(0.001)
    }

    this.setModel()
  }

  setModel() {
    this.model = this.resource.glb.scene
    console.log(this.model)


    this.mapBakedMaterial1 = new THREE.MeshBasicMaterial({
      map: this.resource.bakedTexture1,
      side: THREE.DoubleSide
    })

    this.mapBakedMaterial2 = new THREE.MeshBasicMaterial({
      map: this.resource.bakedTexture2,
      side: THREE.DoubleSide
    })

    this.mapBakedMaterial3 = new THREE.MeshBasicMaterial({
      map: this.resource.bakedTexture3,
      side: THREE.DoubleSide
    })

    this.model.traverse((mesh) => {
      if (mesh instanceof THREE.Mesh) {
        if (mesh.name === 'GROUND') {
          mesh.material = this.mapBakedMaterial1
        }
        if (mesh.name === 'BOT') {
          mesh.material = this.mapBakedMaterial2
        }
        if (mesh.name === 'MID1' || mesh.name === 'MID2' || mesh.name === 'MID3' || mesh.name === 'MID4' || mesh.name === 'MID5') {
          mesh.material = this.mapBakedMaterial3
        }
      }
    })

    this.model.position.x = 4
    this.model.position.y = -2
    this.model.position.z = -5.5

    this.scene.add(this.model)
  }

  update() {

  }
}
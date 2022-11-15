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
    // console.log(this.model)


    // this.mapBakedMaterial = new THREE.MeshBasicMaterial({
    //   map: this.resource.bakedTexture,
    //   side: THREE.DoubleSide
    // })

    // this.model.traverse((mesh) => {
    //   if (mesh instanceof THREE.Mesh) {
    //     mesh.material = this.mapBakedMaterial
    //   }
    // })

    this.model.position.x = -23
    this.model.position.y = -4
    this.model.position.z = -22

    this.scene.add(this.model)
  }

  update() {

  }
}
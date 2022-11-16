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

    this.mapBakedMaterial4 = new THREE.MeshBasicMaterial({
      map: this.resource.bakedTexture4,
      side: THREE.DoubleSide
    })

    this.mapBakedMaterial5 = new THREE.MeshBasicMaterial({
      map: this.resource.bakedTexture5,
      side: THREE.DoubleSide
    })

    this.mapBakedMaterial6 = new THREE.MeshBasicMaterial({
      map: this.resource.bakedTexture6,
      side: THREE.DoubleSide
    })

    this.mapBakedMaterial7 = new THREE.MeshBasicMaterial({
      map: this.resource.bakedTexture7,
      side: THREE.DoubleSide
    })

    this.mapBakedMaterial8 = new THREE.MeshBasicMaterial({
      map: this.resource.bakedTexture8,
      side: THREE.DoubleSide
    })

    this.mapBakedMaterial9 = new THREE.MeshBasicMaterial({
      map: this.resource.bakedTexture9,
      side: THREE.DoubleSide
    })

    console.log(this.resource.bakedTexture10)
    this.mapBakedMaterial10 = new THREE.MeshBasicMaterial({
      map: this.resource.bakedTexture10,
      side: THREE.DoubleSide
    })

    this.model.traverse((mesh) => {
      if (mesh instanceof THREE.Mesh) {
        if (mesh.name === 'GROUND') {
          mesh.material = this.mapBakedMaterial1
        }
        if (mesh.name.startsWith('BOT')) {
          mesh.material = this.mapBakedMaterial2
        }
        if (mesh.name.startsWith('MID')) {
          mesh.material = this.mapBakedMaterial3
        }
        if (mesh.name.startsWith('CUBE')) {
          mesh.material = this.mapBakedMaterial4
        }
        if (mesh.name.startsWith('F')) {
          mesh.material = this.mapBakedMaterial5
        }
        if (mesh.name.startsWith('LB')) {
          mesh.material = this.mapBakedMaterial6
        }
        if (mesh.name.startsWith('LEFT')) {
          mesh.material = this.mapBakedMaterial7
        }
        if (mesh.name.startsWith('MICC')) {
          mesh.material = this.mapBakedMaterial8
        }
        if (mesh.name.startsWith('SO')) {
          mesh.material = this.mapBakedMaterial9
        }
        if (mesh.name.startsWith('SS')) {
          mesh.material = this.mapBakedMaterial10
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
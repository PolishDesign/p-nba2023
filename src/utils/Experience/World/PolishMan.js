'use strict'
import * as THREE from 'three'
import { MESHES } from '../Utils/Config'
import gsap from 'gsap'
import BaseModel from './BaseModel.js'
import PolishManLabel from './PolishManLabel'
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
    // this.setLabels()
    // this.setTarget()
    // if (!this.isFromHome) {
    //   this.worldMapTransitionIn()
    // }
    this.smoothcameraPosition = new THREE.Vector3(10, 10, 4)
    this.smoothcameraTarget = new THREE.Vector3(0, 0, 0)

    this.transitionDone = true
    this.animating = null

    this.isPolishManAnimatingUp = false
    this.isPolishManAnimatingBack = false
  }

  setTarget() {
    const material = new THREE.MeshBasicMaterial({ color: 'red' })
    const geometry = new THREE.BoxGeometry(.1, .1, .1)
    this.target = new THREE.Mesh(geometry, material)
    this.target.visible = false
    this.target.position.set(0, 0, 0)
    this.scene.add(this.target)
  }

  setModel() {
    this.model = this.resource.glb.scene

    // let textureName = 'bakedTexture' + count

    // this.mapBakedMaterial = new THREE.MeshBasicMaterial({
    //   map: this.resource[textureName],
    //   side: THREE.DoubleSide
    // })

    // this.model.traverse((mesh) => {
    //   if (mesh instanceof THREE.Mesh) {
    //     mesh.material = this.mapBakedMaterial
    //   }
    // })

    this.model.position.x = -18
    this.model.position.y = 1
    // this.model.position.z = j - 5

    this.scene.add(this.model)
  }

  setLabels() {
    MESHES.map(mesh => {
      let label = new PolishManLabel(
        mesh
      )
      label.onMove(() => {
        // this.fly(mesh.code)
        console.log(mesh.cameraMove)
        // if (this.isMobile) {
        //   this.camera.moveCamera(
        //     mesh.mobileCameraMove.x,
        //     mesh.mobileCameraMove.y,
        //     mesh.mobileCameraMove.z
        //   )
        // } else {
        this.camera.moveCamera(
          mesh.cameraMove.x,
          mesh.cameraMove.y,
          mesh.cameraMove.z
        )
        // }
      })
      this.labels.push(label)
    })
  }

  setShadow() {
    this.sphereShadow = new THREE.Mesh(
      new THREE.PlaneGeometry(this.config.shadowWidth, this.config.shadowHeight),
      new THREE.MeshBasicMaterial({
        alphaMap: this.resource.shadowTexture,
        transparent: true,
        color: 0x000000
      })
    )
    this.sphereShadow.rotation.x = - Math.PI * 0.5
    this.sphereShadow.position.x = this.config.shadowPositionX + this.config.modelStartPositionX
    this.sphereShadow.position.y = this.config.shadowPositionY
    this.sphereShadow.position.z = this.config.shadowPositionZ + this.config.modelStartPositionZ
    this.sphereShadow.rotation.z = Math.PI * 2 / 30
    this.scene.add(this.sphereShadow)
  }

  fly(index) {
    this.camera.mode = 'TEST'
    this.isPolishManAnimatingUp = true
    this.animating = index - 1

    this.camera.reset()

    gsap.to(this.models[this.animating].rotation, {
      y: Math.PI * 2,
      delay: 0.5,
      duration: 0.8,
      ease: 'Sine.easeOut'
    })

    gsap.to(this.models[this.animating].position, {
      y: 4,
      duration: 2,
      ease: 'Back.easeOut'
    })

    gsap.to(this.camera.cameraGroup.position, {
      x: 0,
      y: 0,
      z: 0,
      duration: 0.8,
      ease: 'Sine.easeOut'
    })

    gsap.to(this.target.position, {
      x: this.models[this.animating].position.x,
      y: 4,
      z: this.models[this.animating].position.z,
      duration: 0.8,
      ease: 'Sine.easeOut'
    }).eventCallback('onComplete', () => {
      setTimeout(() => {
        this.isPolishManAnimatingUp = false
      }, 800)
    })

  }

  animatePolishManBack() {
    this.isPolishManAnimatingBack = true

    gsap.to(this.camera.instance.position, {
      x: 1,
      y: 3,
      z: 4,
      duration: 0.8,
      ease: 'Sine.easeOut'
    })

    gsap.to(this.target.position, {
      x: 0,
      y: 0,
      z: 0,
      delay: 0.5,
      duration: 0.8,
      ease: 'Sine.easeOut'
    })

    gsap.to(this.models[this.animating].position, {
      y: 0,
      duration: 1,
      ease: 'Back.easeIn'
    }).eventCallback('onComplete', () => {
      setTimeout(() => {
        this.isPolishManAnimatingBack = false
        this.camera.mode = 'MAP'
      }, 800)
    })
  }

  update() {

  }
}
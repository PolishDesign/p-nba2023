import Experience from '../Experience'
import * as THREE from 'three'

export default class Environment {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene

        this.setAmbLight()
        this.setSunLight()
    }

    setAmbLight() {
        this.ambLight = new THREE.AmbientLight(0xffffff, 4);
        this.scene.add(this.ambLight)
    }

    setSunLight() {
        this.sunLight = new THREE.DirectionalLight('#ffffff', 4)
        this.scene.add(this.sunLight)
    }
}
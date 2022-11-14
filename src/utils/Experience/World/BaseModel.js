import Experience from '../Experience'
import * as THREE from 'three'
import { CONFIG } from '../Utils/Config'
export default class BaseModel {
  constructor() {
    this.experience = new Experience()
    this.region = this.experience.region
    this.config = CONFIG["REGION"]
    this.isMobile = this.experience.isMobile
    this.isFromHome = this.experience.isFromHome
    this.debug = this.experience.debug
    this.transitionInDone = false

    this.scene = this.experience.scene
    this.camera = this.experience.camera
    this.sizes = this.experience.sizes
    this.resources = this.experience.resources

    this.resource = {}
    this.resources.sources.map((source) => {
      this.resource[source.name] = this.resources.items[source.name]

      switch (source.type) {
        case 'texture':
          if (source.name === 'shadowTexture') break
          this.resources.items[source.name].flipY = false
          this.resources.items[source.name].encoding = THREE.sRGBEncoding
          this.resources.items[source.name].generateMipmaps = false
          this.resources.items[source.name].minFilter = THREE.NearestFilter
          this.resources.items[source.name].magFilter = THREE.NearestFilter
          break
      }
    })

    this.labels = []
    this.frustum = new THREE.Frustum()
  }
}
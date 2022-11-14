'use strict'
import * as THREE from 'three'

import EventEmitter from "./EventEmitter";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { BASE_URL } from './Config';
import Experience from '../Experience';
export default class Resources extends EventEmitter {
  constructor(sources) {
    super()

    this.experience = new Experience()
    this.sources = sources

    this.items = {}
    this.totalResources = this.sources.length
    this.numberOfResourcesLoaded = 0
    this.isReady = false

    this.setLoaders()
    this.startLoading()
  }

  setLoaders() {
    this.loaders = {}
    this.loaders.dracoLoader = new DRACOLoader()
    this.loaders.dracoLoader.setDecoderPath(`${BASE_URL}draco/`)

    this.loaders.gltfLoader = new GLTFLoader()
    this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader)

    this.loaders.textureLoader = new THREE.TextureLoader()
  }

  async startLoading() {
    for (const source of this.sources) {
      switch (source.type) {
        case 'gltfModel':
          this.loaders.gltfLoader.load(
            source.path,
            (file) => {
              this.sourceLoaded(source, file)
            },
            () => {
              // console.log('process')
            },
            (error) => {
              console.log('failed', error)
            }
          )
          break
        case 'texture':
          this.loaders.textureLoader.load(
            source.path,
            (file) => {
              this.sourceLoaded(source, file)
            }
          )
          break
      }
    }
  }

  sourceLoaded(source, file) {
    this.items[source.name] = file

    this.numberOfResourcesLoaded++

    if (this.numberOfResourcesLoaded === this.totalResources) {
      this.trigger('ready')
    }
  }

  ready() {
    this.isReady = true
    if (this.callback) {
      this.callback()
    }
  }

  onReady(callback) {
    this.callback = callback
  }
}
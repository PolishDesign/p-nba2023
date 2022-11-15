import { BASE_URL } from "./Utils/Config"

export default [
  {
    name: 'glb',
    type: 'gltfModel',
    path: `${BASE_URL}models/nba.glb`
  },
  {
    name: 'bakedTexture',
    type: 'texture',
    path: `${BASE_URL}models/GROUND.png`
  }
]
import { BASE_URL } from "./Utils/Config"

export default [
  {
    name: 'glb',
    type: 'gltfModel',
    path: `${BASE_URL}models/nba.glb`
  },
  {
    name: 'bakedTexture1',
    type: 'texture',
    path: `${BASE_URL}models/GROUND.png`
  },
  {
    name: 'bakedTexture2',
    type: 'texture',
    path: `${BASE_URL}models/BOT.png`
  },
  {
    name: 'bakedTexture3',
    type: 'texture',
    path: `${BASE_URL}models/MID01.png`
  },
]
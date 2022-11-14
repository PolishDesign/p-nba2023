<script setup>
import { onMounted, ref, watchEffect, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import {
  Scene,
  PerspectiveCamera,
  TextureLoader,
  MeshBasicMaterial,
  WebGLRenderer,
  NearestFilter,
  Clock
} from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { getGiftByNumber } from '@/apis/gift'
import { useStore } from '@/stores/store.js'
import { storeToRefs } from 'pinia'
import { gsap } from 'gsap'
import { DEFAULT_NUMBER } from "@/consts/base"
// import Footer from '@/components/Footer.vue'

const props = defineProps({
  play: Boolean
})

const store = useStore()
const route = useRoute()
const router = useRouter()
const { browserName, isLoading } = storeToRefs(store)
const canvas = ref(null)
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// model loader
let model;
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);

const modelLoaded = (gltf) => {
  const textureLoader = new TextureLoader()
  const bakedTexture = textureLoader.load(giftCache.baked_image)
  bakedTexture.flipY = false

  bakedTexture.generateMipmaps = false
  bakedTexture.minFilter = NearestFilter
  bakedTexture.magFilter = NearestFilter

  const bakedMaterial = new MeshBasicMaterial({
    map: bakedTexture
  })

  store.polishManLoaded()
  gltf.scene.traverse((child) => {
    child.material = bakedMaterial
  })
  model = gltf.scene
  model.position.set(0, 0, 0)
  scene.add(model)
}
const polishManNumber = ref(route.params.id)

let giftCache = null
const ready = ref(false)

try {
  const { data: { gift, success } } = await getGiftByNumber(polishManNumber.value)
  if (!success) {
    throw 'gift number no existed'
  }
  if (!gift.is_unlock) {
    throw 'gift is locked'
  }
  giftCache = gift
  ready.value = true
  store.updatePolishMan(gift)
  loader.load('models/pd_setup-light.glb', modelLoaded)
  localStorage.setItem('selectedPolishManNumber', polishManNumber.value)
} catch (e) {
  router.replace({
    name: 'home',
    params: {
      id: localStorage.getItem('polishManNumber') || DEFAULT_NUMBER
    }
  })
}

// renderer
let renderer
let controls

// scene
const scene = new Scene()

// camera
const camera = new PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 1000)
camera.position.set(0, 25, 0)
scene.add(camera)

const cursor = {
  x: 0,
  y: 0
}

window.addEventListener('mousemove', (e) => {
  cursor.x = e.clientX / sizes.width - 0.5
  cursor.y = - (e.clientY / sizes.height - 0.5)
})

window.addEventListener('touchmove', (e) => {
  cursor.x = e.touches[0].clientX / sizes.width - 0.5
  cursor.y = - (e.touches[0].clientY / sizes.height - 0.5)
})

const clock = new Clock()
const animate = () => {
  requestAnimationFrame(animate);
  const elapsedTime = clock.getElapsedTime()
  if (model && props.play) {
    model.rotation.x = Math.sin(elapsedTime) * 0.05
    model.rotation.y = elapsedTime * 0.1 + 1.75 * Math.PI
    controls.update()
    camera.lookAt(model.position)
  }
  renderer.render(scene, camera);
}

const animated = ref(false)

watch(() => route.params.id, async (value) => {
  try {
    const { data: { gift, success } } = await getGiftByNumber(value)
    if (!success) {
      throw 'gift number no existed'
    }
    if (!gift.is_unlock) {
      throw 'gift is locked'
    }
    giftCache = gift
    ready.value = true
    store.updatePolishMan(gift)
    loader.load('models/pd_setup-light.glb', modelLoaded)
  } catch (e) {
    if (route.name === 'home') {
      router.replace({
        name: 'home',
        params: {
          id: localStorage.getItem('polishManNumber') || DEFAULT_NUMBER
        }
      })
    }
  }
}, {
  immediate: false
})

watchEffect(() => {
  if (props.play && !animated.value) {
    gsap.to(camera.position, {
      delay: 1,
      duration: 1,
      y: 0,
      ease: 'Strong.easeInOut'
    })
    gsap.to(camera.position, {
      duration: 1,
      delay: 1.1,
      z: browserName.value === 'safari' ? 1.6 : 1.4,
      ease: 'Bounce.easeInOut'
    }).eventCallback('onComplete', () => {
      animated.value = true
    })
  }
})

onMounted(() => {
  controls = new OrbitControls(camera, canvas.value)
  controls.enableDamping = true
  controls.enablePan = false
  controls.enableRotate = true
  controls.enableZoom = true
  controls.zoomSpeed = 0.8


  setTimeout(() => {
    controls.minPolarAngle = Math.PI * 0.45
    controls.maxPolarAngle = Math.PI * 0.55
    controls.minDistance = 1
    controls.maxDistance = 2
  }, 2000)

  renderer = new WebGLRenderer({
    canvas: canvas.value,
    alpha: true
  })
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  animate()
})

window.addEventListener('resize', (e) => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
</script>

<template>
  <div class="polish-man-container">
    <!-- <img class="web" :class="{ 'loaded': !isLoading }" src="@/assets/web.png" alt=""> -->
    <canvas id="polish-man" ref="canvas"></canvas>
    <!-- <Footer v-if="ready" /> -->
  </div>
</template>

<style scoped>
@keyframes fadeInOut {
  0% {
    opacity: 0;
    transform: rotate(-120deg);
  }

  100% {
    opacity: 1;
  }
}

.polish-man-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}

.web {
  position: absolute;
  z-index: -1;
  height: 100%;
}

.web.loaded {
  animation-name: fadeInOut;
  animation-duration: 2s;
}
</style>

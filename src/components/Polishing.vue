<script setup>
import lottie from 'lottie-web'
import { onMounted } from 'vue'
const dirname = '/lottie'
const loadingLottiePath = `${dirname}/20220621_Loading_150x150.json`
const emit = defineEmits(['domLoaded'])
lottie.destroy('polishing')

let loading = null

onMounted(() => {
  const target = document.querySelector('#polishing')

  loading = lottie.loadAnimation({
    name: 'polishing',
    container: target,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: loadingLottiePath
  })

  loading.addEventListener('DOMLoaded', () => {
    emit('domLoaded')
  })
})

</script>

<template>
  <Transition>
    <div class="polishing-container">
      <div id="polishing"></div>
    </div>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.polishing-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: var(--z-index-loading);
  background-color: var(--grad-900);
  position: absolute;
}

#polishing {
  min-width: 150px;
  min-height: 150px;
  width: 20%;
  max-width: 200px;
}

.polishing-container.remove-full-screen {
  background-color: transparent;
  margin-top: 23.5%;
  margin-bottom: 27.7%;
}

.polishing-container.absolute {
  position: absolute;
  top: 0;
  left: 0;
}
</style>

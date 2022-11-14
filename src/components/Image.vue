<script setup>
import { ref } from 'vue'
const props = defineProps({
  number: Number,
  src: String,
  alt: String
})
const emit = defineEmits(['imgLoaded'])
const imgRef = ref(null)
const loaded = ref(false)
const onload = () => {
  loaded.value = true
  emit('imgLoaded', props.number)
}
</script>

<template>
  <template v-if="!loaded">
    <img class="imgLoading" src="/images/lazy-polishman.png">
  </template>
  <Transition>
    <img ref="imgRef" :src="src" :alt="alt" @load="onload" v-show="loaded">
  </Transition>
</template>

<style>
@keyframes loading {
  from {
    opacity: 16%;
  }

  to {
    opacity: 64%;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

img {
  height: 100%;
}

.imgLoading {
  animation-name: loading;
  animation-duration: 1.6s;
  animation-iteration-count: infinite;
  animation-direction: alternate-reverse;
  animation-timing-function: ease-in;
  position: relative;
  top: 15px;
}
</style>
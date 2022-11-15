<script setup>
import Experience from '../utils/Experience/Experience';
import { useStore } from '@/stores/store.js'
import { ref, onMounted } from 'vue'
const canvas = ref(null)
const store = useStore()

onMounted(() => {
    const experience = new Experience(canvas.value)
    experience.resources.onReady(() => {
        console.log('ready')
        setTimeout(() => {
            store.hideLoading()
        }, 1000)
    })
})

</script>

<template>
    <div id="three-js-container">
        <canvas class="webgl" ref="canvas" />
    </div>
</template>

<style scoped>
#three-js-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: var(--z-index-three-js);
}
</style>

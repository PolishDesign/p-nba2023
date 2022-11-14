<script setup>
import { useStore } from '@/stores/store.js'
import { storeToRefs } from 'pinia'

const store = useStore()
const { isShowOverlay } = storeToRefs(store)

store.showOverlay()
</script>
<template>
    <Transition>
        <div class="overlay" v-show="isShowOverlay" />
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

.overlay {
    position: absolute;
    z-index: var(--z-index-overlay);
    background-color: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 100%;
}
</style>
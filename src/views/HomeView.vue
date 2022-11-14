<script setup>
import Polishing from "@/components/Polishing.vue";
import ThreeJS from "@/components/ThreeJS.vue";
import { useStore } from '@/stores/store.js'
import { storeToRefs } from 'pinia'
import Overlay from "../components/Overlay.vue";
import Cover from "../components/Cover.vue";

const store = useStore()
const { isLoading } = storeToRefs(store)
</script>

<template>
  <main>

    <ThreeJS />

    <Overlay />

    <Cover />

    <Polishing v-show="isLoading" />

  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
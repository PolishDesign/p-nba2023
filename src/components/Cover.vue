<script setup>
import { useStore } from '@/stores/store.js'
import IconNBALogoMark from "../components/icons/IconNBALogoMark.vue";
import IconNBALogo from "../components/icons/IconNBALogo.vue";

const store = useStore()

defineProps({
    isShowCover: Boolean
})

const expolre = () => {
    isShowCover.value = false
    store.hideOverlay()
}

</script>
<template>
    <Transition>
        <div class="cover-container" v-show="isShowCover">
            <div class="icon-nba-logo-mark">
                <IconNBALogoMark />
            </div>

            <div class="icon-nba-logo">
                <IconNBALogo />
            </div>

            <button class="btn btn-explore" @click="expolre">
                <p>探索地圖</p>
            </button>

            <p class="footer">
                © Polish Design 磨人設計 x Zeabur 雲<br />原生服務部署平台製作
            </p>
        </div>
    </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.6s 0.3s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.cover-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    top: -10%;
    z-index: var(--z-index-nba-cover);
}

.icon-nba-logo-mark {
    margin-bottom: 7vh;
}

.icon-nba-logo {
    margin-bottom: 10vh;
}

.footer {
    position: fixed;
    bottom: 16px;
    text-align: center;
}
</style>
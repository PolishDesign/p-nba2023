<script setup>
import { RouterView } from 'vue-router'
import { useStore } from '@/stores/store.js'
// import { useLog } from '@/utils/composition/useLog.js'

// const { debug } = useLog()
const store = useStore()
let userAgent = navigator.userAgent;
let browserName;

if (userAgent.match(/chrome|chromium|crios/i)) {
  browserName = "chrome";
} else if (userAgent.match(/firefox|fxios/i)) {
  browserName = "firefox";
} else if (userAgent.match(/safari/i)) {
  browserName = "safari";
} else if (userAgent.match(/opr\//i)) {
  browserName = "opera";
} else if (userAgent.match(/edg/i)) {
  browserName = "edge";
} else {
  browserName = "No browser detection";
}
// debug(`browserName: ${browserName}`)

store.updateBrowserName(browserName)
</script>

<template>
  <div class="wrapper">
    <RouterView />
  </div>
</template>

<style>
@import '@/assets/base.css';

#app {
  height: 100%;
}

.wrapper {
  height: 100%;
}

#three-js-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  user-select: none;
  position: absolute;
}

#three-js-container .webgl {
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
  overflow: hidden;
  -webkit-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
  cursor: grab;
  touch-action: none;
}

#three-js-container .webgl.grabbing {
  cursor: grabbing;
}

#three-js-container .point {
  position: absolute;
  top: 50%;
  left: 50%;
}

#three-js-container .point.visible.active .label {
  transform: scale(1.2, 1.2);
  transform-origin: bottom;
}

#three-js-container .point.visible.inactive .label {
  transform: scale(1, 1);
  opacity: 0.5;
}

#three-js-container .point.visible .label {
  transform: scale(1, 1) rotate(45deg);
  opacity: 1;
}

#three-js-container .point .label {
  position: absolute;
  background-color: #00D5BE;
  width: 42px;
  height: 42px;
  left: -20px;
  top: -20px;
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 3px;
  color: #fff;
  text-align: center;
  line-height: 28px;
  font-weight: bold;
  cursor: help;
  transition: transform 0.2s ease-out, opacity 0.2s;
  color: #555555;
  transform: scale(0, 0) rotate(45deg);
  opacity: 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

#three-js-container .point .label::after {
  content: '';
  position: absolute;
  width: 34px;
  height: 34px;
  background-color: white;
  border-radius: 50%;
  transform: rotate(45deg);
  z-index: -1;
}

#three-js-container .point .label .content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  transform: rotate(-45deg);
}

#three-js-container .point .label .content p {
  height: 12px;
  color: black;
  font-size: 12px;
}
</style>

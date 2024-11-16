<template>
  <div>
    <NuxtPage/>
    <UNotifications/>
  </div>
</template>

<style lang="scss">
@import '@coreui/coreui/dist/css/coreui.min.css';
@import 'vue3-toastify/dist/index.css';

.toast-body {
  > div {
    font-size: 13.5px;
  }
}

.error {
  color: #FF4C4C;
  font-size: 12px;
  position: relative;
  top: 10px;
  margin-bottom: 7px;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s ease-out;
}

.page-enter-from {
  opacity: 0;
  transform: scale(0.98);
}

.page-leave-to {
  opacity: 0;
  transform: scale(1.02);
}

.scale-fade-enter-active, .scale-fade-leave-active {
  transition: opacity 0.4s ease, transform 0.3s ease;
}

.scale-fade-enter-from {
  opacity: 0;
  transform: scaleY(0);
}

.scale-fade-enter-to {
  opacity: 1;
  transform: scaleY(1);
}

.scale-fade-leave-from {
  opacity: 1;
  transform: scaleY(1);
}

.scale-fade-leave-to {
  opacity: 0;
  transform: scaleY(0);
  transform-origin: bottom center;
}

.nested-enter-active,
.nested-leave-active {
  transition: opacity 0.5s ease;
}

.nested-enter-from,
.nested-leave-to {
  opacity: 0;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>

<template>
  <NuxtPage/>
</template>

<style lang="scss">
@import '@coreui/coreui/dist/css/coreui.min.css';

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

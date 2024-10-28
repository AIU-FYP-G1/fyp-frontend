<script setup lang="ts">
import UploadComponent from "~/components/UploadComponent.vue";

const uploadFormIsOpen = ref(false)
const currentPage = ref('dashboard')

watchEffect(() => {
  if (uploadFormIsOpen.value) {
    currentPage.value = 'upload'
  } else {
    currentPage.value = 'dashboard'
  }
})
</script>

<template>
  <div class="mid-navigation-container">
    <UploadComponent
        :upload-form-is-open="uploadFormIsOpen"
        @toggle-upload-form="uploadFormIsOpen = false"
    />
    <div class="navigation-group">
      <NuxtLink to="/dashboard">
        <div class="icon-container" :class="{'active': currentPage == 'dashboard'}" @click="uploadFormIsOpen = false">
          <UIcon name="game-icons:heart-beats"/>
        </div>
      </NuxtLink>
      <div class="linker"></div>
      <div class="icon-container" :class="{'active': currentPage == 'upload'}" @click="uploadFormIsOpen = true">
        <UIcon name="mynaui:cloud-upload"/>
      </div>
    </div>
    <div class="navigation-group">
      <NuxtLink to="/about">
        <div class="icon-container">
          <UIcon name="ion:settings-outline"/>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss">
.modal {
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
}

.mid-navigation-container {
  width: fit-content;
  margin-top: 6%;
  margin-right: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 90%;

  .icon-container {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    outline: 4.2px solid #FFF;
    background-color: #EFEFEF;
    color: #000;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      font-size: 21px;
      position: relative;
      top: 2px;
    }

    &.active {
      background-color: #5F94F5;
      color: #FFF;
    }
  }

  .linker {
    width: 8px;
    height: 13px;
    background-color: #FFF;
    margin: 0 auto;
  }
}
</style>
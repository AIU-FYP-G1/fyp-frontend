<script setup lang="ts">

</script>

<template>
  <div class="mid-navigation-container">
    <div class="navigation-group">
      <NuxtLink to="/dashboard">
        <div class="icon-container">
          <UIcon name="game-icons:heart-beats" />
        </div>
      </NuxtLink>
      <div class="linker"></div>
      <NuxtLink to="/about">
        <div class="icon-container">
          <UIcon name="mynaui:cloud-upload" />
        </div>
      </NuxtLink>
    </div>
    <div class="navigation-group">
      <NuxtLink to="/about">
        <div class="icon-container">
          <UIcon name="ion:settings-outline" />
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.mid-navigation-container {
  width: fit-content;
  margin-top: 6%;
  margin-right: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 90%;

  .router-link-active {
    .icon-container {
      background-color: #5F94F5;
      color: #FFF;
    }
  }

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
  }

  .linker {
    width: 8px;
    height: 13px;
    background-color: #FFF;
    margin: 0 auto;
  }
}
</style>
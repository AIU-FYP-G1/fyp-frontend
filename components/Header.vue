<script setup lang="ts">

</script>

<template>
  <div class="header-container">
    <div class="aiu-logo-container">
      <img src="@/public/images/aiu-logo.svg" alt="AIU SCI Logo" class="logo">
    </div>
    <div class="navigation-container">
      <div><NuxtLink to='/dashboard'>home</NuxtLink></div>
      <div><NuxtLink to='/about'>about</NuxtLink></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header-container {
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;

  .aiu-logo-container {
    width: 50px;
    height: 50px;
    margin-right: 50px;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .navigation-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 110px;

    > div {
      cursor: pointer;
      text-transform: uppercase;
      font-weight: 700;
      font-size: 14px;

      a {
        text-decoration: none;
        color: #464646;

        &:hover {
          color: #050339;
        }

        &.router-link-active {
          color: #4A6AF5;
        }
      }
    }
  }
}
</style>
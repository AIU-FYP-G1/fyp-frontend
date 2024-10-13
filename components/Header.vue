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
    <div class="search-container">
      <div class="input-control">
        <input type="text" placeholder="Search...">
        <div class="icon-container">
          <UIcon name="prime:search" />
        </div>
      </div>
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
    width: 100px;
    margin-right: 500px;

    > div {
      cursor: pointer;
      text-transform: uppercase;
      font-weight: 700;
      font-size: 13px;

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

  .search-container {
    .input-control {
      display: flex;
      align-items: center;

      .icon-container {
        width: 38px;
        height: 38px;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        left: -40px;
        border-radius: 50%;

        span {
          font-size: 19px;
          color: black;
          position: relative;
          left: 1px;
          top: 1px;
        }
      }

      input {
        height: 40px;
        width: 400px;
        border-radius: 20px;
        padding: 5px 20px 5px 17px;
        outline: 3.2px solid #FFF;
        font-size: 13px;
        font-weight: 550;
        background-color: #EFEFEF;
        color: #464646;
      }
    }
  }
}
</style>
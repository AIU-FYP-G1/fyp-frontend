<script setup lang="ts">

import Header from "~/components/Header.vue";
</script>

<template>
  <div class="dashboard-container">
    <Header />
    <div class="main-content">
      <Sidebar />
      <HeartCondition />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .dashboard-container {
    width: 100%;
    height: 100vh;
    background-color: #EFEFEF;
    padding: 25px 40px;
    overflow: hidden;

    .main-content {
      display: flex;
      height: 100%;
    }
  }
</style>
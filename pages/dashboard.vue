<script setup lang="ts">
import BlurOverlay from "~/components/base/BlurOverlay.vue";

definePageMeta({
  middleware: 'auth'
})

import Header from "~/components/Header.vue";
import {usePatient} from "~/stores/patient";

const patient = usePatient()

const isLoading = ref(true)

onMounted(async () => {
  await patient.fetchPatients()
  isLoading.value = false
})
</script>

<template>
  <div class="dashboard-container">
    <Header />
    <blur-overlay v-if="isLoading" />
    <div class="main-content" v-else>
      <Sidebar />
      <HeartCondition />
      <DashboardGrid />
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
    position: relative;

    .main-content {
      display: flex;
      height: 100%;
    }
  }
</style>
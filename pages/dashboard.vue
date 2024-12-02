<script setup lang="ts">
import BlurOverlay from "~/components/base/BlurOverlay.vue";

definePageMeta({
  middleware: 'auth'
})

import Header from "~/components/Header.vue";
import {usePatient} from "~/stores/patient";

const patient = usePatient()
const auth = useAuth()

const isLoading = ref(true)

onMounted(async () => {
  await patient.fetchPatients()
  await auth.fetchCurrentUserData()
  isLoading.value = false
})
</script>

<template>
  <div class="dashboard-container">
    <blur-overlay v-if="isLoading"/>
    <div class="dashboard-wrapper" v-else>
      <Header/>
      <div class="main-content">
        <Sidebar class="main-content__sidebar"/>
        <HeartCondition/>
        <DashboardGrid/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dashboard-container {
  width: 100%;
  height: 100vh;
  background-color: #EFEFEF;
  padding: 25px 40px;
  position: relative;
  overflow: scroll;

  .dashboard-wrapper {
    min-height: 100%;
    height: 100vh;

    .main-content {
      display: flex;
      height: 100%;
    }
  }
}

@media (max-width: 1100px) {
  .dashboard-container {
    padding: 25px;

    .main-content {
      flex-direction: column;
      padding-top: 30px;

      &__sidebar {
        display: none;
      }
    }
  }
}
</style>
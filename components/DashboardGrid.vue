<script setup lang="ts">
import PastPredictions from "~/components/molecules/PastPredictions.vue";
import DashboardPatients from "~/components/molecules/DashboardPatients.vue";
import DashboardInterpretation from "~/components/molecules/DashboardInterpretation.vue";
</script>

<template>
  <div class="dashboard-grid-container">
    <div class="grid-group">
      <PastPredictions/>
      <DashboardPatients class="dashboard-patients" />
    </div>
    <div class="grid-group">
      <DashboardInterpretation/>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'assets/scss/dashboard-grid.scss';

.dashboard-grid-container {
  width: 100%;
  margin-top: 30px;
  gap: 5px;
}

</style>
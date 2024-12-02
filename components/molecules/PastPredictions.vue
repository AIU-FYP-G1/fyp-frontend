<script setup lang="ts">

import BlurOverlay from "~/components/base/BlurOverlay.vue";
import VueApexCharts from "vue3-apexcharts";
import {usePatient} from "~/stores/patient";

const patients = usePatient()
</script>

<template>
  <div class="past-predictions">
    <div class="title">
      <UIcon name="material-symbols:circle"></UIcon>
      Potential Interpretation
    </div>
    <div class="chart-wrapper">
      <BlurOverlay v-if="patients.noDataToDisplay" message="No past predictions yet!" style="height: 92%"/>
      <VueApexCharts type="area" height="280" :options="patients.pastPredictionsChartOptions"
                     :series="patients.chartEjectionFractions"></VueApexCharts>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'assets/scss/dashboard-grid.scss';

.past-predictions {
  width: 68%;


  .chart-wrapper {
    position: relative;
    width: 100%;

    .vue-apexcharts {
      width: 100%;
    }
  }
}
</style>
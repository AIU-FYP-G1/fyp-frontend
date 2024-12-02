<script setup lang="ts">

import BlurOverlay from "~/components/base/BlurOverlay.vue";
import {usePatient} from "~/stores/patient";

const patients = usePatient()
</script>

<template>
  <div class="interpretation">
    <div class="title">
      <UIcon name="material-symbols:circle"></UIcon>
      Potential Interpretation
    </div>
    <div class="content">
      <BlurOverlay v-if="patients.noDataToDisplay" message="No interpretation yet!"/>
      <BlurOverlay v-else-if="patients.diagnosisLoading" message="Fetching.."/>
      <ul>
        <li v-if="patients.selectedDiagnosis?.interpretations.length == 0"><span>*</span>No Interpretation made!
        </li>
        <li v-for="interpretation in patients.selectedDiagnosis?.interpretations">
          <span>*</span>{{ interpretation.note }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'assets/scss/dashboard-grid.scss';

.interpretation {
  width: 100%;
  height: fit-content;
  padding-bottom: 20px;

  .content {
    outline: 3.5px solid #FFF;
    border-radius: 20px;
    padding: 15px 20px;
    width: 98%;
    margin: 0 auto;
    position: relative;
    min-height: 90px;

    ul {
      width: 90%;
      margin-bottom: 0;

      li {
        margin-bottom: 2px;
        font-weight: 550;
        font-size: 14px;
        color: #464646;

        &:last-child {
          margin-bottom: 0;
        }

        span {
          position: relative;
          top: 2px;
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
<script setup lang="ts">

import BlurOverlay from "~/components/base/BlurOverlay.vue";
import {usePatient} from "~/stores/patient";

const patients = usePatient()
const createPatientFormIsOpen = ref(false)
const navigatePatientsIsOpen = ref(false)
</script>

<template>
  <div class="patients-container">
    <CreatePatientPopup
        :create-patient-form-is-open="createPatientFormIsOpen"
        @toggle-create-patient-form="createPatientFormIsOpen = false"
    />
    <NavigatePatientsPopup
        :navigate-patients-is-open="navigatePatientsIsOpen"
        @toggle-navigate-patients="navigatePatientsIsOpen = false"
    />
    <div class="title">
      <UIcon name="material-symbols:circle"></UIcon>
      My Patients
    </div>
    <div class="patients">
      <div class="patients-wrapper">
        <div class="patient-name" @click="navigatePatientsIsOpen = true">
          <div class="patient">
            <div class="icon-container">
              <UIcon name="lucide:users"/>
            </div>
            <span>{{ patients.selectedPatient?.full_name }}</span>
          </div>
          <div class="dropdown-icon">
            <UIcon name="uiw:down"/>
          </div>
        </div>
        <div class="history">
          <BlurOverlay v-if="patients.diagnosisLoading" message="Fetching.."/>
          <div class="no-diagnoses-placeholder" v-if="patients.selectedPatientDiagnoses.length <= 0">
            No diagnoses made yet
          </div>
          <div
              v-else
              class="history-item"
              :class="{'active': patients.selectedDiagnosis == diagnosis}"
              v-for="diagnosis in patients.selectedPatientDiagnoses"
              :key="diagnosis.id" @click="patients.selectDiagnosis(diagnosis)"
          >
            {{ diagnosis.id }}. {{ diagnosis.diagnosis_date }}
          </div>
        </div>
        <BlurOverlay v-if="!patients.selectedPatient" message="No patients yet!"/>
      </div>
      <div class="add-patient">
        <button @click="createPatientFormIsOpen = true">
          Add Patient
          <UIcon name="solar:user-plus-line-duotone"/>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'assets/scss/dashboard-grid.scss';

.patients-container {
  height: 100%;
  min-width: 210px;
  width: 29%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  .patients {
    background-color: #FFF;
    border-radius: 15px;
    padding: 4px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 80%;

    .patients-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      position: relative;
      height: 72%;

      .patient-name {
        display: flex;
        align-items: center;
        cursor: pointer;
        margin-bottom: 30px;
        justify-content: space-between;
        width: 100%;

        .patient {
          display: flex;
          align-items: center;

          > span {
            color: #464646;
            font-size: 14px;
            width: 95px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          .icon-container {
            height: 50px;
            width: 50px;
            border-radius: 15px;
            background-color: #EFEFEF;
            color: #464646;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-right: 13px;

            span {
              font-size: 21px;
              position: relative;
              top: 2px;
            }
          }
        }

        .dropdown-icon {
          position: relative;
          top: 4px;
          right: 16px;
        }
      }

      .history {
        padding: 15px 20px 15px 17px;
        display: flex;
        flex-direction: column;
        background-color: #EFEFEF;
        border-radius: 15px;
        height: 61%;
        overflow-y: scroll;
        justify-content: flex-start;
        position: relative;

        .history-item {
          margin-bottom: 4px;
          color: #8F8F8F;
          font-size: 12.5px;
          cursor: pointer;

          &:last-child {
            margin-bottom: 0;
          }

          &.active {
            color: #4A6AF5;
            font-weight: 600;
          }
        }

        .no-diagnoses-placeholder {
          font-family: 'Jost', sans-serif;
          font-size: 14px;
        }
      }
    }

    .add-patient {
      width: 100%;

      button {
        background-color: #5F94F5;
        font-weight: 520;
        font-size: 14px;
        border-radius: 14px;
        padding: 7px 10px;
        color: #FFF;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        span {
          font-size: 19px;
          margin-left: 7px;
        }
      }
    }
  }
}
</style>
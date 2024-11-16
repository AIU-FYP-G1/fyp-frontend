<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts";
import {usePatient} from "~/stores/patient";
import BlurOverlay from "~/components/base/BlurOverlay.vue";

const patients = usePatient()
const createPatientFormIsOpen = ref(false)
const navigatePatientsIsOpen = ref(false)
</script>

<template>
  <div class="dashboard-grid-container">
    <CreatePatientPopup
        :create-patient-form-is-open="createPatientFormIsOpen"
        @toggle-create-patient-form="createPatientFormIsOpen = false"
    />
    <NavigatePatientsPopup
        :navigate-patients-is-open="navigatePatientsIsOpen"
        @toggle-navigate-patients="navigatePatientsIsOpen = false"
    />
    <div class="grid-group">
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
      <div class="patients-container">
        <div class="title">
          <UIcon name="material-symbols:circle"></UIcon>
          My Patients
        </div>
        <div class="patients">
          <div class="patients-wrapper">
            <div class="patient-name" @click="navigatePatientsIsOpen = true">
              <div class="icon-container">
                <UIcon name="lucide:users"/>
              </div>
              <span>{{ patients.selectedPatient?.full_name }}</span>
              <div class="dropdown-icon">
                <UIcon name="uiw:down"/>
              </div>
            </div>
            <div class="history">
              <BlurOverlay v-if="patients.diagnosisLoading" message="Fetching.." />
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
    </div>
    <div class="grid-group">
      <div class="interpretation">
        <div class="title">
          <UIcon name="material-symbols:circle"></UIcon>
          Potential Interpretation
        </div>
        <div class="content">
          <BlurOverlay v-if="patients.noDataToDisplay" message="No interpretation yet!"/>
          <BlurOverlay v-else-if="patients.diagnosisLoading" message="Fetching.." />
          <ul>
            <li><span>*</span> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem.</li>
            <li><span>*</span> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem.</li>
            <li><span>*</span> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dashboard-grid-container {
  width: 100%;
  margin-top: 30px;

  .grid-group {
    display: flex;
    width: 97%;
    height: 347px;
    overflow-y: hidden;
    justify-content: space-between;
    flex-direction: row;

    .title {
      margin-bottom: 25px;
      font-size: 18.5px;
      display: flex;
      align-items: center;
      color: #242424;

      span {
        color: #5F94F5;
        font-size: 13px;
        margin-right: 9px;
      }
    }
  }

  .patients-container {
    height: 100%;
    width: 210px;
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

          .dropdown-icon {
            position: relative;
            top: 2px;
            left: 12px;
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

  .past-predictions {
    .chart-wrapper {
      position: relative;
      width: 525px;

      .vue-apexcharts {
        width: 100%;
      }
    }
  }

  .interpretation {
    width: 100%;
    height: 240px;

    .content {
      outline: 3.5px solid #FFF;
      border-radius: 20px;
      padding: 15px 20px;
      width: 98%;
      margin: 0 auto;
      position: relative;

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
}
</style>
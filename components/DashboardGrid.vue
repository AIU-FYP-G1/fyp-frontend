<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts";
import {usePatient} from "~/stores/patient";
import BlurOverlay from "~/components/base/BlurOverlay.vue";

const series = [
  {
    name: 'series1',
    data: [31, 40, 28, 51, 42, 109, 100]
  },
]

const chartOptions = {
  chart: {
    height: 350,
    type: 'area'
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  xaxis: {
    type: 'datetime',
    categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy HH:mm'
    },
  },
}

const patient = usePatient()
</script>

<template>
  <div class="dashboard-grid-container">
    <div class="grid-group">
      <div class="past-predictions">
        <div class="title"><UIcon name="material-symbols:circle"></UIcon>Potential Interpretation</div>
        <div class="chart-wrapper">
          <BlurOverlay v-if="!patient.selectedPatient" message="No patients to show" style="height: 92%" />
          <VueApexCharts type="area" height="280" :options="chartOptions" :series="series"></VueApexCharts>
        </div>
      </div>
      <div class="patients-container">
        <div class="title"><UIcon name="material-symbols:circle"></UIcon>My Patients</div>
        <div class="patients">
          <div class="patients-wrapper">
            <div class="patient-name">
              <div class="icon-container">
                <UIcon name="lucide:users" />
              </div>
              <span>{{ patient.selectedPatient?.full_name }}</span>
              <div class="dropdown-icon">
                <UIcon name="uiw:down" />
              </div>
            </div>
            <div class="history">
              <div class="history-item">
                6. Younes Djelloul
              </div>
              <div class="history-item">
                5. Younes Djelloul
              </div>
              <div class="history-item">
                4. Younes Djelloul
              </div>
              <div class="history-item">
                3. Younes Djelloul
              </div>
              <div class="history-item">
                2. Younes Djelloul
              </div>
              <div class="history-item">
                1. Younes Djelloul
              </div>
            </div>
            <BlurOverlay v-if="!patient.selectedPatient" message="No patients to show" />
          </div>
          <div class="add-patient">
            <button>
              Add Patient
              <UIcon name="solar:user-plus-line-duotone" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="grid-group">
      <div class="interpretation">
        <div class="title"><UIcon name="material-symbols:circle"></UIcon>Potential Interpretation</div>
        <div class="content">
          <BlurOverlay v-if="!patient.selectedPatient" message="No interpretation yet!" />
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
    height: 81%;
    width: 210px;

    .patients {
      background-color: #FFF;
      border-radius: 15px;
      height: 97%;
      padding: 4px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .patients-wrapper {
        position: relative;
        height: 100%;

        .patient-name {
          display: flex;
          align-items: center;
          cursor: pointer;

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
          height: 47%;
          overflow-y: scroll;

          .history-item {
            margin-bottom: 4px;
            color: #8F8F8F;
            font-size: 14px;
            cursor: pointer;

            &:last-child {
              margin-bottom: 0;
            }

            &:first-child {
              color: #4A6AF5;
              font-weight: 600;
            }
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
      border: 1px solid #EFEFEF;
      outline: 3.5px solid #FFF;
      background-color: #EFEFEF;
      border-radius: 20px;
      padding: 15px 20px 0;
      position: relative;

      ul {
        li {
          margin-bottom: 2px;
          font-weight: 550;
          font-size: 14px;
          color: #464646;

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
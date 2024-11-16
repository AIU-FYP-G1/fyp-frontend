<script setup>
import {CModal} from "@coreui/vue/dist/esm/components/modal";
import {usePatient} from "~/stores/patient";
import {CListGroup, CListGroupItem} from "@coreui/vue/dist/esm/components/list-group/index.js";

const props = defineProps(['navigatePatientsIsOpen'])
const emit = defineEmits(['toggleNavigatePatients'])

const isOpen = computed({
  get: () => props.navigatePatientsIsOpen,
  set: () => emit('toggleNavigatePatients')
})

const patients = usePatient()

const displayPatient = (patient) => {
  patients.selectedPatient = patient
  emit("toggleNavigatePatients")
}
</script>

<template>
  <CModal
      alignment="center"
      :visible="isOpen"
      @close="emit('toggleNavigatePatients')"
      aria-labelledby="VerticallyCenteredExample"
  >
    <div class="popup-container">
      <div class="popup-title">Patients in record</div>
      <div class="popup-subtitle">These are the patients that are registered for you</div>
      <div class="patients-list">
        <CListGroup>
          <CListGroupItem
              as="a"
              v-for="patient in patients.patients"
              :active="patients.selectedPatient === patient"
              @click="displayPatient(patient)"
              class="patient"
          >
            <UAvatar alt="Female" size="sm" class="gender" />
            <div class="patient-details">
              <span>{{ patient.full_name }}</span>
              <span>{{ patient.date_of_birth ?? 'unknown' }}</span>
            </div>
          </CListGroupItem>
        </CListGroup>
      </div>
    </div>
  </CModal>
</template>

<style scoped lang="scss">

.popup-container {
  width: 100%;
  background-color: #EFEFEF;
  outline: 4px solid #FFF;
  border-radius: 15px;
  padding: 30px 40px;
  font-family: 'Jost', sans-serif;

  .popup-title {
    color: #242424;
    font-size: 23px;
    font-weight: bold;
  }

  .popup-subtitle {
    color: #8F8F8F;
    margin-bottom: 35px;
  }

  .patients-list {
    width: 100%;

    .patient {
      cursor: pointer;
      display: flex;
      flex-direction: row;
      align-items: center;

      &.active {
        background-color: #5F94F5;
        border: 1px solid transparent;
      }

      .patient-details {
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 17px;

        span:last-child {
          font-size: 11px;
        }
      }
    }
  }
}
</style>
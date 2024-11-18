<script setup>
import {computed} from 'vue'
import {CModal, CModalBody, CModalHeader} from "@coreui/vue/dist/esm/components/modal/index.js";
import {CFormInput, CInputGroup, CInputGroupText} from "@coreui/vue/dist/esm/components/form/index.js";
import {CSpinner} from "@coreui/vue/dist/esm/components/spinner/index.js";
import {CBadge} from "@coreui/vue/dist/esm/components/badge/index.js";
import {CListGroup, CListGroupItem} from "@coreui/vue/dist/esm/components/list-group/index.js";

import {usePatient} from "~/stores/patient.ts";

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true
  },
  searchQuery: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:isVisible', 'update:searchQuery'])
const patients = usePatient()

const localSearchQuery = computed({
  get: () => props.searchQuery,
  set: (value) => emit('update:searchQuery', value)
})

const allPatients = ref(patients.patients)
const allDiagnoses = ref(patients.selectedPatientDiagnoses)

watch(
    () => localSearchQuery.value,
    (newQuery) => {
      performSearch(newQuery);
    }
);

const performSearch = (query) => {
  const trimmedQuery = query.trim().toLowerCase();
  if (trimmedQuery === "") {
    allPatients.value = patients.patients;
    allDiagnoses.value = patients.selectedPatientDiagnoses;
    return;
  }

  patientsLoading.value = true;
  diagnosesLoading.value = true;

  setTimeout(() => {
    allPatients.value = patients.patients.filter((patient) =>
        patient.full_name.toLowerCase().includes(trimmedQuery) ||
        patient.id.toString().includes(trimmedQuery)
    );

    allDiagnoses.value = patients.selectedPatientDiagnoses.filter((diagnosis) =>
        diagnosis.ejection_fraction.toString().includes(trimmedQuery) ||
        diagnosis.diagnosis_date.toLowerCase().includes(trimmedQuery)
    );

    patientsLoading.value = false;
    diagnosesLoading.value = false;
  }, 200);
};


const patientsLoading = ref(false)
const diagnosesLoading = ref(false)

const isLoading = computed(() =>
    patientsLoading.value || diagnosesLoading.value
)

const filteredPatients = computed(() => allPatients.value || [])
const filteredDiagnoses = computed(() => allDiagnoses.value || [])

const noResults = computed(() =>
    !isLoading.value &&
    filteredPatients.value.length === 0 &&
    filteredDiagnoses.value.length === 0 &&
    localSearchQuery.value.length > 0
)

const handleClose = () => {
  emit('update:isVisible', false)
}

const handlePatientClick = (patient) => {
  emit('update:isVisible', false)
  patients.selectPatient(patient)
}

const handleDiagnosisClick = (diagnosis) => {
  emit('update:isVisible', false)
  patients.selectDiagnosis(diagnosis)
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}
</script>

<template>
  <CModal
      :visible="isVisible"
      alignment="top"
      size="lg"
      @close="handleClose"
      class="search-popup"
  >
    <CModalHeader style="margin-bottom: 10px" class="border-bottom-0">
      <CInputGroup class="w-100">
        <CInputGroupText id="search-icon">
          <UIcon name="stash:search-duotone"/>
        </CInputGroupText>
        <CFormInput
            v-model="localSearchQuery"
            placeholder="Search patients, diagnoses..."
            aria-label="Search"
            aria-describedby="search-icon"
            class="border-start-0"
            autofocus
        />
      </CInputGroup>
    </CModalHeader>

    <CModalBody class="pt-0 search-content">
      <div v-if="isLoading" class="py-4 text-center text-gray-500">
        <CSpinner/>
        <span class="ms-2">Searching...</span>
      </div>

      <div v-else class="search-results">
        <template v-if="filteredPatients.length > 0">
          <div class="search-section">
            <div class="section-header">
              <UIcon name="solar:user-bold-duotone" class="me-2"/>
              <span class="text-uppercase fw-semibold small">Patients</span>
              <CBadge color="info" class="ms-2">{{ filteredPatients.length }}</CBadge>
            </div>

            <div class="section-content">
              <CListGroup>
                <CListGroupItem
                    v-for="patient in filteredPatients"
                    :key="patient.id"
                    component="button"
                    @click="handlePatientClick(patient)"
                >
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <div class="fw-medium">{{ patient.full_name }}</div>
                      <small class="text-medium-emphasis">
                        ID: {{ patient.id }} • Last Visit: {{ formatDate(patient.created_at) }}
                      </small>
                    </div>
                    <UIcon name="material-symbols-light:chevron-right"/>
                  </div>
                </CListGroupItem>
              </CListGroup>
            </div>
          </div>

          <hr class="my-4"/>
        </template>

        <template v-if="filteredDiagnoses.length > 0">
          <div class="search-section">
            <div class="section-header">
              <UIcon name="si:heart-duotone" class="me-2"/>
              <span class="text-uppercase fw-semibold small">Diagnoses</span>
              <CBadge color="info" class="ms-2">{{ filteredDiagnoses.length }}</CBadge>
            </div>

            <div class="section-content">
              <CListGroup>
                <CListGroupItem
                    v-for="diagnosis in filteredDiagnoses"
                    :key="diagnosis.id"
                    component="button"
                    @click="handleDiagnosisClick(diagnosis)"
                >
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <small class="text-medium-emphasis">
                        Date: {{ formatDate(diagnosis.diagnosis_date) }} • EF: {{ diagnosis.ejection_fraction }}
                      </small>
                    </div>
                    <UIcon name="material-symbols-light:chevron-right"/>
                  </div>
                </CListGroupItem>
              </CListGroup>
            </div>
          </div>
        </template>
        <div
            v-if="!isLoading && noResults"
            class="text-center py-4 text-medium-emphasis"
        >
          <UIcon name="fa6-solid:face-sad-tear" size="xl" class="mb-3"/>
          <div>No results found for "{{ localSearchQuery }}"</div>
        </div>
      </div>
    </CModalBody>
  </CModal>
</template>

<style scoped>

.search-section {
  margin-bottom: 1rem;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
  color: var(--cui-body-color);
  font-size: 13px;
}

.section-content {
  margin-top: 0.5rem;
}

.search-content {
  min-height: 120px;
}
</style>
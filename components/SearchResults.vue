<script setup>
import {computed} from 'vue'
import {useRouter} from 'nuxt/app'
import {CModal, CModalBody, CModalHeader} from "@coreui/vue/dist/esm/components/modal/index.js";
import {CFormInput, CInputGroup, CInputGroupText} from "@coreui/vue/dist/esm/components/form/index.js";
import {CSpinner} from "@coreui/vue/dist/esm/components/spinner/index.js";
import {CBadge} from "@coreui/vue/dist/esm/components/badge/index.js";
import {CListGroup, CListGroupItem} from "@coreui/vue/dist/esm/components/list-group/index.js";

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

const emit = defineEmits(['closeSearch', 'update:searchQuery'])
const router = useRouter()

const localSearchQuery = computed({
  get: () => props.searchQuery,
  set: (value) => emit('update:searchQuery', value)
})

const patientsLoading = ref(false)
const patients = ref([])

const diagnosesLoading = ref(false)
const diagnoses = ref([])

const isLoading = computed(() =>
    patientsLoading.value || diagnosesLoading.value
)

const filteredPatients = computed(() => patients.value || [])
const filteredDiagnoses = computed(() => diagnoses.value || [])

const noResults = computed(() =>
    !isLoading.value &&
    filteredPatients.value.length === 0 &&
    filteredDiagnoses.value.length === 0 &&
    localSearchQuery.value.length > 0
)

const handleClose = () => {
  emit('closeSearch')
}

const handlePatientClick = (patient) => {
  router.push(`/patients/${patient.id}`)
  handleClose()
}

const handleDiagnosisClick = (diagnosis) => {
  router.push(`/patients/${diagnosis.patientId}/diagnoses/${diagnosis.id}`)
  handleClose()
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
    <CModalHeader class="border-bottom-0">
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

    <CModalBody class="pt-0">
      <!-- Loading State -->
      <div v-if="isLoading" class="py-4 text-center text-gray-500">
        <CSpinner/>
        <span class="ms-2">Searching...</span>
      </div>

      <div v-else class="search-results">
        <!-- Patients Section -->
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
                      <div class="fw-medium">{{ patient.name }}</div>
                      <small class="text-medium-emphasis">
                        ID: {{ patient.id }} • Last Visit: {{ formatDate(patient.lastVisit) }}
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

        <!-- Diagnoses Section -->
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
                      <div class="fw-medium">{{ diagnosis.patientName }}</div>
                      <small class="text-medium-emphasis">
                        Date: {{ formatDate(diagnosis.date) }} • EF: {{ diagnosis.ef }}
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
.search-popup :deep(.modal-dialog) {
  max-width: 600px;
  margin-top: 2rem;
}

.search-section {
  margin-bottom: 1rem;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  color: var(--cui-body-color);
}

.section-content {
  margin-top: 0.5rem;
}

:deep(.list-group-item) {
  cursor: pointer;
  transition: background-color 0.2s;
}

:deep(.list-group-item:hover) {
  background-color: var(--cui-gray-100);
}
</style>
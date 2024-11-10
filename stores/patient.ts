interface Patient {
  id: number
  doctor: number
  full_name: string
  date_of_birth: Date
  gender: string
  phone_number: string
  address: string
  created_at: Date
  updated_at: Date
}

interface PatientDiagnosis {
  id: number
  diagnosis_date: Date
  notes: string
  ejection_fraction: number
}

interface CreatePatientDiagnosis {
  file: File
}

export const usePatient = defineStore('patient', () => {
  let {$axios} = useNuxtApp()
  const api = $axios()

  const selectedPatientDiagnoses = ref<PatientDiagnosis[]>([])
  const patients = ref<Patient[]>([])
  const selectedPatient = computed((): Patient | null => {
    return patients.value?.length > 0 ? patients.value[0] : null
  })
  const selectedDiagnosis = computed((): PatientDiagnosis | null => {
    return selectedPatientDiagnoses.value?.length > 0 ? selectedPatientDiagnoses.value[0] : null
  })

  const noDataToDisplay = computed(() => !selectedPatient.value || selectedPatientDiagnoses.value.length <= 0)

  const fetchPatients = async () => {
    const {data} = await api.get('/patients/')
    patients.value = data
  }

  const fetchSelectedPatientDiagnoses = async () => {
    if (selectedPatient.value) {
      const {data} = await api.get(`/patients/${selectedPatient.value.id}/diagnoses/`)
      selectedPatientDiagnoses.value = data
    }
  }

  watch(selectedPatient, fetchSelectedPatientDiagnoses, {immediate: true})

  const refreshPatientDiagnoses = async () => {
    await fetchSelectedPatientDiagnoses()
  }

  const createNewDiagnose = async (data: CreatePatientDiagnosis) => {
    try {
      const payload = new FormData();
      payload.append('echocardiogram', data.file);

      const { data: responseData } = await api.post(`/patients/${selectedPatient.value?.id}/diagnoses/`, payload)
      await refreshPatientDiagnoses()
      return responseData
    } catch (error) {
      throw error
    }
  }

  return {
    fetchPatients,
    refreshPatientDiagnoses,
    createNewDiagnose,
    selectedPatient,
    patients,
    selectedPatientDiagnoses,
    noDataToDisplay,
    selectedDiagnosis
  }
})
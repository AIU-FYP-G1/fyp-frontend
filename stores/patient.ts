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
  diagnosis_date: string
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
    await fetchSelectedPatientDiagnoses()
  }

  const fetchSelectedPatientDiagnoses = async () => {
    if (selectedPatient.value) {
      const {data} = await api.get(`/patients/${selectedPatient.value.id}/diagnoses/`)
      selectedPatientDiagnoses.value = data
    }
  }

  watch(selectedPatient, fetchSelectedPatientDiagnoses)

  const refreshPatientDiagnoses = async () => {
    await fetchSelectedPatientDiagnoses()
  }

  const createNewDiagnose = async (data: CreatePatientDiagnosis) => {
    try {
      const payload = new FormData();
      payload.append('echocardiogram', data.file);

      const {data: responseData} = await api.post(`/patients/${selectedPatient.value?.id}/diagnoses/`, payload)
      await refreshPatientDiagnoses()
      return responseData
    } catch (error) {
      throw error
    }
  }

  const chartEjectionFractions = [
    {
      name: 'Ejection Fraction Over Time',
      data: [0]
    },
  ]

  const pastPredictionsChartOptions = {
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
      categories: ["2018-09-19T00:00:00.000Z"],
      labels: {
        format: 'MM/dd'
      },
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy HH:mm'
      }
    },
  }

  const formatPatientPastPredictions = watchEffect(() => {
    const ejectionFractions: number[] = []
    const formattedDates: string[] = []

    selectedPatientDiagnoses.value.forEach((diagnosis) => {
      ejectionFractions.push(diagnosis.ejection_fraction)
      formattedDates.push(diagnosis.diagnosis_date)
    })

    chartEjectionFractions[0].data = ejectionFractions
    pastPredictionsChartOptions.xaxis.categories = formattedDates
  })

  return {
    fetchPatients,
    refreshPatientDiagnoses,
    createNewDiagnose,
    formatPatientPastPredictions,
    selectedPatient,
    patients,
    selectedPatientDiagnoses,
    noDataToDisplay,
    selectedDiagnosis,
    pastPredictionsChartOptions,
    chartEjectionFractions,
  }
})
interface Patient {
  doctor: number
  full_name: string
  date_of_birth: Date
  gender: string
  phone_number: string
  address: string
  created_at: Date
  updated_at: Date
}

export const usePatient = defineStore('patient', () => {
  let {$axios} = useNuxtApp()
  const api = $axios()

  const patients = ref<Patient[]>([])
  const selectedPatient = computed((): Patient | null=> {
    return patients.value?.length > 0 ? patients.value[0] : null
  })

  const fetchPatients = async () => {
    const { data } = await api.get('/patients/')
    patients.value = data
    console.log(data)
  }

  return {
    fetchPatients,
    selectedPatient
  }
})
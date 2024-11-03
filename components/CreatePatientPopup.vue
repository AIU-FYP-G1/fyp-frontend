<script setup lang="ts">
import {CModal} from "@coreui/vue/dist/esm/components/modal";
import {z} from "zod";
import {ref} from "vue";
import {toast} from "vue3-toastify";

const props = defineProps(['createPatientFormIsOpen'])
const emit = defineEmits(['toggleCreatePatientForm'])

let {$axios} = useNuxtApp()
const api = $axios()

const isOpen = computed({
  get: () => props.createPatientFormIsOpen,
  set: () => emit('toggleCreatePatientForm')
})

const patientSchema = z.object({
  full_name: z
      .string()
      .min(3, {message: "full_name must be at least 3 characters long"})
      .max(50, {message: "full_name must be 50 characters or less"}),
  gender: z.enum(["M", "F"], {
    required_error: "Please select a gender.",
    invalid_type_error: "Invalid selection."}),
});

const patientState = reactive({
  full_name: '',
  gender: '',
})

let errors = reactive({
  full_name: '',
  gender: '',
});

const validateField = (field) => {
  const result = patientSchema.shape[field].safeParse(patientSchema[field]);
  errors[field] = result.success ? '' : result.error.errors[0].message;
};

const isSubmitting = ref(false)

const handleCreation = async () => {
  try {
    isSubmitting.value = true

    errors.full_name = '';
    errors.gender = '';

    const result = patientSchema.safeParse(patientState);
    if (!result.success) {
      result.error.errors.forEach((err) => {
        errors[err.path[0]] = err.message;
      });
      return;
    }

    await api.post('/patients/', patientState)
    toast.success("Patient created successfully", {
      bodyClassName: 'toast-body'
    });
    setTimeout(() => {
      emit('toggleCreatePatientForm')
    }, 900)
  } catch (error) {
    const {response: {data}} = error

    for (const [path, messages] of Object.entries(data)) {
      errors[path] = messages[0]
    }

    toast.error("An error occurred.", {
      bodyClassName: 'toast-body'
    });
  } finally {
    isSubmitting.value = false
  }
};
</script>

<template>
  <CModal
      alignment="center"
      :visible="isOpen"
      @close="emit('toggleCreatePatientForm')"
      aria-labelledby="VerticallyCenteredExample"
      size="md"
  >
    <div class="popup-container">
      <div class="popup-title">Create a new patient</div>
      <div class="popup-subtitle">Fill in the details to register a new patient profile.</div>

      <div class="input-container">
        <label for="full_name">Full Name</label>
        <input
            v-model="patientState.full_name"
            type="text"
            id="full_name"
            placeholder="The patient full_name"
            @blur="validateField('full_name')"
        />
        <transition name="scale-fade">
          <div v-if="errors.full_name" class="error">{{ errors.full_name }}</div>
        </transition>
      </div>

      <div class="input-container">
        <label for="gender">Gender</label>
        <div class="gender-container">
          <div class="gender">
            <input
                v-model="patientState.gender"
                type="radio"
                id="male"
                name="gender"
                value="M"
                @blur="validateField('gender')"
            />
            <label for="male">Male</label>
          </div>
          <div class="gender">
            <input
                v-model="patientState.gender"
                type="radio"
                id="female"
                name="gender"
                value="F"
                @blur="validateField('gender')"
            />
            <label for="female">Female</label>
          </div>
        </div>
      </div>

      <button class="upload-confirmation" @click="handleCreation">
        Create Patient
        <UIcon name="lets-icons:done-ring-round"/>
      </button>
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

  .input-container {
    display: flex;
    flex-direction: column;
    position: relative;
    margin: 0 auto 1.7rem;
    width: 250px;

    &:last-child {
      margin-bottom: 2.5rem;
    }

    .error {
      color: #FF4C4C;
      font-size: 12px;
      position: absolute;
      bottom: -19px;
    }

    label {
      font-size: 14px;
      color: #4A6AF5;
      margin-bottom: 8px;
      font-family: 'Inter', sans-serif;
      font-weight: 500;
    }

    input {
      color: #464646 !important;
      border-top: none;
      border-right: none;
      border-left: none;
      background: none;
      outline: none;
      border-bottom: 1.5px solid #D6D6D6;
      padding-bottom: 9px;
      font-size: 14px;
      width: 100%;

      &[type='radio'] {
        width: fit-content;
      }
    }

    .gender-container {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      margin-top: 5px;

      .gender {
        input {
          margin-right: 10px;
        }

        label {
          color: #242424;
        }
      }
    }
  }

  > button {
    width: 220px;
    height: 42px;
    background-color: #5F94F5;
    border-radius: 11px;
    color: white;
    font-weight: 550;
    font-size: 15.5px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;

    span {
      font-size: 20px;
      margin-left: 8px;
    }

    &:hover {
      background-color: #5281d9;
    }
  }
}
</style>
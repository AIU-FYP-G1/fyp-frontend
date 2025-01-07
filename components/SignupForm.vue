<script setup>
import {ref} from 'vue';
import {z} from 'zod';
import {toast} from 'vue3-toastify';

const emit = defineEmits(['switchTabs'])

let {$axios} = useNuxtApp()
const api = $axios()

const signupSchema = z.object({
  full_name: z
      .string()
      .min(3, {message: "full_name must be at least 3 characters long"})
      .max(50, {message: "full_name must be 50 characters or less"}),
  email: z
      .string()
      .min(1, {message: "Email is required"})
      .email({message: "Invalid email address"}),
  password: z
      .string()
      .min(8, {message: "Password must be at least 8 characters long"})
      .max(100, {message: "Password cannot be longer than 100 characters"}),
});

const signupState = reactive({
  full_name: '',
  email: '',
  password: '',
})

const isSubmitting = ref(false)
let errors = reactive({
  full_name: '',
  email: '',
  password: '',
});

const validateField = (field) => {
  const result = signupSchema.shape[field].safeParse(signupState[field]);
  errors[field] = result.success ? '' : result.error.errors[0].message;
};

const handleSubmit = async () => {
  try {
    isSubmitting.value = true

    errors.full_name = '';
    errors.email = '';
    errors.password = '';

    const result = signupSchema.safeParse(signupState);
    if (!result.success) {
      result.error.errors.forEach((err) => {
        errors[err.path[0]] = err.message;
      });
      return;
    }

    await api.post('/signup/', signupState)
    toast.success("Account created successfully", {
      bodyClassName: 'toast-body'
    });
    emit('switchTabs')

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
  <div class="signup-form">
    <UForm :schema="signupSchema" :state="signupState">
      <div class="input-container">
        <label for="full_name">Full Name</label>
        <input
            v-model="signupState.full_name"
            type="text"
            id="full_name"
            placeholder="Enter your full_name"
            @keyup="validateField('full_name')"
        />
        <transition name="scale-fade">
          <div v-if="errors.full_name" class="error">{{ errors.full_name }}</div>
        </transition>
      </div>

      <div class="input-container">
        <label for="email">Email</label>
        <input
            v-model="signupState.email"
            type="text"
            id="email"
            placeholder="Enter your email"
            @keyup="validateField('email')"
        />
        <transition name="scale-fade">
          <div v-if="errors.email" class="error">{{ errors.email }}</div>
        </transition>
      </div>

      <div class="input-container">
        <label for="password">Password</label>
        <input
            v-model="signupState.password"
            type="password"
            id="password"
            placeholder="*************"
            @keyup="validateField('password')"
        />
        <transition name="scale-fade">
          <div v-if="errors.password" class="error">{{ errors.password }}</div>
        </transition>
      </div>

      <UButton :loading="isSubmitting" type="submit" @click="handleSubmit">Sign Up</UButton>
    </UForm>
    <p class="have-account" @click="emit('switchTabs')">I have an account?</p>
  </div>
</template>

<style lang="scss" scoped>
.signup-form {
  width: 300px;

  form {
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 0 auto;

    .input-container {
      margin-bottom: 1.7rem;
      display: flex;
      flex-direction: column;

      &:last-child {
        margin-bottom: 0;
      }

      .error {
        color: #FF4C4C;
        font-size: 12px;
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
      }
    }

    button {
      background-color: #4A6AF5;
      color: white;
      padding: 0.57rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      margin-top: 10px;
      justify-content: center;
    }
  }

  .have-account {
    text-align: center;
    margin-top: 1.9rem;
    color: #E25B8C;
    cursor: pointer;
    font-weight: 700;
    font-size: 13px;
  }
}
</style>
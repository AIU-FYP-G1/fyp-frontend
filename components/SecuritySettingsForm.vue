<script setup lang="ts">

import Loader from "~/components/base/Loader.vue";
import {ref} from "vue";
import {toast} from "vue3-toastify";
import {z} from "zod";
import {useAuth} from "~/stores/auth";

const auth = useAuth()


const securitySchema = z.object({
  old_password: z
      .string()
      .min(8, {message: "Password must be at least 8 characters long"})
      .max(100, {message: "Password cannot be longer than 100 characters"}),
  password1: z
      .string()
      .min(8, {message: "Password must be at least 8 characters long"})
      .max(100, {message: "Password cannot be longer than 100 characters"}),
  password2: z
      .string()
      .min(8, {message: "Password must be at least 8 characters long"})
      .max(100, {message: "Password cannot be longer than 100 characters"}),
}).refine((data) => data.password1 === data.password2, {
  message: "Passwords must match",
  path: ["password2"],
});

let securityErrors = reactive({
  old_password: '',
  password1: '',
  password2: '',
});
let securityState = reactive({
  old_password: '',
  password1: '',
  password2: ''
});

const validateField = (field: keyof typeof securityState) => {
  const result = securitySchema.shape[field].safeParse(securityState[field]);
  securityErrors[field] = result.success ? '' : result.error.errors[0].message;
};

const isSubmitting = ref(false)

const clearSecurityForm = () => {
  securityState.old_password = '';
  securityState.password1 = '';
  securityState.password2 = '';
}

const updateProfileSecurity = async () => {
  try {
    isSubmitting.value = true

    securityErrors.old_password = '';
    securityErrors.password1 = '';
    securityErrors.password2 = '';

    const result = securitySchema.safeParse(securityState);
    if (!result.success) {
      result.error.errors.forEach((err) => {
        const fieldName = err.path[0]
        securityErrors[fieldName] = err.message;
      });
      return;
    }

    let payload = {
      old_password: securityState.old_password,
      new_password: securityState.password1,
    }

    await auth.changeProfilePassword(payload)

    setTimeout(() => {
      toast.success("Password Updated successfully", {
        bodyClassName: 'toast-body'
      });
      clearSecurityForm()
    }, 600)
  } catch (error: Error) {
    const {response: {data}} = error

    for (const [path, messages] of Object.entries(data)) {
      securityErrors[path] = messages[0]
    }

    toast.error("An error occurred.", {
      bodyClassName: 'toast-body'
    });
  } finally {
    setTimeout(() => {
      isSubmitting.value = false
    }, 600)
  }
}
</script>

<template>
  <div class="security-settings-wrapper">
    <div class="tab-content-header">
      <div class="text">
        Account Security
        <div>Edit your account security details</div>
      </div>
      <div class="navigation">
        <button @click="navigateTo('/dashboard')">
          <UIcon name="cil:arrow-left"/>
          Go Back
        </button>
        <button @click="updateProfileSecurity">Save Changes</button>
      </div>
    </div>
    <div class="general-container">
      <Loader v-if="isSubmitting"/>
      <UForm v-else :schema="securitySchema" :state="securityState">
        <div class="other-info group">
          <div class="title">
            Change Password
            <div>For an improved account security</div>
          </div>
          <div class="input-container">
            <label for="old_password">Old Password</label>
            <input
                v-model="securityState.old_password"
                type="password"
                id="old_password"
                placeholder="Old Password"
                @keyup="validateField('old_password')"
            />
            <transition name="scale-fade">
              <div v-if="securityErrors.old_password" class="error">{{ securityErrors.old_password }}</div>
            </transition>
          </div>
          <div class="input-container">
            <label for="password1">New Password</label>
            <input
                v-model="securityState.password1"
                type="password"
                id="password1"
                placeholder="New Password"
                @keyup="validateField('password1')"
            />
            <transition name="scale-fade">
              <div v-if="securityErrors.password1" class="error">{{ securityErrors.password1 }}</div>
            </transition>
          </div>
          <div class="input-container">
            <label for="password2">Repeat New Password</label>
            <input
                v-model="securityState.password2"
                type="password"
                id="password2"
                placeholder="Repeat New Password"
                @keyup="validateField('password2')"
            />
            <transition name="scale-fade">
              <div v-if="securityErrors.password2" class="error">{{ securityErrors.password2 }}</div>
            </transition>
          </div>
        </div>
      </UForm>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "assets/scss/settings.scss";

.security-settings-wrapper {
  width: 100%;
}
</style>
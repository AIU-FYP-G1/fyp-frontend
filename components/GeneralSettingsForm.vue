<script setup lang="ts">
import {useAuth} from "~/stores/auth";
import {z} from "zod";
import {ref} from "vue";
import {toast} from "vue3-toastify";
import Loader from "~/components/base/Loader.vue";

const props = defineProps(['originalProfile'])

const auth = useAuth()

const generalSchema = z.object({
  full_name: z
      .string()
      .min(3, {message: "full_name must be at least 3 characters long"})
      .max(50, {message: "full_name must be 50 characters or less"}),
  email: z
      .string()
      .min(1, {message: "Email is required"})
      .email({message: "Invalid email address"}),
});

const avatarUpload = ref<HTMLInputElement | null>(null)
const selectedAvatar = ref<File | null>(null)

const triggerAvatarUpload = () => {
  avatarUpload.value?.click()
}

const handleAvatarChange = (event: Event) => {

  const target = event.target as HTMLInputElement
  const avatar = target.files?.[0]
  if (avatar) {
    selectedAvatar.value = avatar

    const reader = new FileReader();
    reader.onloadend = () => {
      auth.avatarPreview = reader.result as string;
    };
    reader.readAsDataURL(avatar);
  }
}

let generalErrors = reactive({
  full_name: '',
  email: '',
});

const validateField = (field: keyof typeof auth.profileInformation) => {
  const result = generalSchema.shape[field].safeParse(auth.profileInformation[field]);
  generalErrors[field] = result.success ? '' : result.error.errors[0].message;
};

const isSubmitting = ref(false)

const updateGeneralInfoProfile = async () => {
  try {
    isSubmitting.value = true

    generalErrors.full_name = '';
    generalErrors.email = '';

    const result = generalSchema.safeParse(auth.profileInformation);
    if (!result.success) {
      result.error.errors.forEach((err) => {
        generalErrors[err.path[0]] = err.message;
      });
      return;
    }

    const formData = new FormData();
    for (const key in auth.profileInformation) {
      if (auth.profileInformation[key] !== props.originalProfile?.[key]) {
        formData.append(key, auth.profileInformation[key]);
      }
    }

    if (selectedAvatar.value) {
      formData.append("profile_picture", selectedAvatar.value);
    }

    await auth.updateProfileInformation(formData)

    setTimeout(() => {
      toast.success("Details Updated successfully", {
        bodyClassName: 'toast-body'
      });
    }, 600)
  } catch (error: Error) {
    const {response: {data}} = error

    for (const [path, messages] of Object.entries(data)) {
      generalErrors[path] = messages[0]
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
  <div class="general-settings-wrapper">
    <div class="tab-content-header">
      <div class="text">
        General Info
        <div>Edit your account's general information</div>
      </div>
      <div class="navigation">
        <button @click="navigateTo('/dashboard')">
          <UIcon name="cil:arrow-left"/>
          Go Back
        </button>
        <button @click="updateGeneralInfoProfile">Save Changes</button>
      </div>
    </div>
    <div class="general-container">
      <Loader v-if="isSubmitting"/>
      <UForm v-else :schema="generalSchema" :state="auth.profileInformation">
        <div class="update-avatar group">
          <div class="title">
            Profile Picture
            <div>This is how others will recognize you</div>
          </div>
          <div class="upload-container">
            <img :src="auth.getProfilePictureUrl()" alt="current-avatar">
            <input type="file" ref="avatarUpload" style="display: none;" accept="image/*"
                   @change="handleAvatarChange">
            <span class="edit-button" @click="triggerAvatarUpload"><UIcon name="fluent:edit-24-regular"/></span>
          </div>
        </div>
        <div class="other-info group">
          <div class="title">
            Personal Info
            <div>Others deserve to know you more</div>
          </div>
          <div class="input-container">
            <label for="fullname">Full Name</label>
            <input
                v-model="auth.profileInformation.full_name"
                type="text"
                id="fullname"
                placeholder="Full Name"
                @keyup="validateField('full_name')"
            />
            <transition name="scale-fade">
              <div v-if="generalErrors.full_name" class="error">{{ generalErrors.full_name }}</div>
            </transition>
          </div>
          <div class="input-container">
            <label for="email">Email Address</label>
            <input
                v-model="auth.profileInformation.email"
                type="text"
                id="email"
                placeholder="Email Address"
                @keyup="validateField('email')"
            />
            <transition name="scale-fade">
              <div v-if="generalErrors.email" class="error">{{ generalErrors.email }}</div>
            </transition>
          </div>
        </div>
      </UForm>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "assets/scss/settings.scss";

.general-settings-wrapper {
  width: 100%;
}
</style>
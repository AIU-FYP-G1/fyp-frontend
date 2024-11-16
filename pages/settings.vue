<script setup lang="ts">
import {z} from "zod";
import {ref} from "vue";
import {toast} from "vue3-toastify";
import {useAuth} from "~/stores/auth";
import Loader from '~/components/base/Loader.vue'

definePageMeta({
  middleware: 'auth'
})

let {$axios} = useNuxtApp()
const api = $axios()

const auth = useAuth()

const isLoading = ref(true)
const originalProfile = ref<Record<string, any> | null>(null);

onMounted(async () => {
  try {
    await auth.fetchCurrentUserData()
    originalProfile.value = {...auth.profileInformation};
    isLoading.value = false
  } catch (error) {
    console.log(error)
    toast.error("An error occurred while fetching data.", {
      bodyClassName: 'toast-body'
    });
  }
})

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
  password2: '',
  new_password: '',
});

const activeTab = ref('general')

watchEffect(() => {
  if (activeTab.value === 'security') {
    const result = securitySchema.safeParse(securityState);
    console.log(result);
    if (!result.success) {
      result.error.errors.forEach((err) => {
        securityErrors[err.path[0]] = err.message;
      });
    } else {
      securityErrors = {old_password: '', password1: '', password2: ''};
      securityErrors.old_password = ''
    }
  }

});

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
        securityErrors[err.path[0]] = err.message;
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
  <div class="settings-page">
    <Header/>
    <Loader v-if="isLoading"/>
    <div class="settings-container" v-else>
      <div class="settings-title">
        Settings
      </div>
      <div class="wrapper">
        <div class="tabs">
          <div class="title">
            <div class="avatar-container">
              <img :src="auth.profileInformation.profile_picture" alt="profile-picture">
            </div>
            <span>
              {{ auth.profileInformation.full_name }}
            </span>
          </div>
          <div
              class="tab"
              :class="{ 'active-tab': activeTab == 'general' }"
              @click="activeTab='general'"
          >
            <UIcon name="solar:user-bold-duotone"/>
            General
          </div>
          <div
              class="tab"
              :class="{ 'active-tab': activeTab == 'security' }"
              @click="activeTab='security'"
          >
            <UIcon name="material-symbols:security"/>
            Security
          </div>
        </div>
        <div class="tab-content" v-if="activeTab === 'general'">
          <GeneralSettingsForm :original-profile="originalProfile"/>
        </div>
        <div class="tab-content" v-else-if="activeTab === 'security'">
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
                  />
                  <transition name="scale-fade">
                    <div v-if="securityErrors.password2" class="error">{{ securityErrors.password2 }}</div>
                  </transition>
                </div>
              </div>
            </UForm>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.settings-page {
  background-color: #EFEFEF;
  padding: 25px 40px;
}

.settings-container {
  width: 100%;
  min-height: 100vh;
  padding: 50px 0;

  .settings-title {
    font-size: 29px;
    width: 80%;
    margin: 0 auto 40px;
    font-weight: 550;
    font-family: 'Jost', sans-serif;
  }

  .wrapper {
    margin: 0 auto;
    width: 80%;
    display: flex;
    align-items: flex-start;

    .tabs {
      width: 35%;
      padding: 20px 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
      border: 1px solid #cccccc;
      border-radius: 7px;
      margin-right: 20px;

      .tab {
        width: 100%;
        margin-bottom: 7px;
        cursor: pointer;
        color: #464646;
        font-size: 15px;
        font-weight: 500;
        padding: 8px 18px;
        border-radius: 7px;
        display: flex;
        align-items: center;

        span {
          margin-right: 6px;
        }

        &:last-child {
          margin-bottom: 0;
        }

        &.active-tab {
          border: 1px solid #cccccc;
          font-weight: 600;
          color: #5F94F5;
          box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.07);
        }

        &:hover {
          &:not(.active-tab) {
            background-color: rgba(201, 201, 201, 0.2);
          }
        }
      }

      > .title {
        font-size: 23px;
        font-weight: 600;
        font-family: 'Jost', sans-serif;
        display: flex;
        align-items: center;
        margin-bottom: 30px;
        width: 100%;

        .avatar-container {
          width: 55px;
          height: 55px;
          cursor: pointer;
          border-radius: 50%;
          outline: 3.2px solid #FFF;
          margin-right: 20px;

          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
      }
    }

    .tab-content {
      width: 65%;
      display: flex;
      flex-direction: column;
      align-items: center;
      border: 1px solid #cccccc;
      border-radius: 7px;
      padding-bottom: 40px;

      .tab-content-header {
        width: 100%;
        height: fit-content;
        padding: 13px 15px 13px 20px;
        margin-bottom: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ccc;

        .text {
          font-size: 15px;

          div {
            font-size: 12px;
            color: #7d7d7d;
          }
        }

        button {
          font-size: 14px;
          margin-right: 10px;
          border-radius: 3px;
          padding: 5px 13px;
          background-color: rgba(201, 201, 201, 0.2);
          display: inline-flex;
          align-items: center;

          span {
            margin-right: 10px;
          }

          &:last-child {
            margin-right: 0;
            background-color: #5F94F5;
            color: #fff;
            font-weight: 500;
            padding: 5px 15px;
          }
        }
      }

      .general-container {
        width: 75%;
        margin-left: 40px;

        .group {
          margin-bottom: 40px;

          .title {
            font-size: 16.5px;
            color: #242424;
            font-weight: 600;
            margin-bottom: 35px;

            div {
              font-size: 13px;
              color: #5D5D5D;
              font-weight: normal;
            }
          }

          &:last-child {
            margin-bottom: 0;
          }
        }

        .update-avatar {
          .upload-container {
            position: relative;
            margin: 0 auto;
            width: fit-content;

            img {
              border-radius: 50%;
              width: 75px;
              height: 75px;
              cursor: pointer;
              outline: 3.2px solid #FFF;
            }

            .edit-button {
              position: absolute;
              bottom: 3px;
              right: -3px;
              background-color: #5F94F5;
              padding: 8px 3px;
              border-radius: 50%;
              width: 25px;
              height: 25px;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              outline: 1.2px solid #FFF;

              span {
                color: white;
                font-size: 13.4px;
              }
            }
          }
        }

        .other-info {

          .input-container {
            margin-bottom: 1rem;
            display: flex;
            flex-direction: column;

            &:last-child {
              margin-bottom: 0;
            }

            label {
              font-size: 12.5px;
              color: #5D5D5D;
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
              font-size: 13px;
              width: 350px;
            }
          }
        }
      }
    }
  }
}
</style>
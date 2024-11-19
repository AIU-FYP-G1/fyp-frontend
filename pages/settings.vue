<script setup lang="ts">
import {ref} from "vue";
import {toast} from "vue3-toastify";
import {useAuth} from "~/stores/auth";
import Loader from '~/components/base/Loader.vue'

definePageMeta({
  middleware: 'auth'
})

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

const activeTab = ref('general')

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
        <Transition name="tab-transition" mode="out-in">
          <div class="tab-content" v-if="activeTab === 'general'">
            <GeneralSettingsForm :original-profile="originalProfile"/>
          </div>
          <div class="tab-content" v-else-if="activeTab === 'security'">
            <SecuritySettingsForm/>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.settings-page {
  background-color: #EFEFEF;
  padding: 25px 40px;
}

.tab-transition-enter-active,
.tab-transition-leave-active {
  transition: all 0.3s ease;
}

.tab-transition-enter-from {
  opacity: 0;
  transform: scale(0.8) translateY(50px);
}

.tab-transition-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.tab-transition-enter-to,
.tab-transition-leave-from {
  opacity: 1;
  transform: scale(1) translateY(0);
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
    }
  }
}

@media (max-width: 768px) {
  .settings-container {
    .settings-title {
      width: 100%;
    }

    .wrapper {
      flex-direction: column;
      width: 100%;
      gap: 1.3rem;

      > div {
        width: 100% !important;
      }

      .tab-content {
        .general-container {
          width: 90%;
        }
      }
    }
  }
}
</style>
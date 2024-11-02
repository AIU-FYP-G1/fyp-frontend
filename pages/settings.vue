<script setup lang="ts">
const activeTab = ref('general')
const avatarUpload = ref<HTMLInputElement | null>(null)
const selectedAvatar = ref<File | null>(null)

const triggerAvatarUpload = (): void => {
  avatarUpload.value?.click()
}

const handleAvatarChange = (event: Event): void => {
  const target = event.target as HTMLInputElement
  const avatar = target.files?.[0]

  if (avatar) {
    selectedAvatar.value = avatar
  }
}

const updateProfile = () => {
  console.log('Profile updated')
}
</script>

<template>
  <div class="settings-container">
    <div class="settings-title">
      Settings
    </div>
    <div class="wrapper">
      <div class="tabs">
        <div class="title">
          <div class="avatar-container">
            <img src="@/public/images/profile-avatar.jpg" alt="profile-picture">
          </div>
          <span>
        Younes Djelloul
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
            <button @click="updateProfile">Save Changes</button>
          </div>
        </div>
        <div class="general-container" v-if="activeTab === 'general'">
          <div class="update-avatar group">
            <div class="title">
              Profile Picture
              <div>This is how others will recognize you</div>
            </div>
            <div class="upload-container">
              <img src="@/public/images/profile-avatar.jpg" alt="current-avatar">
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
              <label for="password">Full Name</label>
              <input
                  type="text"
                  id="fullname"
                  placeholder="Full Name"
              />
            </div>
            <div class="input-container">
              <label for="password">Email Address</label>
              <input
                  type="text"
                  id="email"
                  placeholder="Email Address"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="tab-content" v-if="activeTab === 'security'">
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
            <button @click="updateProfile">Save Changes</button>
          </div>
        </div>
        <div class="general-container">
          <div class="other-info group">
            <div class="title">
              Change Password
              <div>For an improved account security</div>
            </div>
            <div class="input-container">
              <label for="old_password">Old Password</label>
              <input
                  type="password"
                  id="old_password"
                  placeholder="Old Password"
              />
            </div>
            <div class="input-container">
              <label for="new_password">New Password</label>
              <input
                  type="password"
                  id="new_password"
                  placeholder="New Password"
              />
            </div>
            <div class="input-container">
              <label for="repeat_new_password">Repeat New Password</label>
              <input
                  type="password"
                  id="repeat_new_password"
                  placeholder="Repeat New Password"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.settings-container {
  width: 100%;
  min-height: 100vh;
  padding: 50px 50px;
  background-color: #EFEFEF;

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
            //font-size: 18px;
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
            margin-bottom: 1.5rem;
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
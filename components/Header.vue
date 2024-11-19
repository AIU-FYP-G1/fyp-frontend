<script setup lang="ts">
import {useAuth} from "~/stores/auth";

const auth = useAuth()

const q = ref('')
const isSearchOpen = ref(false)
</script>

<template>
  <div class="header-container">
    <SearchResults
        v-model:is-visible="isSearchOpen"
        v-model:search-query="q"
    />
    <div class="left-section">
      <UIcon class="sidebar-handler" name="ant-design:bars-outlined"/>
      <div class="left-section-lg-screen">
        <div class="aiu-logo-container">
          <img src="@/public/images/aiu-logo.svg" alt="AIU SCI Logo" class="logo">
        </div>
        <div class="navigation-container">
          <div>
            <NuxtLink to='/dashboard'>home</NuxtLink>
          </div>
          <div>
            <NuxtLink to='/about'>about</NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div class="right-section">
      <div class="search-container">
        <div class="input-control" @click="isSearchOpen = true">
          <input type="text" placeholder="Search..." v-model="q">
          <div class="icon-container">
            <UIcon name="prime:search"/>
          </div>
        </div>
      </div>
      <div class="profile-avatar-container">
        <img :src="auth.profileInformation.profile_picture" alt="Profile Avatar" class="avatar">
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header-container {
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  .left-section {
    .sidebar-handler {
      display: none;
      font-size: 24px;
      cursor: pointer;
    }

    .left-section-lg-screen {
      display: flex;

      .aiu-logo-container {
        width: 50px;
        height: 50px;
        margin-right: 50px;
        cursor: pointer;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .navigation-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        > div {
          cursor: pointer;
          text-transform: uppercase;
          font-weight: 700;
          font-size: 13px;
          margin-right: 20px;

          a {
            text-decoration: none;
            color: #464646;

            &:hover {
              color: #050339;
            }

            &.router-link-active {
              color: #4A6AF5;
            }
          }
        }
      }
    }
  }

  .right-section {
    display: flex;

    .search-container {
      margin-right: 35px;
      width: 405px;

      .input-control {
        display: flex;
        align-items: center;
        position: relative;
        cursor: pointer;
        width: 100%;

        .icon-container {
          width: 38px;
          height: 38px;
          background-color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          right: 2px;
          border-radius: 50%;
          cursor: pointer;

          span {
            font-size: 19px;
            color: black;
            position: relative;
            left: 1px;
            top: 1px;
          }
        }

        input {
          height: 40px;
          width: 100%;
          border-radius: 20px;
          padding: 5px 20px 5px 17px;
          outline: 3.2px solid #FFF;
          font-size: 12px;
          font-weight: 550;
          background-color: #EFEFEF;
          color: #464646;
          cursor: pointer;
        }
      }
    }

    .profile-avatar-container {
      width: 40px;
      height: 40px;
      cursor: pointer;
      border-radius: 50%;
      outline: 3.2px solid #FFF;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

@media (max-width: 768px) {
  .header-container {
    .left-section {
      width: 10%;

      .left-section-lg-screen {
        display: none;
      }

      .sidebar-handler {
        display: inline-block;
      }
    }

    .right-section {
      width: 90%;
      justify-content: flex-end;

      .search-container {
        width: 76%;
        margin-right: 20px;
      }
    }
  }
}
</style>
<script setup>
import {CTab, CTabContent, CTabList, CTabPanel, CTabs} from "@coreui/vue/dist/esm/components/tabs/index.js";

const tabs = [
  {
    label: 'Sign Up',
    icon: 'fluent:table-48-filled',
    slot: 'sign-up',
  },
  {
    label: 'Sign In',
    icon: 'gridicons:stats',
    slot: 'sign-in',
  }
]

</script>

<template>
  <div class="app">
    <div class="left-panel">
      <div class="aiu-logo">
        <img src="@/public/images/aiu-logo.svg" alt="AIU SCI Logo" class="logo">
      </div>
      <div class="doctor-image">
        <img src="@/public/images/doctor-login-image.svg" alt="Doctor"/>
      </div>
      <p class="copyright">&copy; 2024 AIU SCI. All rights reserved</p>
    </div>
    <div class="right-panel">
      <div class="form-container">
        <CTabs :activeItemKey="1">
          <CTabList variant="underline-border" class="form-navigation">
            <CTab aria-controls="home-tab-pane" :itemKey="1">Sign Up</CTab>
            <CTab aria-controls="profile-tab-pane" :itemKey="2">Sign In</CTab>
          </CTabList>
          <CTabContent class="form-content">
            <CTabPanel className="py-3" aria-labelledby="home-tab-pane" :itemKey="1">
              <SignupForm/>
            </CTabPanel>
            <CTabPanel className="py-3" aria-labelledby="profile-tab-pane" :itemKey="2">
            </CTabPanel>
          </CTabContent>
        </CTabs>
      </div>
      <div class="contact-info">
        <p><UIcon name="ic:twotone-phone" class="" /> +600000000000</p>
        <p><UIcon name="uiw:mail" class="" /> mail@gmail.com</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.app {
  display: flex;
  height: 100vh;

  .left-panel {
    flex: 1;
    background-color: #4285F4;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2rem;

    .aiu-logo {
      width: 70px;
      margin: 0 0 2rem 3rem;

      img {
        width: 100%;
        object-fit: cover;
      }
    }

    .copyright {
      color: #464646;
      font-size: 0.8rem;
      margin: 0 auto 1rem;
      font-weight: 700;
    }

    .doctor-image {
      width: 350px;
      height: 365px;
      border-radius: 0 0 50% 50%;
      overflow: hidden;
      margin: 0 auto;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .right-panel {
    flex: 1;
    background-color: #E9ECF5;
    padding: 2rem;

    .form-container {
      width: 61.5%;
      height: 480px;
      border-radius: 22px;
      overflow: hidden;
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
      background-color: #EEEEEE;
      margin: 30px auto -6px;

      .tabs {
        height: 100%;

        .form-navigation {
          padding: 10px 0 0 40px;
          background-color: #EEEEEE;
          height: 60px;
          border: none;
          box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.09);

          button {
            color: #464646;

            &.active {
              border-bottom: 4px solid #4A6AF5;
              border-radius: 3px;
            }
          }
        }

        .form-content {
          height: 100%;
          border-radius: 22px;
          background-color: #F5F4F5;
          box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
          display: flex;
          align-items: center;
          flex-direction: column;
          padding-top: 20px;
        }
      }
    }

    .contact-info {
      margin-top: 2.7rem;
      text-align: center;
      display: flex;
      justify-content: center;

      p {
        margin: 0.5rem 0;
        color: #464646;
        font-size: 13px;
        display: flex;
        align-items: center;

        &:first-child {
          margin-right: 1.5rem;
        }

        span {
          margin-right: 0.5rem;
          color: #4285F4;
        }
      }
    }
  }
}
</style>
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
      <!--      <img src="/logo.png" alt="AIU SCI Logo" class="logo">-->
      <div class="doctor-image">
        <img src="@/public/images/doctor-login-image.jpg" alt="Doctor"/>
      </div>
      <p class="copyright">&copy; 2024 AIU SCI. All rights reserved</p>
    </div>
    <div class="right-panel">
      <div class="form-container">
        <CTabs :activeItemKey="1">
          <CTabList variant="underline-border">
            <CTab aria-controls="home-tab-pane" :itemKey="1">Sign In</CTab>
            <CTab aria-controls="profile-tab-pane" :itemKey="2">Sign Up</CTab>
          </CTabList>
          <CTabContent>
            <CTabPanel className="py-3" aria-labelledby="home-tab-pane" :itemKey="1">
              <LoginForm/>
            </CTabPanel>
            <CTabPanel className="py-3" aria-labelledby="profile-tab-pane" :itemKey="2">
              Profile tab content
            </CTabPanel>
          </CTabContent>
        </CTabs>
      </div>
      <div class="social-icons">
        <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
        <a href="#" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
        <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
      </div>
      <div class="contact-info">
        <p><i class="fas fa-phone"></i> +600000000000</p>
        <p><i class="fas fa-envelope"></i> mail@gmail.com</p>
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
    align-items: center;
    justify-content: space-between;
    padding: 2rem;

    .logo {
      width: 100px;
      margin-bottom: 2rem;
    }

    .copyright {
      color: white;
      font-size: 0.8rem;
    }

    .doctor-image {
      width: 300px;
      height: 300px;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .right-panel {
    flex: 1;
    background-color: #F8F9FA;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;

    .social-icons {
      display: flex;
      justify-content: center;
      margin-top: 2rem;

      a {
        margin: 0 0.5rem;
        color: #4285F4;
        font-size: 1.5rem;
      }
    }

    .contact-info {
      margin-top: 2rem;
      text-align: center;

      p {
        margin: 0.5rem 0;
        color: #666;

        i {
          margin-right: 0.5rem;
          color: #4285F4;
        }
      }
    }
  }
}
</style>
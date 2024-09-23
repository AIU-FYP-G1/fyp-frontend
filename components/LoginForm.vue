<script setup>
import {ref} from 'vue';

const activeTab = ref('signup');

const handleSubmit = () => {
  // Handle form submission
  console.log('Form submitted:', {fullName: fullName.value, email: email.value, password: password.value});
};
</script>

<template>
  <div class="login-form">
    <form @submit.prevent="handleSubmit">
      <UInput
          name="q"
          v-model="q"
          placeholder="Search..."
          icon="i-heroicons-magnifying-glass-20-solid"
          autocomplete="off"
          :ui="{ icon: { trailing: { pointer: '' } } }"
      />
      <UInput
          name="q"
          placeholder="Search..."
          icon="i-heroicons-magnifying-glass-20-solid"
          autocomplete="off"
          :ui="{ icon: { trailing: { pointer: '' } } }"
      />
      <UInput
          name="q"
          placeholder="Search..."
          icon="i-heroicons-magnifying-glass-20-solid"
          autocomplete="off"
          :ui="{ icon: { trailing: { pointer: '' } } }"
      />
      <button type="submit">{{ activeTab === 'signup' ? 'Sign Up' : 'Sign In' }}</button>
    </form>
    <p v-if="activeTab === 'signup'" class="have-account">I have an account?</p>
  </div>
</template>

<style lang="scss" scoped>
.login-form {
  width: 300px;

  form {
    display: flex;
    flex-direction: column;

    > div.relative {
      margin-bottom: 1rem;

      input {
        color: black !important;
      }
    }

    button {
      background-color: #4285F4;
      color: white;
      padding: 0.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .have-account {
    text-align: center;
    margin-top: 1rem;
    color: #4285F4;
    cursor: pointer;
  }
}
</style>
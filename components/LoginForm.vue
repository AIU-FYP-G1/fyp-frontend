<script setup>
import {z} from 'zod';

const loginSchema = z.object({
  email: z
      .string()
      .min(1, {message: "Email is required"})
      .email({message: "Invalid email address"}),
  password: z
      .string()
      .min(8, {message: "Password must be at least 8 characters long"})
      .max(100, {message: "Password cannot be longer than 100 characters"}),
});

const loginState = reactive({
  email: '',
  password: '',
})

const handleSubmit = () => {
  console.log('Form submitted');
};
</script>

<template>
  <div class="login-form">
    <UForm :schema="loginSchema" :state="loginState" @submit="handleSubmit">
      <div class="input-container">
        <label for="email">Email</label>
        <input
            v-model="loginState.email"
            type="text"
            id="email"
            placeholder="Enter your email"
        />
      </div>

      <div class="input-container">
        <label for="password">Password</label>
        <input
            v-model="loginState.password"
            type="password"
            id="password"
            placeholder="*************"
        />
      </div>

      <button type="submit">Sign Up</button>
    </UForm>
    <p class="not-registered">Not Registered?</p>
  </div>
</template>

<style lang="scss" scoped>
.login-form {
  width: 300px;
  margin-top: 20px;

  form {
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 0 auto;

    .input-container {
      margin-bottom: 1.5rem;
      display: flex;
      flex-direction: column;

      &:last-child {
        margin-bottom: 0;
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
      padding: 0.5rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      margin-top: 10px;
    }
  }

  .not-registered {
    text-align: center;
    margin-top: 1.9rem;
    color: #E25B8C;
    cursor: pointer;
    font-weight: 700;
    font-size: 13px;
  }
}
</style>
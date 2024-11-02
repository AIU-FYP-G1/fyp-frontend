<script setup lang="ts">
const items = [
  {
    key: 'general',
    label: 'General',
    icon: 'i-heroicons-information-circle',
    title: 'This is the content shown for Tab1'
  },
  {
    key: 'security',
    label: 'Security',
    icon: 'material-symbols:security',
    title: 'And, this is the content for Tab2'
  },
]
</script>

<template>
  <div class="settings-container">
    <div class="wrapper">
      <div class="title">
        <div class="avatar-container">
          <img src="@/public/images/profile-avatar.jpg" alt="profile-picture">
        </div>
        <span>
        Younes Djelloul
      </span>
      </div>
      <hr>
      <UTabs
          :items="items"
          orientation="vertical"
          :ui="{ wrapper: 'flex items-center gap-4', list: { width: 'w-48' } }"
      >
        <template #item="{ item }">
          <div v-if="item.key === 'general'" class="space-y-3">
            {{ item.title }}
          </div>
          <div v-else-if="item.key === 'security'" class="space-y-3">
            {{ item.title }}
          </div>
        </template>
      </UTabs>
    </div>
  </div>
</template>

<style scoped lang="scss">
.settings-container {
  width: 100%;
  height: 100vh;
  padding: 100px 50px;
  background-color: #EFEFEF;

  .wrapper {
    margin: 0 auto;
    width: fit-content;

    .title {
      font-size: 26px;
      font-weight: 600;
      font-family: 'Jost', sans-serif;
      display: flex;
      align-items: center;
      margin-bottom: 30px;

      .avatar-container {
        width: 60px;
        height: 60px;
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

    hr {
      margin-bottom: 50px;
    }
  }
}
</style>
<script setup lang="ts">

const auth = useAuth()

const isLoading = ref(true)

onMounted(async () => {
  await auth.fetchCurrentUserData()
  isLoading.value = false
})
</script>

<template>
  <div class="about">
    <Header v-if="!isLoading"/>
    <div class="about-container">
      <div class="title">About the project</div>
      <hr>
      <div class="content">
        This project presents a deep learning model that predicts the cardiac ejection fraction (EF) from 2D
        echocardiogram videos of pediatric patients. The model integrates convolutional neural networks (CNN) and long
        short-term memory (LSTM) networks to process echocardiogram videos in two common views: apical four-chamber
        (A4C), and parasternal short axis (PSAX). By using video data and patient metadata including age, weight, height
        and EF percentage. The CNN sub-module extracts feature maps from the video frames to learn spatial
        representations, while the LSTM layers enable the learning of temporal dependencies that characterize the heart
        movement. The MAE for the final EF prediction was 5.57 and 6.00 for A4C and PSAX respectively. This model also
        utilizes a web application to allow clinical professionals to get the EF value.
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.about {
  background-color: #EFEFEF;
  padding: 25px 40px;
  height: 100vh;
}

.about-container {
  padding: 70px 150px 0 110px;

  .title {
    font-size: 25px;
    font-family: 'Jost', sans-serif;
    color: #242424;
    font-weight: 700;
    width: 100%;
  }

  hr {
    color: #000;
  }

  .content {
    margin-top: 40px;
    width: 100%;
    color: #464646;
  }
}
</style>
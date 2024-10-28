<script setup lang="ts">

</script>

<template>
  <div class="condition-container">
    <div class="title">
      Heart<br>Conditions
    </div>
    <div class="diagnose-result">
      <div class="heart-container">
        <img src="@/public/images/heart%20image.png" alt="heart">
      </div>
      <div class="result-box">
        <div class="title">
          <UIcon name="game-icons:heart-beats" /><span>
          Predicted EF</span>
        </div>
        <div class="result">
          79%
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.condition-container {
  width: 35%;
  margin-top: 1.5%;
  margin-right: 5%;

  > .title {
    font-size: 50px;
    color: #242424;
    font-weight: 530;
    line-height: 60px;
  }

  .diagnose-result {
    .heart-container {
      width: 100%;
      height: 100%;
      position: relative;
      left: 2%;

      img {
        margin-top: 35px;
        max-width: 112%;
      }
    }

    .result-box {
      background: rgba(234, 234, 234, 0.27);
      border-radius: 16px;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(5.7px);
      -webkit-backdrop-filter: blur(5.7px);
      width: 160px;
      height: 100px;
      padding: 16px;
      outline: 3.2px solid #FFF;
      position: relative;
      top: -80px;
      left: 10px;

      .title {
        color: #242424;
        font-weight: 550;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        font-size: 17px;

        span:nth-child(1) {
          color: #4A6AF5;
          position: relative;
          top: 3px;
        }
      }

      .result {
        color: #5F94F5;
        font-size: 33px;
        font-weight: 600;
        width: 100%;
        text-align: center;
        padding-left: 5px;
      }
    }
  }
}
</style>
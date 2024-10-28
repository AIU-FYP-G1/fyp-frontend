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
      <div class="circle first-circle"></div>
      <div class="second-circle circle"></div>
      <div class="dots">
        <img src="@/public/images/details-dot.png" alt="detail-dot">
        <img src="@/public/images/details-dot.png" alt="detail-dot">
        <img src="@/public/images/details-dot.png" alt="detail-dot">
        <img src="@/public/images/details-dot.png" alt="detail-dot">
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
    position: relative;

    .dots {
      > img {
        position: absolute;
        width: 30px;
        height: 30px;
        z-index: 4;
        opacity: 0.9;

        &:first-child {
          top: 40px;
          left: 175px;
        }

        &:nth-child(2) {
          top: 150px;
          left: 160px;
        }

        &:nth-child(3) {
          top: 190px;
          left: 45px;
        }

        &:nth-child(4) {
          top: 270px;
          left: 220px;
        }
      }
    }
    
    .heart-container {
      width: 100%;
      height: 100%;
      position: relative;
      left: -3%;
      z-index: 2;

      img {
        margin-top: 15px;
        max-width: 121%;
      }
    }

    .circle {
      position: absolute;
      border-radius: 50%;
      outline: 3px solid rgba(255, 255, 255, 0.47);
      background: rgba(245, 245, 245, 0.5);
      //box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(80px);
    }

    .first-circle {
      top: 70px;
      left: 15px;
      width: 280px;
      height: 280px;
      z-index: 1;
    }

    .second-circle {
      top: 50px;
      left: -5px;
      width: 320px;
      height: 320px;
      z-index: 0;
    }

    .result-box {
      background: rgba(234, 234, 234, 0.27);
      border-radius: 16px;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(11.5px);
      -webkit-backdrop-filter: blur(11.5px);
      width: 160px;
      height: 100px;
      padding: 16px;
      outline: 3.2px solid #FFF;
      position: relative;
      top: -90px;
      left: -14px;
      z-index: 3;

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
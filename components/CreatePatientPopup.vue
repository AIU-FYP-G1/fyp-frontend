<script setup lang="ts">
import {CModal} from "@coreui/vue/dist/esm/components/modal";

const props = defineProps(['createPatientFormIsOpen'])
const emit = defineEmits(['toggleCreatePatientForm'])

let {$axios} = useNuxtApp()
const api = $axios()

const isOpen = computed({
  get: () => props.createPatientFormIsOpen,
  set: () => emit('toggleCreatePatientForm')
})

const handleCreation = (event: Event): void => {
  console.log('Uploading to backend..')
}
</script>

<template>
  <CModal
      alignment="center"
      :visible="isOpen"
      @close="emit('toggleCreatePatientForm')"
      aria-labelledby="VerticallyCenteredExample"
      size="lg"
  >
    <div class="popup-container">

      <button class="upload-confirmation" @click="handleCreation">
        Create Patient
        <UIcon name="lets-icons:done-ring-round"/>
      </button>
    </div>
  </CModal>
</template>

<style scoped lang="scss">

.popup-container {
  height: 420px;
  width: 100%;
  background-color: #EFEFEF;
  outline: 4px solid #FFF;
  border-radius: 15px;
  padding: 30px 40px;
  font-family: 'Jost', sans-serif;

  .popup-title {
    color: #242424;
    font-size: 23px;
    font-weight: bold;
  }

  .popup-subtitle {
    color: #8F8F8F;
  }

  .upload-space {
    width: 100%;
    margin: 40px auto 50px;
    background-color: #E9E9E9;
    border-radius: 15px;
    border: 2px dashed #979797;
    position: relative;
    height: 170px;
    cursor: pointer;

    .helper-text {
      position: absolute;
      bottom: 35px;
      width: 100%;
      text-align: center;

      > div {
        &:first-child {
          font-size: 22px;
          color: #242424;
          margin-bottom: 4px;
        }

        &:last-child {
          font-size: 16px;
          color: #5D5D5D;
        }
      }
    }

    .uploaded-file-name {
      > div {
        font-size: 24px !important;
        color: #5F94F5 !important;
      }
    }

    button {
      width: 180px;
      height: 34px;
      background-color: #979797;
      border-radius: 7px;
      position: absolute;
      bottom: -17px;
      left: 38%;
      color: white;
      font-weight: 550;
      font-size: 14.5px;
      display: flex;
      align-items: center;
      justify-content: center;

      span {
        font-size: 20px;
        margin-left: 3px;
      }
    }
  }

  > button {
    width: 220px;
    height: 42px;
    background-color: #5F94F5;
    border-radius: 11px;
    color: white;
    font-weight: 550;
    font-size: 15.5px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;

    span {
      font-size: 20px;
      margin-left: 8px;
    }

    &:hover {
      background-color: #5281d9;
    }
  }
}
</style>
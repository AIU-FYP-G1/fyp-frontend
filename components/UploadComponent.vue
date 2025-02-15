<script setup lang="ts">
import {CModal} from "@coreui/vue/dist/esm/components/modal";
import {usePatient} from "~/stores/patient";
import {toast} from "vue3-toastify";

const props = defineProps(['uploadFormIsOpen'])
const emit = defineEmits(['toggleUploadForm'])

let {$axios} = useNuxtApp()
const patients = usePatient()

const isOpen = computed({
  get: () => props.uploadFormIsOpen,
  set: () => emit('toggleUploadForm')
})

const fileUpload = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)

const triggerFileUpload = (): void => {
  fileUpload.value?.click()
}

const handleFileChange = (event: Event): void => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file) {
    selectedFile.value = file
  }
}

const isSubmitting = ref(false)
const view_type = ref('')

const handleUpload = async () => {
  isSubmitting.value = true

  if (!selectedFile.value) {
    toast.error("A valid echocardiogram file must be uploaded!", {
      bodyClassName: 'toast-body'
    });
    return
  }

  const formData = {
    file: selectedFile.value,
    view_type: view_type.value,
  };

  try {
    await patients.createNewDiagnose(formData)
    toast.success("Video uploaded successfully", {
      bodyClassName: 'toast-body'
    });
    setTimeout(() => {
      emit('toggleUploadForm')
    }, 900)
  } catch (error) {
    toast.error("Something went wrong! Please try again", {
      bodyClassName: 'toast-body'
    });
    console.error(error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <CModal
      alignment="center"
      :visible="isOpen"
      @close="emit('toggleUploadForm')"
      aria-labelledby="VerticallyCenteredExample"
      size="lg"
  >
    <div class="popup-container">
      <div class="popup-title">Upload your echocardiogram video</div>
      <div class="popup-subtitle">Please ensure your echocardiogram video is in the right format</div>
      <div class="upload-space" @click="triggerFileUpload">
        <input type="file" ref="fileUpload" style="display: none;" accept="video/*" @change="handleFileChange">
        <div class="helper-text" v-if="!selectedFile">
          <div>Drop your video here!</div>
          <div>Or click</div>
        </div>
        <div class="helper-text uploaded-file-name" v-else>
          <div>{{ selectedFile.name }}</div>
        </div>
        <button>
          Add Video
          <UIcon name="ei:plus"/>
        </button>
      </div>
      <div class="input-container">
        <label for="view_type">View Type</label>
        <div class="view-container">
          <div class="view">
            <input
                v-model="view_type"
                type="radio"
                id="a4c"
                name="view_type"
                value="a4c"
            />
            <label for="a4c">A4C</label>
          </div>
          <div class="view">
            <input
                v-model="view_type"
                type="radio"
                id="psax"
                name="view_type"
                value="psax"
            />
            <label for="psax">PSAX</label>
          </div>
        </div>
      </div>

      <UButton class="upload-confirmation" @click="handleUpload" :loading="isSubmitting">
        Confirm Upload
        <UIcon name="lets-icons:done-ring-round"/>
      </UButton>
    </div>
  </CModal>
</template>

<style scoped lang="scss">

.popup-container {
  //height: 420px;
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

  .input-container {
    display: flex;
    flex-direction: column;
    position: relative;
    margin: 0 auto 2rem;
    width: 300px;

    &:last-child {
      margin-bottom: 2.5rem;
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
      width: 100%;

      &[type='radio'] {
        width: fit-content;
      }
    }

    .view-container {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      margin-top: 5px;

      .view {
        input {
          margin-right: 10px;
        }

        label {
          color: #242424;
        }
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
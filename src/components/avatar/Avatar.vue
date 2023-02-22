<template>
  <v-hover>
    <template v-slot="{ isHovering, props }">
      <div class="d-flex align-center justify-center" style="max-width: 80px" v-bind="props">
        <input id="fileInput"
               style="position: absolute; left: -2000%"
               type="file"
               @change="uploadFile"/>
        <template v-if="isHovering && image">
          <v-btn :icon="mdiCropRotate"
                 color="dark-gray"
                 position="absolute"
                 size="64"
                 style="z-index: 10; transition: all .4s ease-in-out"
                 variant="tonal"
                 @click="triggerUpload"></v-btn>
        </template>
        <v-avatar class="elevation-1" size="80">
          <template v-slot:default>
            <template v-if="image">
              <v-img :src="image" cover/>
            </template>
            <template v-else>
              <v-btn :icon="mdiImagePlus"
                     size="64"
                     variant="plain"
                     @click="triggerUpload"></v-btn>
            </template>

          </template>
        </v-avatar>
        <cropper-dialog/>
      </div>
    </template>
  </v-hover>
</template>

<script setup>
import {computed} from "vue";
import {mdiCropRotate, mdiImagePlus} from '@mdi/js'
import {avatarStorage} from "@/store";
import CropperDialog from '@/components/avatar/CropperDialog.vue'

const avatarStore = avatarStorage()
const image = computed(() => {
  return avatarStore.getPreview
})


function uploadFile(event) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.addEventListener('load', () => {
      avatarStore.setEncoded(reader.result)
    })
    avatarStore.open()
  }
}

function triggerUpload() {
  const fileInput = document.getElementById('fileInput')
  fileInput.value = null
  fileInput.click()
}

</script>

<style scoped>

</style>

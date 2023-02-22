<template>
  <v-hover>
    <template v-slot="{ isHovering, props }">
      <div class="d-flex align-center justify-center" style="max-width: 80px" v-bind="props">
        <input id="iconFileInput"
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
              <v-img :src="image" max-width="85%"/>
            </template>
            <template v-else>
              <v-btn :icon="mdiImagePlus"
                     size="64"
                     variant="plain"
                     @click="triggerUpload"></v-btn>
            </template>
          </template>
        </v-avatar>
      </div>
    </template>
  </v-hover>
</template>

<script setup>
import {mdiCropRotate, mdiImagePlus} from '@mdi/js'
import {ref} from "vue";
const props = defineProps({
  file: {
    required: true,
  }
})

const image = ref('')
function uploadFile(event) {
  const file = event.target.files[0]
  if (file) {
    file.value = file
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.addEventListener('load', () => {
      image.value = reader.result
    })
  }
}

function triggerUpload() {
  const iconFileInput = document.getElementById('iconFileInput')
  iconFileInput.value = null
  iconFileInput.click()
}

</script>

<style scoped>

</style>

<template>
  <v-dialog v-model="show" :scrim="false"
            content-class="bg-dark"
            fullscreen>
    <v-btn :icon="mdiClose"
           color="#FFF"
           position="absolute"
           style="z-index: 10; right: 0.5%"
           variant="plain"
           @click="avatarStore.close()"></v-btn>
    <v-card class="d-block" color="#000">
      <cropper
        ref="cropper"
        :src="avatar"
        :stencil-component="$options.components.CircleStencil"
        :stencil-props="{
          movable: true,
          resizable: true
        }"
        class="dk__cropper"
      />
    </v-card>
    <v-card-actions class="d-flex justify-center" style="position: absolute; bottom: 0; width: 100%">
      <v-btn :prepend-icon="mdiCrop" color="#FFF" variant="outlined" @click="cropImage">
        <span>Crop image</span>
      </v-btn>
    </v-card-actions>
  </v-dialog>
</template>

<script>
import {CircleStencil, Cropper} from "vue-advanced-cropper"
import {defineComponent} from "vue";
import {avatarStorage} from "@/store";
import {mdiClose, mdiCrop} from '@mdi/js'
import "vue-advanced-cropper/dist/style.css"

const avatarStore = avatarStorage()

export default defineComponent({
  data() {
    return {
      mdiClose,
      mdiCrop,
      avatarStore: avatarStore
    }
  },
  components: {
    Cropper,
    CircleStencil
  },
  methods: {
    cropImage() {
      const result = this.$refs.cropper.getResult()
      result.canvas.toBlob((blob) => {
        this.avatarStore.setPreview(result.canvas.toDataURL())
        this.avatarStore.setCropped(blob)
        this.avatarStore.close()
      }, 'image/jpg')
    }
  },
  computed: {
    show() {
      return this.avatarStore.getState
    },
    avatar() {
      return this.avatarStore.getEncoded
    }
  }
})


</script>

<style scoped>
.dk__cropper {
  display: block;
  min-height: 300px;
  width: 100%;
}
</style>

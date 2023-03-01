<template>
  <v-dialog v-model="show"
            :max-width="$vuetify.display.width * 0.6">
    <v-card class="pa-0" style="position: relative"
            width="100%" :height="$vuetify.display.width * 0.4">
      <v-btn @click="close()" icon color="transparent" elevation="0" position="absolute" location="top right">
        <svg-icon size="32" :path="mdiClose" type="mdi" />
      </v-btn>
      <v-card-text class="pa-0">
        <embed :src="src"
               width="100%" :height="$vuetify.display.width * 0.4">
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {mapDialogStorage} from "@/store";
import {computed} from "vue";
import SvgIcon from "@jamescoyle/vue-icon";
import {mdiClose} from "@mdi/js";
const mapDialog = mapDialogStorage()

const src = computed(() => {
  return mapDialog.getSrc
})

const show = computed(() => {
  return mapDialog.getShow
})

function close () {
  mapDialog.close()
}

</script>

<style scoped>

</style>

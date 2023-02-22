<template>
  <v-dialog v-model="show"
            :max-width="$vuetify.display.width * 0.33"
            close-on-back>
    <v-card class="pa-0" min-height="100">
      <v-card-title class="d-flex align-center">
        <span>Confirm</span>
        <v-spacer/>
        <v-btn :icon="mdiClose" elevation="0" size="x-small" @click="close()"/>
      </v-card-title>
      <v-divider/>
      <v-card-text class="pa-4">
        {{ message }}
      </v-card-text>
      <v-divider/>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="primary-darken-1" variant="tonal" @click="proceed()">Yes, proceed</v-btn>
        <v-btn variant="tonal" @click="close()">No, cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {confirmationDialogStorage} from "@/store";
import {mdiClose} from '@mdi/js'
import {computed} from "vue";

const confirmation = confirmationDialogStorage()

const show = computed(() => {
  return confirmation.getShow
})
const message = computed(() => {
  return confirmation.getData.message
})

function close () {
  confirmation.close()
}
function reset () {
  confirmation.reset()
}
function action () {
  confirmation.getData.action()
}
function proceed() {
  action()
  confirmation
    .close()
    .then(() => {
      reset()
    })
}

</script>

<style scoped>

</style>

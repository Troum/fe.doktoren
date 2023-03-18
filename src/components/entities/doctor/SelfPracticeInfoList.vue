<template>
<v-card flat>
  <v-card-title class="text-primary-darken-1">
    Self-practice info
    <v-divider class="my-2"/>
  </v-card-title>
  <v-card-text class="dk__form__experience-container">
    <template v-for="practice of items">
      <v-card min-height="100">
        <v-card-text class="pa-2">
          <div style="position: absolute; display: flex; column-gap: 5px; top: 12px; right: 12px">
            <v-btn
              @click="editPractice(practice)"
              color="warning"
              size="28"
              variant="tonal" icon>
              <svg-icon :path="mdiPencil" type="mdi" size="14"/>
            </v-btn>
            <v-btn
              @click="removePractice(practice.id)"
              size="28"
              variant="tonal"
              color="error" icon>
              <svg-icon :path="mdiClose" type="mdi" size="14"/>
            </v-btn>
          </div>
          <div class="pa-3" style="max-width: calc(100% - (28px * 2 - 15px))">
            <p><strong>City:</strong>
              {{ citiesStore.getCityForList(practice.city)?.name }}
              <template v-if="practice.is_main">
                (main workplace)
              </template>
            </p>
            <p><strong>Address:</strong> {{ practice.address }}</p>
            <p><strong>Period:</strong> {{ practice.start_date }} - {{ practice.now ? 'still working' : practice.end_date }}</p>
          </div>
        </v-card-text>
      </v-card>
    </template>

  </v-card-text>
</v-card>
</template>

<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import {mdiClose, mdiPencil} from "@mdi/js";
import {confirmationDialogStorage, centerStorage, positionStorage, cityStorage} from "@/store";
import {inject} from "vue";

const emitter = inject('emitter')

const props = defineProps({
  items: {
    required: true,
    type: Array
  },
  removeAction: {
    required: true,
    type: Function
  }
})

const confirmationDialog = confirmationDialogStorage()
const citiesStore = cityStorage()
function removePractice(id) {
  confirmationDialog
    .open({
      message: 'Do you really want to delete this practice info?',
      action: () => props.removeAction(id)
    })
}
function editPractice(practice) {
  emitter.emit('edit-practice', practice)
}

</script>

<style scoped>

</style>

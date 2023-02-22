<template>
<v-card flat>
  <v-card-title class="text-primary-darken-1">
    Experience info
    <v-divider class="my-2"/>
  </v-card-title>
  <v-card-text class="dk__form__experience-container">
    <template v-for="experience of items">
      <v-card min-height="100">
        <v-card-text class="pa-2">
          <div style="position: absolute; display: flex; column-gap: 5px; top: 12px; right: 12px">
            <v-btn
              @click="editExperience(experience)"
              color="warning"
              size="28"
              variant="tonal" icon>
              <svg-icon :path="mdiPencil" type="mdi" size="14"/>
            </v-btn>
            <v-btn
              @click="removeExperience(experience.id)"
              size="28"
              variant="tonal"
              color="error" icon>
              <svg-icon :path="mdiClose" type="mdi" size="14"/>
            </v-btn>
          </div>
          <div class="pa-3" style="max-width: calc(100% - (28px * 2 - 15px))">
            <p><strong>Center:</strong>
              {{ centersStore.getCenterForList(experience.id) }}
              <template v-if="experience.is_main">
                (main workplace)
              </template>
            </p>
            <p><strong>Position:</strong> {{ positionsStore.getPosition(experience.position) }}</p>
            <p><strong>Period:</strong> {{ experience.start_date }} - {{ experience.now ? 'still working' : experience.end_date }}</p>
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
import { confirmationDialogStorage, centerStorage, positionStorage } from "@/store";
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
const centersStore = centerStorage()
const positionsStore = positionStorage()
function removeExperience(id) {
  confirmationDialog
    .open({
      message: 'Do you really want to delete this experience info?',
      action: () => props.removeAction(id)
    })
}
function editExperience(experience) {
  emitter.emit('edit-experience', experience)
}

</script>

<style scoped>

</style>

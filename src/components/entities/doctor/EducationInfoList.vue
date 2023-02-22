<template>
<v-card flat>
  <v-card-title class="text-primary-darken-1">
    Education info
    <v-divider class="my-2" />
  </v-card-title>
  <v-card-text class="dk__form__experience-container">
    <template v-for="education of items">
      <v-card min-height="100">
        <v-card-text class="pa-2">
          <div style="position: absolute; display: flex; column-gap: 5px; top: 12px; right: 12px">
            <v-btn
              @click="editEducation(education)"
              color="warning"
              size="28"
              variant="tonal" icon>
              <svg-icon :path="mdiPencil" type="mdi" size="14"/>
            </v-btn>
            <v-btn
              @click="removeEducation(education.id)"
              size="28"
              variant="tonal"
              color="error" icon>
              <svg-icon :path="mdiClose" type="mdi" size="14"/>
            </v-btn>
          </div>
          <div class="pa-3" style="max-width: calc(100% - (28px * 2 - 15px))">
            <p><strong>University:</strong> {{ universitiesStore.getUniversityForList(education.id) }}</p>
            <p><strong>Position:</strong> {{ education.specialization }}</p>
            <p><strong>Period:</strong> {{ education.start_date }} - {{ education.now ? 'still studying' : education.end_date }}</p>
          </div>
        </v-card-text>
      </v-card>
    </template>

  </v-card-text>
</v-card>
</template>

<script setup>
import SvgIcon from "@jamescoyle/vue-icon";
import {confirmationDialogStorage, universityStorage} from "@/store";
import {mdiClose, mdiPencil} from "@mdi/js";
import {inject} from "vue";

const emitter = inject('emitter')
const universitiesStore = universityStorage()
const confirmationDialog = confirmationDialogStorage()
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

function removeEducation(id) {
  confirmationDialog
    .open({
      message: 'Do you really want to delete this education info?',
      action: () => props.removeAction(id)
    })
}

function editEducation(education) {
  emitter.emit('edit-education', education)
}

</script>

<style scoped>

</style>

<template>
  <v-card flat>
    <v-card-title class="text-primary-darken-1">
      Courses info
      <v-divider class="my-2" />
    </v-card-title>
    <v-card-text class="dk__form__experience-container">
      <template v-for="course of items">
        <v-card min-height="100">
          <v-card-text class="pa-2">
            <div style="position: absolute; display: flex; column-gap: 5px; top: 12px; right: 12px">
              <v-btn
                @click="editCourse(course)"
                color="warning"
                size="28"
                variant="tonal" icon>
                <svg-icon :path="mdiPencil" type="mdi" size="14"/>
              </v-btn>
              <v-btn
                @click="removeCourse(course.id)"
                size="28"
                variant="tonal"
                color="error" icon>
                <svg-icon :path="mdiClose" type="mdi" size="14"/>
              </v-btn>
            </div>
            <div class="pa-3" style="max-width: calc(100% - (28px * 2 - 15px))">
              <p><strong>Place:</strong> {{ course.place }}</p>
              <p><strong>Course name:</strong> {{ course.name }}</p>
              <p><strong>Period:</strong> {{ course.start_date }} - {{ course.now ? 'still studying' : course.end_date }}</p>
            </div>
          </v-card-text>
        </v-card>
      </template>

    </v-card-text>
  </v-card>
</template>

<script setup>
import SvgIcon from "@jamescoyle/vue-icon";
import {confirmationDialogStorage} from "@/store";
import {mdiClose, mdiPencil} from "@mdi/js";
import {inject} from "vue";

const emitter = inject('emitter')
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

function removeCourse(id) {
  confirmationDialog
    .open({
      message: 'Do you really want to delete this course info?',
      action: () => props.removeAction(id)
    })
}

function editCourse(course) {
  emitter.emit('edit-course', course)
}
</script>

<style scoped>

</style>

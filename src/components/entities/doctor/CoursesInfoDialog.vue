<template>
  <v-dialog v-model="show"
            :max-width="$vuetify.display.width * 0.75"
            close-on-back>
    <v-card class="pa-0" min-height="100">
      <v-card-title class="d-flex align-center py-4">
        <span>Add course info</span>
        <v-spacer/>
        <v-btn :icon="mdiClose" elevation="0" size="x-small" @click="close()"/>
      </v-card-title>
      <v-divider/>
      <v-card-text class="dk__course-form-fields__container">
        <text-field-with-validation
          name="name"
          type="text"
          label="Enter course name"
          placeholder="Course name"/>
        <text-field-with-validation
          name="place"
          type="text"
          label="Enter place where course was"
          placeholder="Place"/>
        <div style="display: grid; grid-template-rows: 1fr; grid-template-columns: repeat(2, 1fr); grid-column-gap: 15px;">
          <years-component label="Started at" name="start_date"/>
          <years-component label="Finished at" name="end_date"/>
        </div>
      </v-card-text>
      <v-divider/>
      <v-card-actions class="py-4">
        <v-spacer/>
        <v-btn color="primary-darken-1" @click="onSubmit" variant="tonal">Save</v-btn>
        <v-btn variant="tonal" @click="close()">No, cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {mdiClose} from "@mdi/js";
import {courseDialogStorage} from "@/store";
import {computed, inject, onMounted} from "vue";
import YearsComponent from "@/components/form-fields/YearsComponent.vue";
import TextFieldWithValidation from "@/components/form-fields/TextFieldWithValidation.vue";
import {useForm} from "vee-validate";

const props = defineProps({
  method: {
    default: () => {
    },
    required: true
  },
  schema: {
    required: true
  },
  action: {
    default: 'create',
    required: false
  }
})
const emitter = inject('emitter')

const { handleSubmit, setErrors } = useForm({
  validationSchema: props.schema,
  validateOnMount: false
})

const courseDialog = courseDialogStorage()

const show = computed(() => {
  return courseDialog.showDialog
})

onMounted(() => {
  setTimeout(() => setErrors({
    name: undefined,
    place: undefined,
    start_date: undefined,
    end_date: undefined
  }), 500)
})

emitter.on('edit-course', (course) => {
  Object
    .keys(course)
    .forEach(key => {
      setFieldValue(key, course[key])
    })
  courseDialog.open()
})

const onSubmit = handleSubmit((values, { resetForm }) => {
  props.method(values)
  resetForm()
})

function close () {
  courseDialog.close()
}

</script>

<style scoped lang="scss">
@import "@/assets/styles/components/dialogs/course.dialog.scss";
</style>

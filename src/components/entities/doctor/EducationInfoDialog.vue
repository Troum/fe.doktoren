<template>
  <v-dialog v-model="show"
            :max-width="$vuetify.display.width * 0.55"
            close-on-back>
    <v-card class="pa-0" min-height="100">
      <v-card-title class="d-flex align-center py-4">
        <span>Add education info</span>
        <v-spacer/>
        <v-btn :icon="mdiClose" elevation="0" size="x-small" @click="close()"/>
      </v-card-title>
      <v-divider/>
      <v-card-text class="dk__education-form-fields__container">
        <autocomplete-with-validation-component
          :items="universities"
          item-title="name"
          item-value="id"
          label="Choose university"
          name="id"
        />
        <text-field-with-validation
          label="Enter doctor specialization"
          name="specialization"
          type="text"
          placeholder="Doctor specialization" />
        <div style="display: grid; grid-auto-rows: 80px; grid-template-columns: repeat(4, 1fr);grid-column-gap: 15px; grid-column: 1 / -1">
          <years-component label="Started at" name="start_date"/>
          <years-component label="Graduated at" name="end_date"/>
          <checkbox-with-validation
            @change="setEndDate"
            label="Still studying?"
            name="now" />
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
import {useForm} from "vee-validate"
import {educationDialogStorage, universityStorage} from "@/store";
import {computed, inject, onMounted} from "vue";
import AutocompleteWithValidationComponent from "@/components/form-fields/AutocompleteWithValidationComponent.vue";
import YearsComponent from "@/components/form-fields/YearsComponent.vue";
import TextFieldWithValidation from "@/components/form-fields/TextFieldWithValidation.vue";
import CheckboxWithValidation from "@/components/form-fields/CheckboxWithValidation.vue";

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

const { setFieldValue, handleSubmit, setErrors } = useForm({
  validationSchema: props.schema,
  initialValues: {
    now: false
  },
  validateOnMount: false
})
const emitter = inject('emitter')
const educationDialog = educationDialogStorage()
const universityStore = universityStorage()

const universities = computed(() => {
  return universityStore.getUniversities
})
const show = computed(() => {
  return educationDialog.showDialog
})

emitter.on('edit-education', (education) => {
  Object
    .keys(education)
    .forEach(key => {
      setFieldValue(key, education[key])
    })
  educationDialog.open()
})

onMounted(() => {
  setTimeout(() => setErrors({
    id: undefined,
    specialization: undefined,
    start_date: undefined,
    end_date: undefined,
    now: undefined
  }), 500)
})

const onSubmit = handleSubmit((values, { resetForm }) => {
  props.method(values)
  resetForm()
})

function setEndDate() {
  setFieldValue('end_date', new Date().getFullYear())
}

function close () {
  educationDialog.close()
}

</script>

<style scoped lang="scss">
@import "@/assets/styles/components/dialogs/education.dialog.scss";
</style>

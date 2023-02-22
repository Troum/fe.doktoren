<template>
  <v-dialog v-model="show"
            :max-width="$vuetify.display.width * 0.8"
            close-on-back>
    <v-card class="pa-0" min-height="150">
      <v-card-title class="d-flex align-center py-4">
        <span>Add experience info</span>
        <v-spacer/>
        <v-btn :icon="mdiClose" elevation="0" size="x-small" @click="close()"/>
      </v-card-title>
      <v-divider/>
      <v-card-text class="dk__experience-form-fields__container">
        <autocomplete-with-validation-component
          :items="centers"
          item-title="name"
          item-value="id"
          label="Choose work place"
          name="id"
        />
        <autocomplete-with-validation-component
          :items="positions"
          item-title="name"
          item-value="id"
          label="Choose position"
          name="position"
        />
        <div style="display: grid; grid-auto-rows: 80px; grid-template-columns: repeat(4, 1fr);grid-column-gap: 15px; grid-column: 1 / -1">
          <years-component
            label="Start date"
            name="start_date"/>
          <years-component
            label="Finish date"
            name="end_date"/>
          <checkbox-with-validation
            @change="setEndDate"
            label="Still working?"
            name="now" />
          <checkbox-with-validation
            label="Is main workplace?"
            name="is_main" />
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
import {centerStorage, experienceDialogStorage, positionStorage} from "@/store";
import AutocompleteWithValidationComponent from "@/components/form-fields/AutocompleteWithValidationComponent.vue";
import YearsComponent from "@/components/form-fields/YearsComponent.vue";
import {computed, inject, onMounted} from "vue";
import CheckboxWithValidation from "@/components/form-fields/CheckboxWithValidation.vue";

const emitter = inject('emitter')

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

const { setFieldValue, handleSubmit, setErrors, isDirty } = useForm({
  validationSchema: props.schema,
  initialValues: {
    now: false,
    is_main: false
  }
})

const experienceDialog = experienceDialogStorage()
const centersStore = centerStorage()
const positionsStore = positionStorage()

const show = computed(() => {
  return experienceDialog.showDialog
})

const centers = computed(() => {
  return centersStore.getCenters
})

const positions = computed(() => {
  return positionsStore.getPositions
})

const onSubmit = handleSubmit((values, { resetForm }) => {
  props.method(values)
  resetForm()
})
onMounted(() => {
  setTimeout(() => setErrors({
    id: undefined,
    position: undefined,
    start_date: undefined,
    end_date: undefined,
    now: undefined,
    is_main: undefined
  }), 500)
})

emitter.on('edit-experience', (experience) => {
  Object
    .keys(experience)
    .forEach(key => {
      setFieldValue(key, experience[key])
    })
  experienceDialog.open()
})

function close() {
  experienceDialog.close()
}
function setEndDate() {
  setFieldValue('end_date', new Date().getFullYear())
}

</script>

<style scoped lang="scss">
@import "@/assets/styles/components/dialogs/experience.dialog.scss";
</style>

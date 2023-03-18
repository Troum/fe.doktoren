<template>
  <v-dialog v-model="show"
            :max-width="$vuetify.display.width * 0.8"
            close-on-back>
    <v-card class="pa-0" min-height="150">
      <v-card-title class="d-flex align-center py-4">
        <span>Add self practice info</span>
        <v-spacer/>
        <v-btn :icon="mdiClose" elevation="0" size="x-small" @click="close()"/>
      </v-card-title>
      <v-divider/>
      <v-card-text class="dk__self-practice-form-fields__container">
        <select-with-validation
          :items="cities"
          item-title="name"
          item-value="id"
          label="Choose self-workplace city"
          name="city"
        />
        <text-field-with-validation
          label="Please fill self-workplace address"
          placeholder="Address"
          name="address"
          type="text" />
        <div style="display: grid; grid-auto-rows: 80px; grid-template-columns: repeat(5, 1fr);grid-column-gap: 15px; grid-column: 1 / -1">
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
import {cityStorage, selfPracticeDialogStorage, positionStorage} from "@/store";
import YearsComponent from "@/components/form-fields/YearsComponent.vue";
import {computed, inject, onMounted, ref} from "vue";
import CheckboxWithValidation from "@/components/form-fields/CheckboxWithValidation.vue";
import {v4 as uuid4} from "uuid";
import SelectWithValidation from "@/components/form-fields/SelectWithValidation.vue";
import TextFieldWithValidation from "@/components/form-fields/TextFieldWithValidation.vue";

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

const selfPracticeDialog = selfPracticeDialogStorage()
const citiesStore = cityStorage()

const show = computed(() => {
  return selfPracticeDialog.showDialog
})

const cities = computed(() => {
  return citiesStore.getCities
})

const onSubmit = handleSubmit((values, { resetForm }) => {
  if (!values.hasOwnProperty('id')) {
    values.id = uuid4()
  }
  props.method(values)
  resetForm()
})
onMounted(() => {
  setTimeout(() => setErrors({
    city: undefined,
    address: undefined,
    start_date: undefined,
    end_date: undefined,
    now: undefined,
    is_main: undefined
  }), 500)
})

emitter.on('edit-self-practice', (selfPractice) => {
  Object
    .keys(selfPractice)
    .forEach(key => {
      setFieldValue(key, selfPractice[key])
    })
  selfPracticeDialog.open()
})

function close() {
  selfPracticeDialog.close()
}
function setEndDate() {
  setFieldValue('end_date', new Date().getFullYear())
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/components/dialogs/selfPractice.dialog.scss";
</style>

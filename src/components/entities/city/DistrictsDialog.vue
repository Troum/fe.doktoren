<template>
  <v-dialog v-model="show"
            :max-width="$vuetify.display.width * 0.75"
            close-on-back>
    <v-card class="pa-0" min-height="100">
      <v-card-title class="d-flex align-center py-4">
        <span>Add district info</span>
        <v-spacer/>
        <v-btn :icon="mdiClose" elevation="0" size="x-small" @click="close()"/>
      </v-card-title>
      <v-divider/>
      <v-card-text class="dk__district-form-fields__container">
        <text-field-with-validation
          name="name"
          type="text"
          label="Enter district name"
          placeholder="District name"/>
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
import {districtsDialogStorage} from "@/store";
import {computed, inject, onMounted} from "vue";
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

const districtDialog = districtsDialogStorage()

const show = computed(() => {
  return districtDialog.showDialog
})

onMounted(() => {
  setTimeout(() => setErrors({
    name: undefined
  }), 500)
})

emitter.on('edit-district', (district) => {
  Object
    .keys(district)
    .forEach(key => {
      setFieldValue(key, district[key])
    })
  districtDialog.open()
})

const onSubmit = handleSubmit((values, { resetForm }) => {
  props.method(values)
  resetForm()
})

function close () {
  districtDialog.close()
}

</script>

<style scoped lang="scss">
@import "@/assets/styles/components/dialogs/districts.dialog.scss";
</style>

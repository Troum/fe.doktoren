<template>
  <v-container class="fill-height" fluid>
    <v-row class="fill-height">
      <v-col class="mx-auto" cols="10" lg="12">
        <v-card :min-height="250" class="px-3 py-3">
          <v-card-title class="mb-4">
            Update medical center specialization
          </v-card-title>
          <v-card-text class="dk__edit-form__first-line">
            <text-field-with-validation label="Enter specialization name"
                                        placeholder="Specialization name"
                                        name="name" type="text"/>
          </v-card-text>
          <v-card-actions class="d-flex align-center justify-end">
            <v-btn :min-width="$vuetify.display.width * 0.1"
                   class="mb-4"
                   color="primary"
                   @click="confirmUpdate"
                   variant="tonal">Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import {useForm} from 'vee-validate'
import {computed, inject, onBeforeMount, ref} from "vue";
import {onBeforeRouteLeave, useRoute, useRouter} from "vue-router";
import {
  cityStorage, confirmationDialogStorage,
  countryStorage, loadingStorage, specializationStorage
} from "@/store";
import {CitySchema} from "@/schemas/city/city.schema";
import {mdiMapCheck} from "@mdi/js";
import TextFieldWithValidation from "@/components/form-fields/TextFieldWithValidation.vue";
import AutocompleteWithValidationComponent from "@/components/form-fields/AutocompleteWithValidationComponent.vue";
import {SpecializationSchema} from "@/schemas/specialization/specialization.schema";


const updated = ref(false)

const router = useRouter()
const route = useRoute()

const specializationStore = specializationStorage()

const specializationSchema = SpecializationSchema
const {values, errors, setFieldError, setFieldValue, setValues, meta, handleSubmit} = useForm({
  validationSchema: specializationSchema,
  validateOnMount: false
})

const loadingStore = loadingStorage()

onBeforeMount(() => {
  specializationStore
    .show(route.params.id)
    .then(() => {
      setValues(specializationStore.getSpecialization)
    })
})

onBeforeRouteLeave(async () => {
  if (meta.value.touched && !updated.value) {
    await confirmationDialogStorage().routeLeave({
      message: 'Do you really want to leave this page? All unsaved dat will be lost',
      action: () => router.push({name: 'specializations.index'})
    })
  }

})
function confirmUpdate() {
  confirmationDialogStorage()
    .open({
      message: 'Do you really want to update this medical center specialization\'s info?',
      action: () => onSubmit()
    })
}
const onSubmit = handleSubmit((values) => {
  specializationStore
    .update(specializationStore.getSpecialization.id, values)
    .then(() => {
      updated.value = true
      router.push({name: 'specialization.index'})
    })
    .catch()
})

</script>
<style scoped lang="scss">
@import "@/assets/styles/views/specializations/edit.scss";
</style>

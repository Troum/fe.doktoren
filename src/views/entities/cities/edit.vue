<template>
  <v-container class="fill-height" fluid>
    <v-row class="fill-height">
      <v-col class="mx-auto" cols="10" lg="12">
        <v-card :min-height="250" class="px-3 py-3">
          <v-card-title class="mb-4">
            Update city
          </v-card-title>
          <v-card-text class="dk__edit-form__first-line">
            <text-field-with-validation label="Enter city name"
                                        placeholder="City name"
                                        name="name" type="text"/>
            <autocomplete-with-validation-component
              label="Enter country"
              name="country_id"
              item-title="name"
              item-value="id"
              :items="countries"/>
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
  countryStorage, loadingStorage
} from "@/store";
import {CitySchema} from "@/schemas/city/city.schema";
import {mdiMapCheck} from "@mdi/js";
import TextFieldWithValidation from "@/components/form-fields/TextFieldWithValidation.vue";
import AutocompleteWithValidationComponent from "@/components/form-fields/AutocompleteWithValidationComponent.vue";


const updated = ref(false)

const router = useRouter()
const route = useRoute()

const cityStore = cityStorage()
const countryStore = countryStorage()

const citySchema = CitySchema
const {values, errors, setFieldError, setFieldValue, setValues, meta, handleSubmit} = useForm({
  validationSchema: citySchema,
  validateOnMount: false
})

const countries = computed(() => {
  return countryStore
    .getCountries
})
const loadingStore = loadingStorage()

onBeforeMount(() => {
  cityStore
    .show(route.params.id)
    .then(() => {
      setValues(cityStore.getCity)
    })
})

onBeforeRouteLeave(async () => {
  if (meta.value.touched && !updated.value) {
    await confirmationDialogStorage().routeLeave({
      message: 'Do you really want to leave this page? All unsaved dat will be lost',
      action: () => router.push({name: 'cities.index'})
    })
  }

})
function getCoordinates() {
  loadingStore.setLoading('action', true)

  if (!values?.name) {
    setFieldError('name', 'To get coordinates name is required')
    loadingStore.setLoading('action', false)
    return
  }
  cityStore
    .getCoordinates(values?.name)
    .then((response) => {
      if (response.data.length) {
        setFieldValue('coordinates', {
          latitude: response.data[0].latitude,
          longitude: response.data[0].longitude
        })
        loadingStore.setLoading('action', false)
      } else {
        loadingStore.setLoading('action', false)
      }

    })
    .catch(() => loadingStore.setLoading('action', false))
}

function confirmUpdate() {
  confirmationDialogStorage()
    .open({
      message: 'Do you really want to update this city\'s info?',
      action: () => onSubmit()
    })
}
const onSubmit = handleSubmit((values) => {
  cityStore
    .update(cityStore.getCity.id, values)
    .then(() => {
      updated.value = true
      router.push({name: 'cities.index'})
    })
    .catch()
})

</script>
<style scoped lang="scss">
@import "@/assets/styles/views/cities/edit.scss";
</style>

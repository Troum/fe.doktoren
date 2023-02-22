<template>
  <v-container class="fill-height" fluid>
    <v-row class="fill-height">
      <v-col class="mx-auto" cols="10" lg="12">
        <v-card :min-height="250" class="px-3 py-3">
          <v-card-title class="mb-4">
            Add new city
          </v-card-title>
          <v-card-text class="dk__create-form__first-line">
            <text-field-with-validation label="Enter city name"
                                        placeholder="City name"
                                        name="name" type="text"/>
            <autocomplete-with-validation-component
              label="Enter country"
              name="country_id"
              item-title="name"
              item-value="id"
              :items="countries"/>
            <v-btn @click="getCoordinates"
              :loading="loadingStore.getActionLoading"
              :disabled="!_.isEmpty(values.coordinates)"
              :color="errors.hasOwnProperty('name') ? 'error' : 'primary-darken-1'"
              block variant="tonal" height="56"
              :prepend-icon="mdiMapCheck">
              {{
                values.coordinates ? 'coordinates are stored' :
                (notFound.value ? 'coordinates weren\'t found' : 'get coordinates' )
              }}
            </v-btn>
          </v-card-text>
          <v-card-actions class="d-flex align-center justify-end">
            <v-btn :min-width="$vuetify.display.width * 0.1"
                   :loading="loadingStore.getSubmitLoading"
                   class="mb-4"
                   color="primary"
                   @click="onSubmit"
                   variant="tonal">Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import _ from 'lodash'
import {useForm} from 'vee-validate'
import {computed, ref} from "vue";
import {useRouter} from "vue-router";
import {
  cityStorage,
  countryStorage, loadingStorage
} from "@/store";
import {CitySchema} from "@/schemas/city/city.schema";
import {mdiMapCheck} from "@mdi/js";
import TextFieldWithValidation from "@/components/form-fields/TextFieldWithValidation.vue";
import AutocompleteWithValidationComponent from "@/components/form-fields/AutocompleteWithValidationComponent.vue";

const router = useRouter()
const loadingStore = loadingStorage()
const cityStore = cityStorage()
const countryStore = countryStorage()
const citySchema = CitySchema
const {values, errors, setFieldError, setFieldValue, handleSubmit} = useForm({
  validationSchema: citySchema,
  validateOnMount: false
})
const notFound = ref(false)

const countries = computed(() => {
  return countryStore
    .getCountries
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
      loadingStore.setLoading('action', false)
      if (response.data.length) {
        setFieldValue('coordinates', {
          latitude: response.data[0].latitude,
          longitude: response.data[0].longitude
        })
      } else {
        notFound.value = true
      }
    })
    .catch(() => loadingStore.setLoading('action', false))
}
const onSubmit = handleSubmit((values) => {
  loadingStore.setLoading('submit', true)
  cityStore
    .store(values)
    .then(() => {
      loadingStore.setLoading('submit', false)
      router.push({name: 'cities.index'})
    })
    .catch(() => loadingStore.setLoading('submit', false))
})

</script>
<style scoped lang="scss">
@import "@/assets/styles/views/cities/create.scss";
</style>

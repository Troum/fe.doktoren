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
            <v-btn
              @click="showDistrictDialog"
              color="primary-darken-1"
              variant="tonal"
              :prepend-icon="mdiPlus">
              Add city district
            </v-btn>
          </v-card-text>
          <template v-if="districts.length">
            <v-card-text class="px-0">
              <DistrictsList
                :remove-action="removeDistrict"
                :items="districts" />
            </v-card-text>
          </template>
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
  <districts-dialog :schema="districtSchema" :method="addDistrict" />
</template>

<script setup>
import {useForm} from 'vee-validate'
import {computed, ref, toRaw, inject} from "vue";
import {useRouter} from "vue-router";
import {cityStorage, countryStorage, districtsDialogStorage, loadingStorage} from "@/store";
import {CitySchema} from "@/schemas/city/city.schema";
import {DistrictSchema} from "@/schemas/city/district.schema";
import {mdiPlus} from "@mdi/js";
import TextFieldWithValidation from "@/components/form-fields/TextFieldWithValidation.vue";
import AutocompleteWithValidationComponent from "@/components/form-fields/AutocompleteWithValidationComponent.vue";
import DistrictsDialog from "@/components/entities/city/DistrictDialog.vue";
import DistrictsList from "@/components/entities/city/DistrictsList.vue";

const router = useRouter()
const loadingStore = loadingStorage()
const cityStore = cityStorage()
const districtDialog = districtsDialogStorage()
const countryStore = countryStorage()
const citySchema = CitySchema
const districtSchema = DistrictSchema
const {values, errors, setFieldError, setFieldValue, handleSubmit} = useForm({
  validationSchema: citySchema,
  validateOnMount: false
})
const inArray = inject('inArray')
const removeFromArray = inject('removeFromArray')
const districts = ref([])

const countries = computed(() => {
  return countryStore
    .getCountries
})

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

const showDistrictDialog = () => {
  districtDialog.open()
}

const addDistrict = (item) => {
  const clone = structuredClone(toRaw(item))
  if (inArray(districts.value, {id: clone.id})) {
    removeFromArray(districts.value, {id: clone.id})
    districts.value.push(clone)
  } else {
    districts.value.push(clone)
  }
  setFieldValue('districts', districts.value)
  districtDialog
    .close()
}

const removeDistrict = (data) => {
  setFieldValue('districts', removeFromArray(districts.value, {id: data.id}))
}

</script>
<style scoped lang="scss">
@import "@/assets/styles/views/cities/create.scss";
</style>

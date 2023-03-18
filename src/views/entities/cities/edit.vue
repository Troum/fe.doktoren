<template>
  <v-container class="fill-height" fluid>
    <v-row class="fill-height">
      <v-col class="mx-auto" cols="10" lg="12">
        <v-card :min-height="250" class="px-3 py-3">
          <v-card-title class="mb-4">
            Update city
          </v-card-title>
          <v-card-text class="dk__edit-form__first-line">
            <text-field-with-validation label="Update city name"
                                        placeholder="City name"
                                        name="name" type="text"/>
            <autocomplete-with-validation-component
              label="Update country"
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
                   @click="confirmUpdate"
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
import {computed, ref, toRaw, inject, onBeforeMount} from "vue";
import {onBeforeRouteLeave, useRoute, useRouter} from "vue-router";
import {cityStorage, confirmationDialogStorage, countryStorage, districtsDialogStorage, loadingStorage} from "@/store";
import {CitySchema} from "@/schemas/city/city.schema";
import {DistrictSchema} from "@/schemas/city/district.schema";
import {mdiPlus} from "@mdi/js";
import TextFieldWithValidation from "@/components/form-fields/TextFieldWithValidation.vue";
import AutocompleteWithValidationComponent from "@/components/form-fields/AutocompleteWithValidationComponent.vue";
import DistrictsDialog from "@/components/entities/city/DistrictDialog.vue";
import DistrictsList from "@/components/entities/city/DistrictsList.vue";

const loadingStore = loadingStorage()
const cityStore = cityStorage()
const districtDialog = districtsDialogStorage()
const confirmationDialog = confirmationDialogStorage()
const countryStore = countryStorage()
const citySchema = CitySchema
const districtSchema = DistrictSchema
const {values, errors, setFieldError, setValues, setFieldValue, handleSubmit, meta} = useForm({
  validationSchema: citySchema,
  validateOnMount: false
})
const inArray = inject('inArray')
const removeFromArray = inject('removeFromArray')
const districts = ref([])
const updated = ref(false)

const router = useRouter()
const route = useRoute()

const countries = computed(() => {
  return countryStore
    .getCountries
})

onBeforeMount(() => {
  cityStore
    .show(route.params.id)
    .then(() => {
      setValues(cityStore.getCity)
    })
})

onBeforeRouteLeave(async () => {
  if (meta.value.touched && !updated.value) {
    await confirmationDialog.routeLeave({
      message: 'Do you really want to leave this page? All unsaved dat will be lost',
      action: () => router.push({name: 'cities.index'})
    })
  }

})

const confirmUpdate = () => {
  confirmationDialog
    .open({
      message: 'Do you really want to update this city\'s info?',
      action: () => onSubmit()
    })
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
@import "@/assets/styles/views/cities/edit.scss";
</style>

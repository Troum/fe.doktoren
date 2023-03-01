<template>
  <v-container class="fill-height" fluid>
    <v-row class="fill-height">
      <v-col class="mx-auto" cols="10" lg="12">
        <v-card :min-height="250" class="px-3 py-3">
          <v-card-title class="mb-4">
            Update center
          </v-card-title>
          <v-card-text class="dk__create-form__first-line">
            <div class="mt-n3">
              <file-input-component :src="centerStore['getCenter'].avatar"/>
            </div>
            <text-field-with-validation label="Enter center name"
                                        placeholder="Center name"
                                        name="name" type="text"/>
            <select-with-validation
              label="Enter center type"
              name="type"
              item-value="id"
              item-title="name"
              :items="types"/>
            <select-with-validation
              label="Enter center specialization"
              item-value="id"
              item-title="name"
              name="specialization"
              :items="specializations"/>
          </v-card-text>
          <v-card-text class="dk__create-form__line">
            <select-with-validation
              label="Age group center works with"
              name="age_group"
              :items="ageGroups"/>
            <autocomplete-with-validation-component
              :items="cities"
              item-title="name"
              item-value="id"
              label="Enter centers's city"
              name="city_id"/>
            <text-field-with-validation label="Enter center address"
                                        placeholder="Center address"
                                        name="address" type="text"/>
          </v-card-text>
          <v-card-actions class="d-flex align-center justify-end">
            <v-btn :min-width="$vuetify.display.width * 0.1"
                   :loading="loadingStore['getSubmitLoading']"
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
import {useForm} from 'vee-validate'
import {computed, onBeforeMount, ref} from "vue";
import {onBeforeRouteLeave, useRoute, useRouter} from "vue-router";
import {
  centerStorage, cityStorage,
  commonStorage, fileInputStorage, loadingStorage,
} from "@/store";
import {CenterSchema} from "@/schemas/center/center.schema";
import AutocompleteWithValidationComponent from "@/components/form-fields/AutocompleteWithValidationComponent.vue";
import TextFieldWithValidation from "@/components/form-fields/TextFieldWithValidation.vue";
import SelectWithValidation from "@/components/form-fields/SelectWithValidation.vue";
import FileInputComponent from "@/components/form-fields/FileInputComponent.vue";
import confirmationDialog from "@/store/components/dialogs/confirmation.dialog";

const router = useRouter()
const route = useRoute()
const confirmation = confirmationDialog()
const avatar = fileInputStorage()
const common = commonStorage()
const cityStore = cityStorage()
const centerStore = centerStorage()
const loadingStore = loadingStorage()
const centerSchema = CenterSchema

const {values, errors, setValues, setFieldValue, handleSubmit, meta} = useForm({
  validationSchema: centerSchema,
  validateOnMount: false
})
const updated = ref(false)
const ageGroups = computed(() => {
  return common
    .getAgeGroups
})
const cities = computed(() => {
  return cityStore
    .getCities
})
const specializations = computed(() => {
  return common
    .getSpecializations
})
const types = computed(() => {
  return common
    .getTypes
})

onBeforeMount(() => {
  centerStore
    .show(route.params.id)
    .then(() => {
      setValues(centerStore.getCenter)
    })
})

onBeforeRouteLeave(async () => {
  if (meta.value.touched && !updated.value) {
    await confirmation.routeLeave({
      message: 'Do you really want to leave this page? All unsaved dat will be lost',
      action: () => router.push({name: 'centers.index'})
    })
  }

})

const onSubmit = handleSubmit((values) => {
  loadingStore.setLoading('submit', true)
  centerStore
    .update(centerStore.getCenter.id, values)
    .then((response) => {
      if (avatar.getFile) {
        centerStore
          .avatar({avatar: avatar.getFile, slug: response.data.slug})
          .then(() => {
            updated.value = true
            loadingStore.setLoading('submit', false)
            router
              .push({name: 'centers.index'})
          })
          .catch(() => loadingStore.setLoading('submit', false))
      } else {
        updated.value = true
        loadingStore.setLoading('submit', false)
        router
          .push({name: 'centers.index'})
      }
    })
    .then(() => loadingStore.setLoading('submit', false))
    .catch(() => loadingStore.setLoading('submit', false))

})

</script>
<style scoped lang="scss">
@import "@/assets/styles/views/centers/create.scss";
</style>

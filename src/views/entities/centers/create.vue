<template>
  <v-container class="fill-height" fluid>
    <v-row class="fill-height">
      <v-col class="mx-auto" cols="10" lg="12">
        <v-card :min-height="250" class="px-3 py-3">
          <v-card-title class="mb-4">
            Add new center
          </v-card-title>
          <v-card-text class="dk__create-form__first-line">
            <div class="mt-n3">
              <file-input-component/>
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
import {computed, inject, onBeforeMount, ref, toRaw} from "vue";
import {useRouter} from "vue-router";
import {
  avatarStorage, centerStorage, cityStorage,
  commonStorage, fileInputStorage, loadingStorage, specializationStorage, typeStorage,
} from "@/store";
import {CenterSchema} from "@/schemas/center/center.schema";
import AutocompleteWithValidationComponent from "@/components/form-fields/AutocompleteWithValidationComponent.vue";
import TextFieldWithValidation from "@/components/form-fields/TextFieldWithValidation.vue";
import SelectWithValidation from "@/components/form-fields/SelectWithValidation.vue";
import FileInputComponent from "@/components/form-fields/FileInputComponent.vue";

const router = useRouter()
const avatar = fileInputStorage()
const common = commonStorage()
const specialization = specializationStorage()
const type = typeStorage()
const cityStore = cityStorage()
const centerStore = centerStorage()
const loadingStore = loadingStorage()
const centerSchema = CenterSchema

const {values, errors, setFieldError, setFieldValue, handleSubmit} = useForm({
  validationSchema: centerSchema,
  validateOnMount: false
})

const ageGroups = computed(() => {
  return common
    .getAgeGroups
})
const cities = computed(() => {
  return cityStore
    .getCities
})
const specializations = computed(() => {
  return specialization
    .getSpecializations
})
const types = computed(() => {
  return type
    .getTypes
})

const onSubmit = handleSubmit((values) => {
  loadingStore.setLoading('submit', true)
  centerStore
    .store(values)
    .then((response) => {
      if (avatar.getFile) {
        centerStore
          .avatar({avatar: avatar.getFile, slug: response.data.slug})
          .then(() => {
            loadingStore.setLoading('submit', false)
            router
              .push({name: 'centers.index'})
          })
          .catch(() => loadingStore.setLoading('submit', false))
      } else {
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

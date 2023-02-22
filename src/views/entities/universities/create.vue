<template>
  <v-container class="fill-height" fluid>
    <v-row class="fill-height">
      <v-col class="mx-auto" cols="10" lg="12">
        <v-card :min-height="250" class="px-3 py-3">
          <v-card-title class="mb-4">
            Add new university
          </v-card-title>
          <v-card-text class="dk__create-form__first-line">
            <text-field-with-validation label="Enter university name"
                                        placeholder="University name"
                                        name="name" type="text"/>
            <autocomplete-with-validation-component
              label="Enter university's city"
              name="city_id"
              item-title="name"
              item-value="id"
              :items="cities"/>
          </v-card-text>
          <v-card-actions class="d-flex align-center justify-end">
            <v-btn :min-width="$vuetify.display.width * 0.1"
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
import {computed, inject} from "vue";
import {useRouter} from "vue-router";
import {
  cityStorage,
  universityStorage
} from "@/store";
import {UniversitySchema} from "@/schemas/university/university.schema";
import TextFieldWithValidation from "@/components/form-fields/TextFieldWithValidation.vue";
import AutocompleteWithValidationComponent from "@/components/form-fields/AutocompleteWithValidationComponent.vue";

const router = useRouter()

const cityStore = cityStorage()
const universityStore = universityStorage()
const universitySchema = UniversitySchema
const {values, errors, setFieldValue, handleSubmit} = useForm({
  validationSchema: universitySchema,
  validateOnMount: false
})

const cities = computed(() => {
  return cityStore
    .getCities
})
const onSubmit = handleSubmit((values) => {
  universityStore
    .store(values)
    .catch()
})

</script>
<style scoped lang="scss">
@import "@/assets/styles/views/universities/create.scss";
</style>

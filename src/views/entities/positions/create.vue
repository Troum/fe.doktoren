<template>
  <v-container class="fill-height" fluid>
    <v-row class="fill-height">
      <v-col class="mx-auto" cols="10" lg="12">
        <v-card :min-height="250" class="px-3 py-3">
          <v-card-title class="mb-4">
            Add new position
          </v-card-title>
          <v-card-text class="dk__create-form__first-line">
            <text-field-with-validation label="Enter position name"
                                        placeholder="Position name"
                                        name="name" type="text"/>
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
  countryStorage, loadingStorage, specializationStorage, typeStorage
} from "@/store";
import {CitySchema} from "@/schemas/city/city.schema";
import {mdiMapCheck} from "@mdi/js";
import TextFieldWithValidation from "@/components/form-fields/TextFieldWithValidation.vue";
import AutocompleteWithValidationComponent from "@/components/form-fields/AutocompleteWithValidationComponent.vue";
import {SpecializationSchema} from "@/schemas/specialization/specialization.schema";
import {TypeSchema} from "@/schemas/type/type.schema";
import {PositionSchema} from "@/schemas/position/position.schema";

const router = useRouter()
const loadingStore = loadingStorage()
const typeStore = typeStorage()
const positionSchema = PositionSchema
const {values, errors, setFieldValue, handleSubmit} = useForm({
  validationSchema: positionSchema,
  validateOnMount: false
})

const onSubmit = handleSubmit((values) => {
  loadingStore.setLoading('submit', true)
  typeStore
    .store(values)
    .then(() => {
      loadingStore.setLoading('submit', false)
      router.push({name: 'types.index'})
    })
    .catch(() => loadingStore.setLoading('submit', false))
})

</script>
<style scoped lang="scss">
@import "@/assets/styles/views/types/create.scss";
</style>

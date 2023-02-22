<template>
  <v-container class="fill-height" fluid>
    <v-row class="fill-height">
      <v-col class="mx-auto" cols="10" lg="12">
        <v-card :min-height="250" class="px-3 py-3">
          <v-card-title class="mb-4">
            Update university
          </v-card-title>
          <v-card-text class="dk__edit-form__first-line">
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
</template>

<script setup>
import {useForm} from 'vee-validate'
import {computed, onBeforeMount, ref} from "vue";
import {onBeforeRouteLeave, useRoute, useRouter} from "vue-router";
import {
  cityStorage, confirmationDialogStorage, loadingStorage,
  universityStorage
} from "@/store";
import {UniversitySchema} from "@/schemas/university/university.schema";
import TextFieldWithValidation from "@/components/form-fields/TextFieldWithValidation.vue";
import AutocompleteWithValidationComponent from "@/components/form-fields/AutocompleteWithValidationComponent.vue";

const router = useRouter()
const route = useRoute()
const updated = ref(false)
const cityStore = cityStorage()
const universityStore = universityStorage()
const loadingStore = loadingStorage()
const universitySchema = UniversitySchema
const {values, errors, setFieldValue, setValues, meta, handleSubmit} = useForm({
  validationSchema: universitySchema,
  validateOnMount: false
})


const cities = computed(() => {
  return cityStore
    .getCities
})
onBeforeMount(() => {
  universityStore
    .show(route.params.id)
    .then(() => {
      setValues(universityStore.getUniversity)
    })
})
onBeforeRouteLeave(async () => {
  if (meta.value.touched && !updated.value) {
    await confirmationDialogStorage().routeLeave({
      message: 'Do you really want to leave this page? All unsaved dat will be lost',
      action: () => router.push({name: 'universities.index'})
    })
  }

})
function confirmUpdate() {
  confirmationDialogStorage()
    .open({
      message: 'Do you really want to update this university\'s info?',
      action: () => onSubmit()
    })
}
const onSubmit = handleSubmit((values) => {
  loadingStore.setLoading('submit', true)
  universityStore
    .update(universityStore.getUniversity.id, values)
    .then(() => {
      updated.value = true
      loadingStore.setLoading('submit', false)
      router.push({name: 'universities.index'})
    })
    .catch(() => loadingStore.setLoading('submit', false))
})

</script>
<style scoped lang="scss">
@import "@/assets/styles/views/universities/edit.scss";
</style>

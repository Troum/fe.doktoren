<template>
  <v-container class="fill-height" fluid>
    <v-row class="fill-height">
      <v-col class="mx-auto" cols="10" lg="12">
        <v-card :min-height="250" class="px-3 py-3">
          <v-card-title class="mb-4">
            Add new speciality
          </v-card-title>
          <v-card-text class="dk__create-form__first-line">
            <div class="mt-n3">
              <file-input-component :icon="true"/>
            </div>
            <text-field-with-validation label="Enter speciality name"
                                        placeholder="Speciality name"
                                        name="name" type="text"/>
            <text-field-with-validation label="Enter speciality pseudonym"
                                        placeholder="Speciality pseudonym"
                                        name="pseudonym" type="text"/>
            <select-with-validation
              label="Age group of speciality"
              name="age_group"
              :items="ageGroups"/>
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
  commonStorage, fileInputStorage, loadingStorage, specialityStorage,
} from "@/store";
import {CenterSchema} from "@/schemas/center/center.schema";
import AutocompleteWithValidationComponent from "@/components/form-fields/AutocompleteWithValidationComponent.vue";
import TextFieldWithValidation from "@/components/form-fields/TextFieldWithValidation.vue";
import SelectWithValidation from "@/components/form-fields/SelectWithValidation.vue";
import FileInputComponent from "@/components/form-fields/FileInputComponent.vue";
import {SpecialitySchema} from "@/schemas/speciality/speciality.schema";

const router = useRouter()
const avatar = fileInputStorage()
const common = commonStorage()
const specialityStore = specialityStorage()
const loadingStore = loadingStorage()
const specialitySchema = SpecialitySchema

const {values, errors, setFieldError, setFieldValue, handleSubmit} = useForm({
  validationSchema: specialitySchema,
  validateOnMount: false
})

const ageGroups = computed(() => {
  return common
    .getAgeGroups
})

const onSubmit = handleSubmit((values) => {
  loadingStore.setLoading('submit', true)
  specialityStore
    .store(values)
    .then((response) => {
      if (avatar.getFile) {
        specialityStore
          .avatar({avatar: avatar.getFile, slug: response.data.slug})
          .then(() => {
            loadingStore.setLoading('submit', false)
            router
              .push({name: 'specialities.index'})
          })
          .catch(() => loadingStore.setLoading('submit', false))
      } else {
        loadingStore.setLoading('submit', false)
        router
          .push({name: 'specialities.index'})
      }
    })
    .then(() => loadingStore.setLoading('submit', false))
    .catch(() => loadingStore.setLoading('submit', false))

})

</script>
<style scoped lang="scss">
@import "@/assets/styles/views/specialities/create.scss";
</style>

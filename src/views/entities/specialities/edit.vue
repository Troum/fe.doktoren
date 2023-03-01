<template>
  <v-container class="fill-height" fluid>
    <v-row class="fill-height">
      <v-col class="mx-auto" cols="10" lg="12">
        <v-card :min-height="250" class="px-3 py-3">
          <v-card-title class="mb-4">
            Update speciality
          </v-card-title>
          <v-card-text class="dk__create-form__first-line">
            <div class="mt-n3">
              <file-input-component :icon="true" :src="specialityStore['getSpeciality'].avatar"/>
            </div>
            <text-field-with-validation label="Enter speciality name"
                                        placeholder="Speciality name"
                                        name="name" type="text"/>
            <text-field-with-validation label="Enter speciality pseudonym"
                                        placeholder="Speciality pseudonym"
                                        name="pseudonym" type="text"/>
            <select-with-validation
              label="Age group center works with"
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
import {computed, onBeforeMount, ref} from "vue";
import {onBeforeRouteLeave, useRoute, useRouter} from "vue-router";
import {
  commonStorage, fileInputStorage, loadingStorage, specialityStorage,
} from "@/store";
import TextFieldWithValidation from "@/components/form-fields/TextFieldWithValidation.vue";
import SelectWithValidation from "@/components/form-fields/SelectWithValidation.vue";
import FileInputComponent from "@/components/form-fields/FileInputComponent.vue";
import confirmationDialog from "@/store/components/dialogs/confirmation.dialog";
import {SpecialitySchema} from "@/schemas/speciality/speciality.schema";

const router = useRouter()
const route = useRoute()
const specialityStore = specialityStorage()
const confirmation = confirmationDialog()
const avatar = fileInputStorage()
const common = commonStorage()
const loadingStore = loadingStorage()
const specialitySchema = SpecialitySchema

const {values, errors, setValues, setFieldValue, handleSubmit, meta} = useForm({
  validationSchema: specialitySchema,
  validateOnMount: false
})
const updated = ref(false)
const ageGroups = computed(() => {
  return common
    .getAgeGroups
})


onBeforeMount(() => {
  specialityStore
    .show(route.params.id)
    .then(() => {
      setValues(specialityStore.getSpeciality)
    })
})

onBeforeRouteLeave(async () => {
  if (meta.value.touched && !updated.value) {
    await confirmation.routeLeave({
      message: 'Do you really want to leave this page? All unsaved dat will be lost',
      action: () => router.push({name: 'specialities.index'})
    })
  }

})

const onSubmit = handleSubmit((values) => {
  loadingStore.setLoading('submit', true)
  specialityStore
    .update(specialityStore.getSpeciality.id, values)
    .then((response) => {
      if (avatar.getFile) {
        specialityStore
          .avatar({avatar: avatar.getFile, slug: response.data.slug})
          .then(() => {
            updated.value = true
            loadingStore.setLoading('submit', false)
            router
              .push({name: 'specialities.index'})
          })
          .catch(() => loadingStore.setLoading('submit', false))
      } else {
        updated.value = true
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
@import "@/assets/styles/views/specialities/edit.scss";
</style>

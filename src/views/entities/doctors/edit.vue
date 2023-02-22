<template>
  <v-container class="fill-height" fluid>
    <v-row class="fill-height">
      <v-col class="mx-auto" cols="10" lg="12">
        <v-card :min-height="250" class="px-3 py-3">
          <v-card-title class="mb-4">
            Update doctor
          </v-card-title>
          <v-card-text class="dk__edit-form__first-line">
            <div class="mt-n3">
              <avatar-component/>
            </div>
            <text-field-with-validation label="Enter doctor name"
                                        placeholder="Doctor name"
                                        name="name" type="text"/>
            <select-with-validation
              label="Enter doctor gender"
              name="gender"
              :items="genders"/>
            <years-component label="Enter doctor career start" name="career_start"/>
          </v-card-text>
          <v-card-text class="dk__edit-form__line">
            <autocomplete-with-validation-component
              :items="specialities"
              item-title="name"
              item-value="id"
              label="Enter doctor's main speciality"
              name="speciality"/>
            <autocomplete-with-validation-component
              :items="specialities"
              :multiple="true"
              item-title="name"
              item-value="id"
              label="Enter doctor's additional specialities"
              name="specialities"/>
            <select-with-validation
              label="Age group to work with"
              name="age_group"
              :items="ageGroups"/>
          </v-card-text>
          <v-card-text class="dk__edit-form__line">
            <select-with-validation
              label="Enter doctor's academy degree"
              style="width: 100%"
              name="academy_degree"
              :items="academyDegrees"/>
            <div class="d-flex" style="width: 100%; column-gap: 15px">
              <div style="position: relative; row-gap: 4px" class="d-flex flex-column">
                <v-btn
                  :color="Object.prototype.hasOwnProperty.call(errors,'experience') ? 'error' : 'primary-darken-1'"
                  :prepend-icon="mdiPlus"
                  height="56" variant="tonal"
                  @click="dialogs.experience.open()"> experience info
                </v-btn>
                <template v-if="Object.prototype.hasOwnProperty.call(errors,'experience')">
                  <div class="v-messages">
                    <div class="v-messages__message text-error" style="transform-origin: center top 8px;">
                      {{ errors.experience }}
                    </div>
                  </div>
                </template>
              </div>
              <v-btn
                :prepend-icon="mdiPlus"
                height="56" variant="tonal"
                @click="dialogs.education.open()"> education info
              </v-btn>
              <v-btn :prepend-icon="mdiPlus"
                     color="primary-darken-1"
                     height="56"
                     @click="dialogs.course.open()"
                     variant="outlined"> courses info
              </v-btn>
            </div>
          </v-card-text>
          <template v-if="experienceList.length">
            <experience-info-list :items="experienceList"
                                  :remove-action="removeExperience"/>
          </template>
          <template v-if="educationList.length">
            <education-info-list :items="educationList"
                                  :remove-action="removeEducation"/>
          </template>
          <template v-if="coursesList.length">
            <course-info-list :items="coursesList"
                                  :remove-action="removeCourse"/>
          </template>
          <v-card-text>
            <textarea-with-validation label="Write something about doctor" name="description"/>
          </v-card-text>
          <v-card-actions class="d-flex align-center justify-end">
            <v-btn :min-width="$vuetify.display.width * 0.1"
                   class="mb-4"
                   color="primary"
                   @click="confirmUpdate"
                   variant="tonal">Update
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <experience-info-dialog
      :method="addExperience"
      :schema="experienceSchema"/>
    <education-info-dialog
      :schema="educationSchema"
      :method="addEducation"/>
    <courses-info-dialog
      :schema="courseSchema"
      :method="addCourse"/>
  </v-container>
</template>

<script setup>
import {useForm} from 'vee-validate'
import {computed, inject, onBeforeMount, ref, toRaw} from "vue";
import {useRoute, useRouter, onBeforeRouteLeave} from "vue-router";
import {
  avatarStorage,
  commonStorage, confirmationDialogStorage,
  courseDialogStorage,
  doctorStorage,
  educationDialogStorage,
  experienceDialogStorage,
  specialityStorage,
  universityStorage
} from "@/store";
import {mdiPlus} from '@mdi/js'
import {DoctorSchema} from "@/schemas/doctor/doctor.schema";
import {ExperienceSchema} from "@/schemas/doctor/experience.schema";
import {EducationSchema} from "@/schemas/doctor/education.schema";
import {CourseSchema} from "@/schemas/doctor/course.schema";
import AutocompleteWithValidationComponent from "@/components/form-fields/AutocompleteWithValidationComponent.vue";
import AvatarComponent from "@/components/avatar/Avatar.vue";
import ExperienceInfoDialog from "@/components/entities/doctor/ExperienceInfoDialog.vue";
import YearsComponent from "@/components/form-fields/YearsComponent.vue";
import EducationInfoDialog from "@/components/entities/doctor/EducationInfoDialog.vue";
import ExperienceInfoList from "@/components/entities/doctor/ExperienceInfoList.vue";
import EducationInfoList from "@/components/entities/doctor/EducationInfoList.vue";
import CoursesInfoDialog from "@/components/entities/doctor/CoursesInfoDialog.vue";
import CourseInfoList from "@/components/entities/doctor/CourseInfoList.vue";
import TextFieldWithValidation from "@/components/form-fields/TextFieldWithValidation.vue";
import SelectWithValidation from "@/components/form-fields/SelectWithValidation.vue";
import TextareaWithValidation from "@/components/form-fields/TextareaWithValidation.vue";
import {v4 as uuid4} from "uuid";
import _ from 'lodash'

const emitter = inject('emitter')

const router = useRouter()
const route = useRoute()
const avatar = avatarStorage()
const common = commonStorage()
const doctorsStore = doctorStorage()
const specialitiesStore = specialityStorage()
const universitiesStore = universityStorage()
const doctorSchema = DoctorSchema
const experienceSchema = ExperienceSchema
const educationSchema = EducationSchema
const courseSchema = CourseSchema

const {values, errors, setFieldError, setFieldValue, setValues, meta, handleSubmit} = useForm({
  validationSchema: doctorSchema,
  validateOnMount: false
})

const specialities = computed(() => {
  return specialitiesStore.getSpecialities
})
const ageGroups = computed(() => {
  return common
    .getAgeGroups
})
const academyDegrees = computed(() => {
  return common
    .getAcademyDegrees
})
const universities = computed(() => {
  return universitiesStore
    .getUniversities
})
const genders = computed(() => {
  return common
    .getGenders
})
const dialogs = {
  experience: experienceDialogStorage(),
  education: educationDialogStorage(),
  course: courseDialogStorage(),
  confirmation: confirmationDialogStorage()
}

let experience = ref([])
let education = ref([])
let courses = ref([])

const experienceList = computed(() => {
  return experience.value
})

const educationList = computed(() => {
  return education.value
})

const coursesList = computed(() => {
  return courses.value
})

onBeforeMount(() => {
  doctorsStore
    .show(route.params.id)
    .then(() => {
      experience.value = doctorsStore.getDoctor?.experience || []
      education.value = doctorsStore.getDoctor?.education || []
      courses.value = doctorsStore.getDoctor?.courses || []
      setValues(doctorsStore.getDoctor)
    })
})

onBeforeRouteLeave(async () => {
  if (meta.value.touched) {
    await dialogs.confirmation.routeLeave({
      message: 'Do you really want to leave this page? All unsaved dat will be lost',
      action: () => router.push({name: 'doctors.index'})
    })
  }

})

function removeCourse(data) {
  experience.value.splice(_.find(courses.value, {id: data.id}), 1)
  setFieldValue('courses', courses.value)
}
function removeEducation(data) {
  education.value.splice(_.find(education.value, {id: data.id}), 1)
  setFieldValue('education', education.value)
}
function removeExperience(data) {
  experience.value.splice(_.find(experience.value, {id: data.id}), 1)
  setFieldValue('experience', experience.value)
}

emitter.on('confirm-doctor-update', (data) => {
  onSubmit(data?.id)
})

function addExperience(item) {
  const clone = structuredClone(toRaw(item))
  if (_.find(experience.value, {id: clone.id})) {
    experience.value.splice(_.findIndex(experience.value, {id: clone.id}), 1)
    experience.value.push(clone)
    setFieldValue('experience', experience.value)
    validateExperience()
  } else {
    experience.value.push(clone)
    setFieldValue('experience', experience.value)
    validateExperience()
  }
  dialogs
    .experience
    .close()
}

function addEducation(item) {
  education.value.push(structuredClone(toRaw(item)))
  setFieldValue('education', education.value)
  dialogs
    .education
    .close()
}

function addCourse(item) {
  values.id = uuid4()
  courses.value.push(structuredClone(toRaw(item)))
  setFieldValue('courses', courses.value)
  dialogs
    .course
    .close()
}

function confirmUpdate() {
  dialogs
    .confirmation
    .open({
      message: 'Do you really want to update this doctor\'s info?',
      action: () => onSubmit()
    })
}

const onSubmit = handleSubmit((values) => {
  if (!validateExperience()) {
    return
  } else {
    doctorsStore
      .update(doctorsStore.getDoctor.id, values)
      .then((response) => {
        if (avatar.getFile) {
          doctorsStore
            .avatar({avatar: avatar.getFile, slug: response.data.slug})
            .then(() => {
              router
                .push({name: 'doctors.index'})
                .then(() => avatar.resetAll())
            })
        } else {
          router
            .push({name: 'doctors.index'})
            .then(() => avatar.resetAll())
        }
      })
      .catch()
  }
})

function validateExperience() {
  if (!_.some(values.experience, {now: true, is_main: true})) {
    setFieldError('experience', 'Experience list should contain at least one current place')
    return false
  } else {
    setFieldError('experience', undefined)
    return true
  }
}

</script>
<style scoped lang="scss">
@import "@/assets/styles/views/doctors/edit.scss";
@import "@/assets/styles/views/doctors/common.scss";
</style>

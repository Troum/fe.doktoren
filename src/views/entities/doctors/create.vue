<template>
  <v-container class="fill-height" fluid>
    <v-row class="fill-height">
      <v-col class="mx-auto" cols="10" lg="12">
        <v-card :min-height="250" class="px-3 py-3">
          <v-card-title class="mb-4">
            Add new doctor
          </v-card-title>
          <v-card-text class="dk__create-form__first-line">
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
          <v-card-text class="dk__create-form__line">
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
          <v-card-text class="dk__create-form__line">
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
              <v-btn :prepend-icon="mdiPlus"
                     color="green-darken-2"
                     height="56"
                     @click="dialogs.selfPractice.open()"
                     variant="outlined"> self-practice info
              </v-btn>
            </div>
          </v-card-text>
          <template v-if="selfPractice.length">
            <self-practice-info-list :items="selfPracticeList"
                              :remove-action="removeSelfPractice"/>
          </template>
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
                   @click="onSubmit"
                   variant="tonal">Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <experience-info-dialog
    :method="addExperience"
    :schema="experienceSchema"/>
  <education-info-dialog
    :schema="educationSchema"
    :method="addEducation"/>
  <courses-info-dialog
    :schema="courseSchema"
    :method="addCourse"/>
  <self-practice-info-dialog
    :schema="selfPracticeSchema"
    :method="addSelfPractice"/>
</template>

<script setup>
import {useForm} from 'vee-validate'
import {computed, inject, onBeforeMount, ref, toRaw} from "vue";
import {useRouter} from "vue-router";
import {
  avatarStorage,
  commonStorage,
  courseDialogStorage,
  doctorStorage,
  educationDialogStorage,
  experienceDialogStorage, selfPracticeDialogStorage,
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
import SelfPracticeInfoDialog from "@/components/entities/doctor/SelfPracticeInfoDialog.vue";
import {SelfPracticeSchema} from "@/schemas/doctor/selfPractice.schema";
import SelfPracticeInfoList from "@/components/entities/doctor/SelfPracticeInfoList.vue";

const emitter = inject('emitter')

const router = useRouter()
const avatar = avatarStorage()
const common = commonStorage()
const doctorsStore = doctorStorage()
const specialitiesStore = specialityStorage()
const universitiesStore = universityStorage()
const doctorSchema = DoctorSchema
const selfPracticeSchema = SelfPracticeSchema
const experienceSchema = ExperienceSchema
const educationSchema = EducationSchema
const courseSchema = CourseSchema
const inArray = inject('inArray')
const removeFromArray = inject('removeFromArray')

const {values, errors, setFieldError, setFieldValue, handleSubmit} = useForm({
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
  selfPractice: selfPracticeDialogStorage()
}

let selfPractice = ref([])
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

const selfPracticeList = computed(() => {
  return selfPractice.value
})

onBeforeMount(() => {
  avatar.resetAll()
})

function removeSelfPractice(data) {
  removeFromArray(selfPractice.value,{id: data.id})
  setFieldValue('selfPractice', selfPractice.value)
}
function removeCourse(data) {
  removeFromArray(courses.value,{id: data.id})
  setFieldValue('courses', courses.value)
}
function removeEducation(data) {
  removeFromArray(education.value,{id: data.id})
  setFieldValue('education', education.value)
}
function removeExperience(data) {
  removeFromArray(experience.value,{id: data.id})
  setFieldValue('experience', experience.value)
}

function addExperience(item) {
  const clone = structuredClone(toRaw(item))
  if (inArray(experience.value, {id: clone.id})) {
    removeFromArray(experience.value,{id: clone.id})
    experience.value.push(clone)
  } else {
    experience.value.push(clone)
  }
  setFieldValue('experience', experience.value)
  validateExperience()
  dialogs
    .experience
    .close()
}

function addSelfPractice(item) {
  const clone = structuredClone(toRaw(item))
  if (inArray(selfPractice.value, {id: clone.id})) {
    removeFromArray(selfPractice.value,{id: clone.id})
    selfPractice.value.push(clone)
  } else {
    selfPractice.value.push(clone)
  }
  setFieldValue('selfPractice', selfPractice.value)
  dialogs
    .selfPractice
    .close()
}

function addEducation(item) {
  const clone = structuredClone(toRaw(item))
  if (inArray(education.value, {id: clone.id})) {
    removeFromArray(education.value, {id: clone.id})
    education.value.push(clone)
  } else {
    education.value.push(clone)
  }
  setFieldValue('education', education.value)
  dialogs
    .education
    .close()
}

function addCourse(item) {
  const clone = structuredClone(toRaw(item))
  if (inArray(courses.value, {id: clone.id})) {
    removeFromArray(courses.value, {id: clone.id})
    courses.value.push(clone)
  } else {
    courses.value.push(clone)
  }
  setFieldValue('courses', courses.value)
  dialogs
    .course
    .close()
}

const onSubmit = handleSubmit((values) => {
  validateExperience()
  doctorsStore
    .store(values)
    .then((response) => {
      if (avatar.getFile) {
        doctorsStore
          .avatar({avatar: avatar.getFile, slug: response.data.slug})
          .then(() => {
            router
              .push({name: 'doctors.index'})
              .then(() => doctorsStore.index())
          })
      } else {
        doctorsStore
          .avatar({avatar: null, slug: response.data.slug})
          .then(() => {
            router
              .push({name: 'doctors.index'})
              .then(() => doctorsStore.index())
          })
      }
    })
    .catch()

})

function validateExperience() {
  if (!_.some(values.experience, {now: true, is_main: true})) {
    setFieldError('experience', 'Experience list should contain at least one current place')
  } else {
    setFieldError('experience', undefined)
  }
}

</script>
<style scoped lang="scss">
@import "@/assets/styles/views/doctors/create.scss";
@import "@/assets/styles/views/doctors/common.scss";
</style>

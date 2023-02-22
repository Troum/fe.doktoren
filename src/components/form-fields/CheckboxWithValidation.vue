<template>
  <v-checkbox :error-messages="errors"
              :name="name"
              v-model="value"
              color="primary-darken-1"
              :label="label"
              :style="style"
              :hide-details="!errors.length"
              @update:modelValue="handleChange"/>
</template>

<script setup>
import {useField, useForm} from "vee-validate"
import {toRef} from "vue"

const props = defineProps({
  style: {
    required: false
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  }
});
const {value, handleChange, errors} = useField(toRef(props, 'name'), undefined);
</script>

<style scoped>

</style>

<template>
    <v-textarea :error-messages="errors"
                  autocomplete="off"
                  :label="label"
                  :placeholder="placeholder"
                  @blur="handleBlur"
                  v-model="value"
                  variant="outlined"></v-textarea>
</template>

<script setup>
import {useField} from "vee-validate"
import {toRef} from "vue"

const props = defineProps({
  style: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
    default: ''
  }
});
const {value, handleBlur, errors} = useField(toRef(props, 'name'), undefined);
</script>

<style scoped>

</style>

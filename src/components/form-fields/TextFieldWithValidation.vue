<template>
    <v-text-field :error-messages="errors"
                  autocomplete="off"
                  :label="label"
                  :placeholder="placeholder"
                  :type="type"
                  @blur="handleBlur"
                  v-model="value"
                  variant="outlined"></v-text-field>
</template>

<script setup>
import {useField} from "vee-validate"
import {toRef} from "vue"

const props = defineProps({
  style: {
    type: String,
    required: false
  },
  type: {
    type: String,
    required: true
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
    default: false
  }
});
const {value, handleBlur, errors} = useField(toRef(props, 'name'), undefined);
</script>

<style scoped>

</style>

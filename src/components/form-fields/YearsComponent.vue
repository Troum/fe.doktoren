<template>
  <div :style="style">
    <v-autocomplete v-model="value"
                    :append-inner-icon="mdiChevronDown"
                    :error-messages="errors"
                    :items="years"
                    :disabled="disabled"
                    :label="label"
                    :menu-props="{ maxHeight: 250 }"
                    autocomplete="off"
                    :hide-details="!errors.length"
                    variant="outlined"
                    @blur="handleBlur"
    />
  </div>
</template>

<script setup>
import {mdiChevronDown} from "@mdi/js";
import {useField} from "vee-validate";
import {computed, toRef} from "vue";
import moment from 'moment'

const props = defineProps({
  style: {
    type: Object,
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
  loading: {
    type: Boolean,
    required: false,
    default: false
  },
  disabled: {
    type: Boolean,
    required: false
  }
});
const {value, handleBlur, errors} = useField(toRef(props, 'name'), undefined);
const years = Array.from({
    length: moment().year() - 1969
  },
  (_, i) => i + 1970)
  .reverse()
  .map(year => {
    return {
      title: year,
      value: year
    }
  }) || []

</script>

<style scoped>

</style>

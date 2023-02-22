<template>
  <div>
    <template v-if="multiple">
      <v-select v-model="value"
                      :append-inner-icon="mdiChevronDown"
                      :error-messages="errors"
                      :item-title="itemTitle"
                      :item-value="itemValue"
                      :items="items"
                      :label="label"
                      :loading="loading"
                      :menu-props="{ maxHeight: 250 }"
                      :style="style"
                      autocomplete="off"
                      multiple
                      variant="outlined"
                      @blur="handleBlur"
      >
        <template v-slot:selection="{ item, index }">
          <template v-if="index < 1">
            <v-chip color="primary-darken-1" size="x-small">{{ item.raw.name }}</v-chip>
          </template>
          <template v-if="index === 1">
            <small class="text-primary-darken-1">&nbsp;(+{{
                pluralizator.pluralize(['other', 'others', 'others'], value.length - 1)
              }})</small>
          </template>
        </template>
      </v-select>
    </template>
    <template v-else>
      <v-select v-model="value"
                      :append-inner-icon="mdiChevronDown"
                      :error-messages="errors"
                      :item-title="itemTitle"
                      :item-value="itemValue"
                      :items="items"
                      :label="label"
                      :menu-props="{ maxHeight: 250 }"
                      :style="style"
                      autocomplete="off"
                      variant="outlined"
                      @blur="handleBlur"
      />
    </template>
  </div>

</template>

<script setup>
import {useField} from "vee-validate"
import {inject, toRef} from "vue"
import {mdiChevronDown} from "@mdi/js"

const pluralizator = inject('pluralize')
const props = defineProps({
  itemValue: {
    type: String,
    required: false,
    default: 'value'
  },
  itemTitle: {
    type: String,
    required: false,
    default: 'title'
  },
  multiple: {
    type: Boolean,
    required: false,
    default: false
  },
  style: {
    required: false
  },
  items: {
    type: Array,
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
  loading: {
    type: Boolean,
    required: false,
    default: false
  }
});
const {value, handleBlur, errors} = useField(toRef(props, 'name'), undefined);
</script>

<style scoped>

</style>

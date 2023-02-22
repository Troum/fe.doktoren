<template>
  <v-data-table
    :items-per-page.sync="tableOptions.itemsPerPage"
    :headers="tableHeaders"
    :items="tableData"
    :search="needle"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar :height="140" class="d-flex align-center px-6 bg-white">
        <v-text-field v-model="needle"
                      :prepend-inner-icon="mdiMagnify"
                      label="Enter search value"
                      placeholder="Search"
                      type="search"
                      variant="outlined"></v-text-field>
        <v-spacer/>
        <v-btn :prepend-icon="mdiPlus"
               :to="tableRoutes.create"
               color="primary-darken-1"
               variant="tonal">
          Add new {{ entity }}
        </v-btn>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn icon size="28" :disabled="tableOptions.disabled"
             class="mr-2"
             @click="editItem(item.raw)">
        <v-icon
          :icon="mdiPencil"
          size="x-small"
        >
        </v-icon>
      </v-btn>
      <v-btn icon size="28" :disabled="tableOptions.disabled"
             @click="deleteItem(item.raw)">
        <v-icon
          :icon="mdiDelete"
          color="error"
          size="x-small"
        >
        </v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script setup>
import {mdiDelete, mdiMagnify, mdiPencil, mdiPlus} from '@mdi/js'
import {useRouter} from 'vue-router'
import {computed, ref} from "vue";
import {confirmationDialogStorage} from "@/store";

const props = defineProps({
  items: {
    default: [],
    required: true
  },
  headers: {
    default: [],
    required: true
  },
  options: {
    default: {
      itemsPerPage: 5
    },
    required: false
  },
  entity: {
    default: 'item',
    required: true
  },
  routes: {
    default: {
      create: '',
      edit: ''
    },
    required: true
  },
  storage: {
    type: Object,
    required: true
  },
  formatted: null
})

const confirmationDialog = confirmationDialogStorage()

const needle = ref('')

const router = useRouter()

const tableData = computed(() => {
  return props.items
})

const tableHeaders = computed(() => {
  const headers = props.headers
  const actions = {
    key: 'actions',
    title: 'Actions'
  }

  headers.push(actions)

  return headers
})

const tableOptions = computed(() => {
  return props.options
})

const tableRoutes = computed(() => {
  return props.routes
})
function editItem(item) {
  router.push(`${tableRoutes.value['edit']}/${item.id}`)
}
async function deleteItem(item) {
  await confirmationDialog
    .open({
      message: 'Do you really want to delete this item?',
      action: () => props.storage.destroy(item.id)
    })
}

</script>

<style scoped>

</style>

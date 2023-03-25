<template>
  <v-container class="pa-4" fluid>
    <v-row>
      <v-col class="d-flex justify-space-between" cols="12">
        <index-table-component :headers="headers"
                               :items="items"
                               :routes="routes"
                               :storage="storage"
                               entity="center"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import {computed, onBeforeMount, ref} from "vue";
import {centerStorage} from "@/store";
import IndexTableComponent from "@/components/IndexTableComponent.vue";

const routes = ref({
  create: 'centers/create',
  edit: 'centers/edit'
})

const headers = ref([
  {
    key: 'id',
    title: '#',
    sortable: true
  },
  {
    key: 'name',
    title: 'Medical center name',
    sortable: true
  },
  {
    key: 'city',
    title: 'City',
    sortable: true
  },
  {
    key: 'address.address',
    title: 'Address',
    value: (item) => {
      return `${item.address?.address}, ${item.address?.postal_code}`
    },
    sortable: true
  },
  {
    key: 'address.map_url',
    title: 'Link to map',
    sortable: true
  }
])

const storage = centerStorage()

const items = computed(() => {
  return storage
    .getCenters
    .filter((center) => {
      return center.id !== 0
    })
})

onBeforeMount(() => {
  storage.index()
})

</script>

<style scoped>

</style>

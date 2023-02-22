<template>
  <v-container class="pa-4" fluid>
    <v-row>
      <v-col class="d-flex justify-space-between" cols="12">
        <index-table-component :headers="headers"
                               :items="items"
                               :routes="routes"
                               :storage="storage"
                               :options="{disabled: true, itemsPerPage: 5}"
                               entity="country"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import {computed, onBeforeMount, ref} from "vue";
import {countryStorage} from "@/store";
import IndexTableComponent from "@/components/IndexTableComponent.vue";

const routes = ref({
  create: 'countries/create',
  edit: 'countries/edit'
})

const headers = ref([
  {
    key: 'id',
    title: '#',
    sortable: true
  },
  {
    key: 'name',
    title: 'Country name',
    sortable: true
  },
  {
    key: 'country_code',
    title: 'Shortcode',
    sortable: true
  },
  {
    key: 'flag',
    title: 'Country flag',
    sortable: false
  }
])

const storage = countryStorage()

const items = computed(() => {
  return storage.getCountries
})

onBeforeMount(() => {
  storage.index()
})

</script>

<style scoped>

</style>

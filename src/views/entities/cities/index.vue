<template>
  <v-container class="pa-4" fluid>
    <v-row>
      <v-col class="d-flex justify-space-between" cols="12">
        <index-table-component :headers="headers"
                               :items="items"
                               :routes="routes"
                               :storage="storage"
                               entity="city"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import {computed, onBeforeMount, ref} from "vue";
import {cityStorage} from "@/store";
import IndexTableComponent from "@/components/IndexTableComponent.vue";

const routes = ref({
  create: 'cities/create',
  edit: 'cities/edit'
})

const headers = ref([
  {
    key: 'id',
    title: '#',
    sortable: true
  },
  {
    key: 'name',
    title: 'City name',
    sortable: true
  },
  {
    key: 'country.name',
    title: 'Country',
    sortable: true
  }
])

const storage = cityStorage()

const items = computed(() => {
  return storage.getCities
})

onBeforeMount(() => {
  storage.index()
})

</script>

<style scoped>

</style>

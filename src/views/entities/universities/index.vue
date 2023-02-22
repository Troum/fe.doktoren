<template>
  <v-container class="pa-4" fluid>
    <v-row>
      <v-col class="d-flex justify-space-between" cols="12">
        <index-table-component :headers="headers"
                               :items="items"
                               :routes="routes"
                               :storage="storage"
                               entity="university"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import {computed, onBeforeMount, ref} from "vue";
import {universityStorage} from "@/store";
import IndexTableComponent from "@/components/IndexTableComponent.vue";


const routes = ref({
  create: 'universities/create',
  edit: 'universities/edit'
})

const headers = ref([
  {
    key: 'id',
    title: '#',
    sortable: true
  },
  {
    key: 'name',
    title: 'University name',
    sortable: true
  },
  {
    key: 'city.name',
    title: 'City',
    sortable: true
  },
  {
    key: 'city.country.name',
    title: 'Country',
    sortable: true
  }
])

const storage = universityStorage()

const items = computed(() => {
  return storage.getUniversities
})

onBeforeMount(() => {
  storage.index()
})

</script>

<style scoped>

</style>

<template>
  <v-container class="pa-4" fluid>
    <v-row>
      <v-col class="d-flex justify-space-between" cols="12">
        <index-table-component :headers="headers"
                               :items="items"
                               :routes="routes"
                               :storage="storage"
                               entity="doctor"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import {computed, onBeforeMount, ref} from "vue";
import {doctorStorage} from "@/store";
import IndexTableComponent from "@/components/IndexTableComponent.vue";

const routes = ref({
  create: 'doctors/create',
  edit: 'doctors/edit'
})

const headers = ref([
  {
    key: 'id',
    title: '#',
    sortable: true
  },
  {
    key: 'name',
    title: 'Doctor name',
    sortable: true
  },
  {
    key: 'current_place.name',
    title: 'Center',
    sortable: true
  },
  {
    key: 'speciality.name',
    title: 'Main speciality',
    align: 'center',
    sortable: true
  },
  {
    key: 'age_group',
    value: (item) => {
      return `${item.age_group.charAt(0).toUpperCase()}${item.age_group.slice(1)}`
    },
    title: 'Age category',
    align: 'center',
    sortable: true
  }
])

const storage = doctorStorage()

const items = computed(() => {
  return storage.getDoctors
})

onBeforeMount(() => {
  storage
    .index()
})

</script>

<style scoped>

</style>

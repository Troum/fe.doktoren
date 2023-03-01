<template>
  <v-container class="pa-4" fluid>
    <v-row>
      <v-col class="d-flex justify-space-between" cols="12">
        <index-table-component :headers="headers"
                               :items="items"
                               :routes="routes"
                               :storage="storage"
                               entity="speciality"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import {computed, onBeforeMount, ref} from "vue";
import {centerStorage, specialityStorage} from "@/store";
import IndexTableComponent from "@/components/IndexTableComponent.vue";

const routes = ref({
  create: 'specialities/create',
  edit: 'specialities/edit'
})

const headers = ref([
  {
    key: 'id',
    title: '#',
    sortable: true
  },
  {
    key: 'name',
    title: 'Speciality name',
    sortable: true
  },
  {
    key: 'pseudonym',
    title: 'Speciality pseudonym',
    sortable: true
  },
  {
    key: 'age_group',
    title: 'Speciality age group',
    sortable: true,
    value: (item) => {
      return `${item.age_group?.charAt(0).toUpperCase()}${item.age_group?.slice(1)}`
    },
  }
])

const storage = specialityStorage()

const items = computed(() => {
  return storage.getSpecialities
})

onBeforeMount(() => {
  storage.index()
})

</script>

<style scoped>

</style>

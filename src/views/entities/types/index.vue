<template>
  <v-container class="pa-4" fluid>
    <v-row>
      <v-col class="d-flex justify-space-between" cols="12">
        <index-table-component :headers="headers"
                               :items="items"
                               :routes="routes"
                               :storage="storage"
                               entity="type"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import {computed, onBeforeMount, ref} from "vue";
import {specializationStorage, typeStorage} from "@/store";
import IndexTableComponent from "@/components/IndexTableComponent.vue";

const routes = ref({
  create: 'types/create',
  edit: 'types/edit'
})

const headers = ref([
  {
    key: 'id',
    title: '#',
    sortable: true,
    width: '10%'
  },
  {
    key: 'name',
    title: 'Type name',
    sortable: true,
    width: '75%'
  }
])

const storage = typeStorage()

const items = computed(() => {
  return storage.getTypes
})

onBeforeMount(() => {
  storage
    .index()
})

</script>

<style scoped>

</style>

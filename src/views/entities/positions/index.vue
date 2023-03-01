<template>
  <v-container class="pa-4" fluid>
    <v-row>
      <v-col class="d-flex justify-space-between" cols="12">
        <index-table-component :headers="headers"
                               :items="items"
                               :routes="routes"
                               :storage="storage"
                               entity="position"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import {computed, onBeforeMount, ref} from "vue";
import {positionStorage, specializationStorage, typeStorage} from "@/store";
import IndexTableComponent from "@/components/IndexTableComponent.vue";

const routes = ref({
  create: 'positions/create',
  edit: 'positions/edit'
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

const storage = positionStorage()

const items = computed(() => {
  return storage.getPositions
})

onBeforeMount(() => {
  storage
    .index()
})

</script>

<style scoped>

</style>

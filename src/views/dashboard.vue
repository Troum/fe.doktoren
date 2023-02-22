<template>
  <v-container class="pa-4" fluid>
    <v-row>
      <v-col class="d-flex justify-space-between" cols="12">
        <template v-for="card of 4">
          <v-card :min-height="200" elevation="1" width="24%"></v-card>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>

</script>

<style scoped>

</style>

<template>
  <v-alert :model-value="show"
           @close="close()"
           variant="flat"
           class="rounded-0"
           elevation="2"
           position="absolute"
           style="z-index: 1009; width: 100%"
           closable
           :close-icon="mdiClose"
           :color="response['getColor']"
           :text="response['getMessage']"></v-alert>
</template>

<script setup>
  import {responseStorage} from "@/store";
  import {mdiClose} from "@mdi/js";
  import {computed, watchEffect} from "vue";

  const response = responseStorage()
  const show = computed(() => {
    return response['getState']
  })

  watchEffect(() => {
    setTimeout(() => {
      close()
    }, 5000)
  })

  function close () {
    response.close()
  }
</script>

<style scoped>

</style>

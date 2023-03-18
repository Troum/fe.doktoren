<template>
  <v-card flat>
    <v-card-title class="text-primary-darken-1">
      District's List
      <v-divider class="my-2" />
    </v-card-title>
    <v-card-text class="dk__form__districts-container">
      <template v-for="district of items">
        <v-card min-height="60">
          <v-card-text class="pa-2">
            <div style="position: absolute; display: flex; column-gap: 5px; top: 12px; right: 12px">
              <v-btn
                @click="editDistrict(district)"
                color="warning"
                size="28"
                variant="tonal" icon>
                <svg-icon :path="mdiPencil" type="mdi" size="14"/>
              </v-btn>
              <v-btn
                @click="removeDistrict(district.id)"
                size="28"
                variant="tonal"
                color="error" icon>
                <svg-icon :path="mdiClose" type="mdi" size="14"/>
              </v-btn>
            </div>
            <div class="pa-3">
              <p><strong>District name:</strong> {{ district.name }}</p>
            </div>
          </v-card-text>
        </v-card>
      </template>
    </v-card-text>
  </v-card>
</template>

<script setup>
import SvgIcon from "@jamescoyle/vue-icon";
import {confirmationDialogStorage} from "@/store";
import {mdiClose, mdiPencil} from "@mdi/js";
import {inject} from "vue";

const emitter = inject('emitter')
const confirmationDialog = confirmationDialogStorage()

const props = defineProps({
  items: {
    required: true,
    type: Array
  },
  removeAction: {
    required: true,
    type: Function
  }

})

function removeDistrict(id) {
  confirmationDialog
    .open({
      message: 'Do you really want to delete this district from list?',
      action: () => props.removeAction(id)
    })
}

function editDistrict(district) {
  emitter.emit('edit-district', district)
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/views/cities/common.scss";
</style>

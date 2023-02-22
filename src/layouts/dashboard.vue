<template>
  <v-app>
    <v-app-bar class="px-4" elevation="1">
      <router-link style="width: 120px" to="/dashboard">
        <v-img :max-width="120" src="@/assets/logo.png"/>
      </router-link>
    </v-app-bar>
    <v-navigation-drawer elevation="1">
      <v-list lines="one">
        <v-list-item
          :subtitle="user.email"
          :title="user.name"
          class="text-primary-darken-1"
        >
          <template v-slot:prepend>
            <v-avatar :icon="mdiAccountOutline"
                      class="elevation-1"
                      color="primary"></v-avatar>
          </template>
        </v-list-item>
      </v-list>
      <v-divider class="mb-4"/>
      <v-list lines="one">
        <template v-for="item in menu">
          <template v-if="item.hasOwnProperty('divider')">
            <v-divider class="my-4"/>
          </template>
          <template v-else>
            <v-list-item
              :key="item.text"
              :title="item.text"
              :to="item.route"
              class="text-primary-darken-1"
            >
              <template v-slot:prepend>
                <v-icon :icon="item.icon" color="primary-darken-1"></v-icon>
              </template>
            </v-list-item>
          </template>
        </template>
      </v-list>
      <v-divider class="my-4"/>
      <v-list lines="one">
        <v-list-item
          class="text-primary-darken-1"
          title="Logout"
          @click="logout()"
        >
          <template v-slot:prepend>
            <v-icon :icon="mdiLogout" color="primary-darken-1"></v-icon>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view/>
    </v-main>
    <v-footer/>
    <response-alert-component />
    <confirm-dialog />
    <template v-if="changingRoute">
      <route-loading-screen transition="fade-transition"/>
    </template>
  </v-app>
</template>

<script setup>
import {
  mdiAccount,
  mdiAccountOutline,
  mdiBookEducation,
  mdiCity,
  mdiDoctor,
  mdiFlag,
  mdiHospital,
  mdiHospitalBox,
  mdiLogout
} from '@mdi/js'

import {computed} from "vue"
import {userStorage} from "@/store"
import {useRouter} from "vue-router/dist/vue-router";
import Api from "@/classes/api";
import ResponseAlertComponent from "@/components/ResponseAlertComponent.vue";
import RouteLoadingScreen from "@/components/RouteLoadingScreen.vue";
import Loader from "@/classes/loader";
import ConfirmDialog from "@/components/dialogs/ConfirmDialog.vue";

const router = useRouter()
const userStore = userStorage()

const user = computed(() => {
  return userStore.getUser
})

const changingRoute = computed(() => {
  return Loader.routeChange().get()
})

const menu = [
  {
    icon: mdiDoctor,
    text: 'Doctors',
    route: '/dashboard/doctors'
  },
  {
    icon: mdiHospital,
    text: 'Centers',
    route: '/dashboard/centers'
  },
  {
    icon: mdiHospitalBox,
    text: 'Specialities',
    route: '/dashboard/specialities'
  },
  {
    icon: mdiCity,
    text: 'Cities',
    route: '/dashboard/cities'
  },
  {
    divider: true
  },
  {
    icon: mdiAccount,
    text: 'Positions',
    route: '/dashboard/positions'
  },
  {
    icon: mdiBookEducation,
    text: 'Universities',
    route: '/dashboard/universities'
  },
  {
    icon: mdiFlag,
    text: 'Countries',
    route: '/dashboard/countries'
  }
]
function logout() {
  Api.logout()
    .then(() => userStore.logout())
    .then(() => router.push('/login'))
}

</script>

<style scoped>

</style>

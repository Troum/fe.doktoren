<template>
  <v-container class="fill-height" fluid>
    <v-row class="fill-height d-flex align-center">
      <v-col class="mx-auto" cols="10" lg="4">
        <Form
          :validation-schema="loginSchema"
          @submit="onSubmit">
          <v-card :min-height="250" class="px-3 py-6">
            <v-card-title class="d-flex align-center justify-center mb-6">
              <v-img :max-width="$vuetify.display.xl ? 240 : 140"
                     alt="Logo" src="@/assets/logo.png"/>
            </v-card-title>
            <v-card-text>
              <Field v-slot="{ field, errors }" name="email">
                <v-text-field :error-messages="errors"
                              autocomplete="off"
                              class="mb-4"
                              label="Enter your login"
                              placeholder="Login"
                              type="email"
                              v-bind="field"
                              variant="outlined"></v-text-field>
              </Field>
              <Field v-slot="{ field, errors }" name="password">
                <v-text-field :error-messages="errors"
                              label="Enter your password"
                              placeholder="Password"
                              type="password"
                              v-bind="field"
                              variant="outlined"></v-text-field>
              </Field>
            </v-card-text>
            <v-card-actions class="d-flex align-center justify-center flex-column">
              <v-btn :min-width="$vuetify.display.width * 0.1"
                     class="mb-4" color="primary"
                     type="submit"
                     variant="tonal">Login
              </v-btn>
              <small class="text-grey-darken-4">Forgot your password?&nbsp;</small>
              <RouterLink class="text-grey-darken-4 text-decoration-underline" to="/forgot">
                <small>Reset your password here</small>
              </RouterLink>
            </v-card-actions>
          </v-card>
        </Form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import {useCookies} from "vue3-cookies";
import {Field, Form} from 'vee-validate'
import {RouterLink, useRouter} from 'vue-router'
import {LoginSchema} from "@/schemas/user/login.schema";
import Api from '@/classes/api'

const router = useRouter()
const {cookies} = useCookies()
const loginSchema = LoginSchema

function onSubmit(values) {
  Api.login(values)
    .then(response => {
      cookies.set('auth', response.data.credentials)
    })
    .then(() => {
      router.push('/dashboard')
    })
}
</script>

<style scoped>

</style>

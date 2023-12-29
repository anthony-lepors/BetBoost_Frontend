<script setup>
// import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import logo from '@images/logo.svg?raw'
import { ref } from 'vue'

import { useAuthStore } from '@/store/auth';
const authStore = useAuthStore();

const form = ref({
  email: '',
  password: '',
//   remember: false,
})

const isPasswordVisible = ref(false)
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <div
              class="d-flex text-primary"
              v-html="logo"
            />
          </div>
        </template>

        <router-link :to="{ name: 'Home' }">
          <VCardTitle class="text-2xl font-weight-bold">
            BetBoost
          </VCardTitle>
        </router-link>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 mb-1">
          Bienvenue sur BetBoost 👋🏻
        </h5>
        <p class="mb-0">
          Connectez-vous pour suivre les paris boostés !
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="authStore.handleLogin(form)">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                autofocus
                placeholder="betboost@email.com"
                label="Email"
                type="email"
                :error-messages="authStore.errors.email"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                label="Mot de passe"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                :error-messages="authStore.errors.password"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />

              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                <!-- <VCheckbox
                  v-model="form.remember"
                  label="Remember me"
                /> -->

                <RouterLink
                  class="text-primary ms-2 mb-1"
                  :to="{ name: 'ForgotPassword' }"
                >
                  Mot de passe oublié ?
                </RouterLink>
              </div>

              <!-- login button -->
              <VBtn
                block
                type="submit"
              >
                Se connecter
              </VBtn>
            </VCol>

            <!-- create account -->
            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>Nouveau chez BetBoost?</span>
              <RouterLink
                class="text-primary ms-2"
                :to="{ name: 'Register' }"
              >
                Créer un compte
              </RouterLink>
            </VCol>

            <!-- auth providers -->

            <!-- <VCol
              cols="12"
              class="d-flex align-center"
            >
              <VDivider />
              <span class="mx-4">or</span>
              <VDivider />
            </VCol>


            <VCol
              cols="12"
              class="text-center"
            >
              <AuthProvider />
            </VCol> -->
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

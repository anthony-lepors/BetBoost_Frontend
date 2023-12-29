<script setup>
import logo from '@images/logo.svg?raw'
import { ref } from 'vue'

import { useAuthStore } from '@/store/auth';
const authStore = useAuthStore();

const form = ref({
  email: '',
})

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
          Mot de passe oublié ?
        </h5>
        <p class="mb-0">
          Renseignez l'email associé à votre compte pour recevoir un lien de réinitialisation par mail.
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="authStore.handleForgotPassword(form.email)">
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
                :messages="authStore.status || ''"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <!-- login button -->
              <VBtn
                block
                type="submit"
              >
                Recevoir un mail de réinitialisation
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

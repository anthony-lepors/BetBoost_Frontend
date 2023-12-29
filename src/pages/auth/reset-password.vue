<script setup>
import logo from '@images/logo.svg?raw'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

import { useAuthStore } from '@/store/auth';
const authStore = useAuthStore();

const form = ref({
  password: '',
  password_confirmation: '',
  email: route.query.email,
  token: route.params.token,
})

const isPasswordVisible = ref(false)
const isPasswordConfirmationVisible = ref(false)

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
          Réinitialisation du mot de passe
        </h5>
        <p class="mb-0">
          Choisissez un nouveau mot de passe.
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="authStore.handleResetPassword(form)">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                label="Nouveau mot de passe"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                :error-messages="authStore.errors.password"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />
            </VCol>

            <VCol cols="12">
              <VTextField
                v-model="form.password_confirmation"
                label="Confirmation mot de passe"
                placeholder="············"
                :type="isPasswordConfirmationVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordConfirmationVisible ? 'bx-hide' : 'bx-show'"
                :error-messages="authStore.errors.email"
                @click:append-inner="isPasswordConfirmationVisible = !isPasswordConfirmationVisible"
                :messages="authStore.status || ''"
              />
            </VCol>

            <VCol cols="12">
              <!-- Reset button -->
              <VBtn
                block
                type="submit"
              >
                Réinitialisation du mot de passe
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

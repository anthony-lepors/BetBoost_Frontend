<script setup>
// import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import logo from '@images/logo.svg?raw'

import { ref } from 'vue'
import { useAuthStore } from '@/store/auth';

const authStore = useAuthStore();

const form = ref({
  username: '',
  email: '',
  password: '',
  privacyPolicies: true,
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

        <router-link to="/">
            <VCardTitle class="text-2xl font-weight-bold">
                BetBoost
            </VCardTitle>
        </router-link>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 mb-1">
          Bienvenue sur BetBoost 🚀
        </h5>
        <p class="mb-0">
          Rejoins l'aventure des cotes boostées !
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="authStore.handleRegister(form)">
          <VRow>
            <!-- Username -->
            <VCol cols="12">
              <VTextField
                v-model="form.username"
                autofocus
                label="Identifiant"
                placeholder="BetBoost"
                :error-messages="authStore.errors.name"
              />
            </VCol>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                label="Email"
                placeholder="betboost@email.com"
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
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
                :error-messages="authStore.errors.password"
              />
              <div class="d-flex align-center mt-1 mb-4">
                <VCheckbox
                  id="privacy-policy"
                  v-model="form.privacyPolicies"
                  inline
                />
                <VLabel
                  for="privacy-policy"
                  style="opacity: 1;"
                >
                  <span class="me-1">J'accepte la </span>
                  <a
                    href="https://mybetboost.com/politique-confidentialite/"
                    class="text-primary"
                  >Politique de Confidentialité</a>
                </VLabel>
              </div>

              <VBtn
                block
                type="submit"
                :disabled="!form.privacyPolicies"
              >
                S'inscrire
              </VBtn>
            </VCol>

            <!-- login instead -->
            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>Vous avez déjà un compte ?</span>
              <RouterLink
                class="text-primary ms-2"
                :to="{ name: 'Login' }"
              >
                Se connecter
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

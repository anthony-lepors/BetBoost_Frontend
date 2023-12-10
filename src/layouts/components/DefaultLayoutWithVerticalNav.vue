<script setup>
import { useTheme } from 'vuetify'
import { onBeforeMount } from 'vue'
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'
import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'

// Components
import Footer from '@/layouts/components/Footer.vue'
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'

// Logo
import UbuntuLogo from '@/assets/images/icons/logo/ubuntu.png'

const vuetifyTheme = useTheme()

import { useAuthStore } from '@/store/auth';
const authStore = useAuthStore();

onBeforeMount(async () => {
  // Charger l'utilisateur lors du montage de la page
  await authStore.getUser();
});

</script>

<template>
  <VerticalNavLayout>
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <!-- 👉 Vertical nav toggle in overlay mode -->
        <VBtn
          class="ms-n3 d-lg-none"
          @click="toggleVerticalOverlayNavActive(true)"
          size="small" icon=true color="default" variant="text"
        >
          <!-- <VIcon icon="bx-menu" /> -->
          <VIcon icon="mdi-menu" />
        </VBtn>

        <!-- 👉 Search -->
        <!-- <div
          class="d-flex align-center cursor-pointer"
          style="user-select: none;"
        > -->
          <!-- 👉 Search Trigger button -->
          <!-- <VBtn>
            <VIcon icon="bx-search" />
          </VBtn>

          <span class="d-none d-md-flex align-center text-disabled">
            <span class="me-3">Search</span>
            <span class="meta-key">&#8984;K</span>
          </span>
        </div> -->

        <VSpacer />

        <VBtn
          class="me-2"
          href="https://mybetboost.com/go/twitter/"
          target="_blank"
          rel="noopener noreferrer"
          size="small" icon=true color="default" variant="text"
        >
          <VIcon icon="bxl-twitter" />
        </VBtn>

        <VBtn
          class="me-2"
          href="https://mybetboost.com/go/discord/"
          target="_blank"
          rel="noopener noreferrer"
          size="small" icon=true color="default" variant="text"
        >
          <VIcon icon="bxl-discord-alt" />
        </VBtn>

        <VBtn
          class="me-2"
          href="https://mybetboost.com/go/telegram/"
          target="_blank"
          rel="noopener noreferrer"
          size="small" icon=true color="default" variant="text"
        >
        <VIcon icon="bxl-telegram" />
        </VBtn>

        <VBtn class="me-2" size="small" icon=true color="default" variant="text">
          <VIcon icon="bx-bell" />
        </VBtn>

        <NavbarThemeSwitcher class="me-2" />

        <UserProfile />
      </div>
    </template>

    <template #vertical-nav-content>
      <VerticalNavLink
        :item="{
          title: 'Accueil',
          icon: 'bxs-home',
          to: '/',
        }"
      />

      <!-- 👉 Pages -->
      <VerticalNavSectionTitle
        :item="{
          heading: 'Bookmakers',
        }"
      />

      <VerticalNavLink
        :item="{
          title: 'Winamax',
          icon: 'mdi-alpha-w-circle',
          // img: '/src/assets/images/icons/logo/ubuntu.png',
          to: '/winamax',
        }"
      />

      <VerticalNavLink
        :item="{
          title: 'Betclic',
          icon: 'mdi-alpha-b-circle',
          to: '/betclic',
        }"
      />

      <VerticalNavLink
        :item="{
          title: 'Unibet',
          icon: 'mdi-alpha-u-circle',
          to: '/unibet',
        }"
      />

      <VerticalNavLink
        :item="{
          title: 'Parions Sport en Ligne',
          icon: 'mdi-alpha-f-circle',
          // img: '/src/assets/images/icons/logo/ubuntu.png',
          to: '/parions-sport-en-ligne',
        }"
      />

      <VerticalNavLink
        :item="{
          title: 'ZeBet',
          icon: 'mdi-alpha-z-circle',
          // img: '/src/assets/images/icons/logo/ubuntu.png',
          to: '/zebet',
        }"
      />

      <VerticalNavLink
        :item="{
          title: 'PMU',
          icon: 'mdi-alpha-p-circle',
          // img: '/src/assets/images/icons/logo/ubuntu.png',
          to: '/pmu',
        }"
      />

      <!-- 👉 User Interface -->
      <VerticalNavSectionTitle
        :item="{
          heading: 'Compte',
        }"
      />
      <VerticalNavLink v-if="authStore.user"
        :item="{
          title: 'Profil',
          icon: 'mdi-account-cog-outline',
          to: '/account',
        }"
      />
      <VerticalNavLink v-if="authStore.user"
        :item="{
          title: 'Se déconnecter',
          icon: 'bx-log-out',
        }"
        @action="authStore.handleLogout()"
      />
      <VerticalNavLink v-if="!authStore.user"
        :item="{
          title: 'Se connecter',
          icon: 'bx-log-in',
          to: '/login',
        }"
      />
      <VerticalNavLink v-if="!authStore.user"
        :item="{
          title: 'Créer un compte',
          icon: 'mdi-account-plus',
          to: '/register',
        }"
      />
    </template>
    <!-- 👉 Pages -->
    <slot />

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>
  </VerticalNavLayout>
</template>

<style lang="scss" scoped>
.meta-key {
  border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 6px;
  block-size: 1.5625rem;
  line-height: 1.3125rem;
  padding-block: 0.125rem;
  padding-inline: 0.25rem;
}
</style>

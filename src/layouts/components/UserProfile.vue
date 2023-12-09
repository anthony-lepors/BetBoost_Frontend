<script setup>
import avatar1 from '@images/avatars/avatar-01.jpg'

import { useAuthStore } from '@/store/auth';
const authStore = useAuthStore();

const faqLink = 'https://mybetboost.com/faq';

const redirectToExternalSite = (link) => {
  // Ouvrir le lien dans un nouvel onglet
  window.open(link, '_blank');
};

</script>

<template>
  <VBadge
    dot
    location="bottom right"
    offset-x="3"
    offset-y="3"
    color="success"
    bordered
  >
    <VAvatar
      class="cursor-pointer"
      color="primary"
      variant="tonal"
    >
      <VImg :src="avatar1" />

      <!-- SECTION Menu -->
      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="14px"
      >
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem v-if="authStore.user">
            <template #prepend>
              <VListItemAction start>
                <VBadge
                  dot
                  location="bottom right"
                  offset-x="3"
                  offset-y="3"
                  color="success"
                >
                  <VAvatar
                    color="primary"
                    variant="tonal"
                  >
                    <VImg :src="avatar1" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold">
              {{authStore.user.name}}
            </VListItemTitle>

            <VListItemSubtitle v-if="authStore.user.type === 'user'">
              Utilisateur
            </VListItemSubtitle>
            <VListItemSubtitle v-else-if="authStore.user.type === 'admin'">
              Admin
            </VListItemSubtitle>
          </VListItem>
          <VDivider v-if="authStore.user" class="my-2" />

          <!-- 👉 Login -->
          <VListItem v-if="!authStore.user" to="/login">
            <template #prepend>
              <VIcon
                class="me-2"
                icon="bx-log-in"
                size="22"
              />
            </template>

            <VListItemTitle>Se connecter</VListItemTitle>
          </VListItem>

          <!-- 👉 Register -->
          <VListItem v-if="!authStore.user" to="/register">
            <template #prepend>
              <VIcon
                class="me-2"
                icon="mdi-account-plus"
                size="22"
              />
            </template>

            <VListItemTitle>Créer un compte</VListItemTitle>
          </VListItem>

          <!-- 👉 Profile -->
          <VListItem v-if="authStore.user" to="/account">
            <template #prepend>
              <VIcon
                class="me-2"
                icon="bx-user"
                size="22"
              />
            </template>

            <VListItemTitle>Profil</VListItemTitle>
          </VListItem>

          <!-- 👉 Settings -->
          <!-- <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="bx-cog"
                size="22"
              />
            </template>

            <VListItemTitle>Settings</VListItemTitle>
          </VListItem> -->

          <!-- 👉 Pricing -->
          <!-- <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="bx-dollar"
                size="22"
              />
            </template>

            <VListItemTitle>Pricing</VListItemTitle>
          </VListItem> -->

          <!-- 👉 FAQ -->
          <VListItem @click="redirectToExternalSite(faqLink)">
            <template #prepend>
              <VIcon
                class="me-2"
                icon="bx-help-circle"
                size="22"
              />
            </template>

            <VListItemTitle>FAQ</VListItemTitle>
          </VListItem>

          <!-- Divider -->
          <VDivider v-if="authStore.user" class="my-2" />

          <!-- 👉 Logout -->
          <VListItem v-if="authStore.user" @click="authStore.handleLogout">
            <template #prepend>
              <VIcon
                class="me-2"
                icon="bx-log-out"
                size="22"
              />
            </template>

            <VListItemTitle>Se déconnecter</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth';
const authStore = useAuthStore();

const isCurrentPasswordVisible = ref(false)
const isNewPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const isUpdatingPassword = ref(false)

const passwordRequirements = [
  'Minimum 8 caractères',
]

const updatePassword = async () => {
  isUpdatingPassword.value = true;
  await authStore.handlePasswordUpdate({
    current_password: currentPassword.value,
    password: newPassword.value,
    password_confirmation: confirmPassword.value,
  });
  isUpdatingPassword.value = false;
}

</script>

<template>
  <VRow>
    <!-- SECTION: Change Password -->
    <VCol cols="12">
      <VCard title="Changer de mot de passe">
        <VForm>
          <VCardText>
            <!-- 👉 Current Password -->
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <!-- 👉 current password -->
                <VTextField
                  v-model="currentPassword"
                  :type="isCurrentPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isCurrentPasswordVisible ? 'bx-hide' : 'bx-show'"
                  label="Mot de passe actuel"
                  placeholder="············"
                  :error-messages="authStore.errors.current_password"
                  :messages="authStore.status || ''"
                  @click:append-inner="isCurrentPasswordVisible = !isCurrentPasswordVisible"
                />
              </VCol>
            </VRow>

            <!-- 👉 New Password -->
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <!-- 👉 new password -->
                <VTextField
                  v-model="newPassword"
                  :type="isNewPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isNewPasswordVisible ? 'bx-hide' : 'bx-show'"
                  label="Nouveau mot de passe"
                  placeholder="············"
                  :error-messages="authStore.errors.password"
                  @click:append-inner="isNewPasswordVisible = !isNewPasswordVisible"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <!-- 👉 confirm password -->
                <VTextField
                  v-model="confirmPassword"
                  :type="isConfirmPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isConfirmPasswordVisible ? 'bx-hide' : 'bx-show'"
                  label="Confirmation du mot de passe"
                  placeholder="············"
                  @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
                />
              </VCol>
            </VRow>
          </VCardText>

          <!-- 👉 Password Requirements -->
          <VCardText>
            <p class="text-base font-weight-medium mt-2">
              Exigences du de mot de passe:
            </p>

            <ul class="d-flex flex-column gap-y-3">
              <li
                v-for="item in passwordRequirements"
                :key="item"
                class="d-flex"
              >
                <div>
                  <VIcon
                    size="7"
                    icon="bxs-circle"
                    class="me-3"
                  />
                </div>
                <span class="font-weight-medium">{{ item }}</span>
              </li>
            </ul>
          </VCardText>

          <!-- 👉 Action Buttons -->
          <VCardText class="d-flex flex-wrap gap-4">
            <VBtn
              color="primary"
              @click="updatePassword"
              :loading="isUpdatingPassword"
            >
              Sauvegarder les modifications
            </VBtn>

            <VBtn
              type="reset"
              color="on-background"
              variant="tonal"
            >
              Annuler
            </VBtn>
          </VCardText>
        </VForm>
      </VCard>
    </VCol>
    <!-- !SECTION -->

  </VRow>
</template>

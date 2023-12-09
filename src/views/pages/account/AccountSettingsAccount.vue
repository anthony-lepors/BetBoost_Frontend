<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth';
const authStore = useAuthStore();

const accountData = ref({
  name: authStore.user.name,
  email: authStore.user.email,
});

const isAccountDeactivated = ref(false)
const isCurrentPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
const currentPassword = ref('')
const confirmPassword = ref('')

const isProfileUpdating = ref(false);
const isDeletingAccount = ref(false);

const updateProfile = async () => {
  isProfileUpdating.value = true;
  await authStore.handleProfileUpdate(accountData.value);
  isProfileUpdating.value = false;
}

const resetForm = () => {
  accountData.value.name = authStore.user.name;
  accountData.value.email = authStore.user.email;
}

const deleteAccount = async () => {
  isDeletingAccount.value = true;
  await authStore.handleProfileDelete({
    password: currentPassword.value,
    password_confirmation: confirmPassword.value,
  });
  isDeletingAccount.value = false;
}

</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Détails du compte">

        <VDivider />

        <VCardText>
          <!-- 👉 Form -->
          <VForm class="mt-6">
            <VRow>
              <!-- 👉 First Name -->
              <VCol
                md="6"
                cols="12"
              >
                <VTextField
                  v-model="accountData.name"
                  placeholder="BetBoost"
                  label="Identifiant"
                />
              </VCol>

              <!-- 👉 Email -->
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="accountData.email"
                  label="E-mail"
                  placeholder="betboost@email.com"
                  type="email"
                />
              </VCol>

              <!-- 👉 Form Actions -->
              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn
                  color="primary"
                  @click="updateProfile"
                  :loading="isProfileUpdating"
                >
                  Sauvegarder les modifications
                </VBtn>

                <VBtn
                  color="on-background"
                  variant="tonal"
                  type="reset"
                  @click.prevent="resetForm"
                  :disabled="isProfileUpdating"
                >
                  Annuler
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12">
      <!-- 👉 Deactivate Account -->
      <VCard title="Suppression du compte">
        <VCardText>
          <div>
            <VCheckbox
              v-model="isAccountDeactivated"
              label="Je confirme vouloir supprimer mon compte. Cette action est irréversible."
            />
          </div>

        </VCardText>

        <VCardText v-if="isAccountDeactivated">
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
                :error-messages="authStore.errors.password"
                @click:append-inner="isCurrentPasswordVisible = !isCurrentPasswordVisible"
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

        <VCardText>
          <VBtn
            :disabled="!isAccountDeactivated"
            color="error"
            class="mt-3"
            @click="deleteAccount"
            :loading="isDeletingAccount"
          >
            Suppression du compte
          </VBtn>
        </VCardText>       
        
      </VCard>
    </VCol>
  </VRow>
</template>

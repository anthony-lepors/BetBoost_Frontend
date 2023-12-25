<script setup>
import { ref, watch } from 'vue';

const props = defineProps([
        'bet',
        'sport',
        'match',
        'competition',
        'status',
        'bookmaker',
        'minBoostedOdd',
        'maxBoostedOdd',
        'minInitialOdd',
        'maxInitialOdd',
        'minAmount',
        'maxAmount',
        'startDate',
        'endDate',
        'editBookmaker',
        'editAmount',
    ]);

const emit = defineEmits();

const bet = ref(props.bet);
const sport = ref(props.sport);
const match = ref(props.match);
const competition = ref(props.competition);
const status = ref(props.status);
const bookmaker = ref(props.bookmaker);
const minBoostedOdd = ref(props.minBoostedOdd);
const maxBoostedOdd = ref(props.maxBoostedOdd);
const minInitialOdd = ref(props.minInitialOdd);
const maxInitialOdd = ref(props.maxInitialOdd);
const minAmount = ref(props.minAmount);
const maxAmount = ref(props.maxAmount);
const startDate = ref(props.startDate);
const endDate = ref(props.endDate);

const filterDialog = ref(false);
const isLoading = ref(false);

const openFilterDialog = () => {
  filterDialog.value = true;
};

const closeFilterDialog = () => {
  filterDialog.value = false;
};

const resetForm = () => {
    bet.value = '';
    sport.value = '';
    match.value = '';
    competition.value = '';
    status.value = '';
    bookmaker.value = '';
    minBoostedOdd.value = '';
    maxBoostedOdd.value = '';
    minInitialOdd.value = '';
    maxInitialOdd.value = '';
    minAmount.value = '';
    maxAmount.value = '';
    startDate.value = '';
    endDate.value = '';

    // Mise à jour de bookmaker seulement si editBookmaker est true
    if (props.editBookmaker) {
        bookmaker.value = '';
    }

    // Mise à jour de minAmount et maxAmount seulement si editAmount est true
    if (props.editAmount) {
        minAmount.value = '';
        maxAmount.value = '';
    }
}

const updateBet = () => {
    isLoading.value = true;
    const updatedData = {
        bet: bet.value,
        sport: sport.value,
        match: match.value,
        competition: competition.value,
        status: status.value,
        minBoostedOdd: minBoostedOdd.value,
        maxBoostedOdd: maxBoostedOdd.value,
        minInitialOdd: minInitialOdd.value,
        maxInitialOdd: maxInitialOdd.value,
        startDate: startDate.value,
        endDate: endDate.value,
    };

    // Mise à jour de bookmaker seulement si editBookmaker est true
    if (props.editBookmaker) {
        updatedData.bookmaker = bookmaker.value;
    }

    // Mise à jour de minAmount et maxAmount seulement si editAmount est true
    if (props.editAmount) {
        updatedData.minAmount = minAmount.value;
        updatedData.maxAmount = maxAmount.value;
    }

    emit('update', updatedData);
    isLoading.value = false;
};

const updateValuesFromParent = () => {
    bet.value = props.bet;
    sport.value = props.sport;
    match.value = props.match;
    competition.value = props.competition;
    status.value = props.status;
    bookmaker.value = props.bookmaker;
    minBoostedOdd.value = props.minBoostedOdd;
    maxBoostedOdd.value = props.maxBoostedOdd;
    minInitialOdd.value = props.minInitialOdd;
    maxInitialOdd.value = props.maxInitialOdd;
    minAmount.value = props.minAmount;
    maxAmount.value = props.maxAmount;
    startDate.value = props.startDate;
    endDate.value = props.endDate;
};

// Mettre à jour les valeurs lorsqu'il y a des changements dans les props
watch(props, () => {
    updateValuesFromParent();
});

const sports = [
  'Football',
  'Basket',
  'Rugby',
  'Tennis',
  'Hockey',
  'Baseball',
  'Volleyball',
  // Ajoutez d'autres sports au besoin
];

</script>

<template>
  <VForm @submit.prevent="updateBet">
    <VRow>

        <VCol cols="12" md="3">
            <v-combobox
            v-model="sport"
            label="Sport"
            type="string"
            placeholder="Football"
            :items="sports"
            clearable
            />
        </VCol>

        <VCol cols="12" md="3">
            <VTextField
                v-model="bet"
                label="Pari"
                type="string"
                placeholder="Marseille ou nul"
            />
        </VCol>

        <VCol cols="12" md="3">
            <VTextField
            v-model="maxBoostedOdd"
            label="Cote boostée max"
            type="number"
            placeholder="2.5"
        />
        </VCol>

        <VCol cols="12" md="3">
            <VTextField
            v-model="startDate"
            label="Date de début"
            type="date"
        />
        </VCol>

        <VDialog v-model="filterDialog" max-width="500">
            <VCard>
                <VCardTitle>Filtres avancés</VCardTitle>
                <VCardText>
                    <VForm @submit.prevent="updateBet">
                        <VRow>
                            <VCol cols="12" md="6">
                                <VTextField
                                    v-model="bet"
                                    label="Paris"
                                    type="string"
                                    placeholder="Marseille ou nul"
                                />
                            </VCol>

                            <VCol cols="12" md="6">
                                <v-combobox
                                v-model="sport"
                                label="Sport"
                                type="string"
                                placeholder="Football"
                                :items="sports"
                                clearable
                                />
                            </VCol>

                            <VCol cols="12" md="6">
                                <VTextField
                                v-model="match"
                                label="Match"
                                type="string"
                                placeholder="Marseille - PSG"
                            />
                            </VCol>

                            <VCol cols="12" md="6">
                                <VTextField
                                v-model="competition"
                                label="Compétition"
                                type="string"
                                placeholder="Ligue 1"
                            />
                            </VCol>

                            <VCol cols="12" md="6">
                                <VTextField
                                v-model="status"
                                label="Statut"
                                type="string"
                                placeholder="Gagné"
                            />
                            </VCol>

                            <VCol cols="12" md="6" v-if="editBookmaker">
                                <VTextField
                                v-model="bookmaker"
                                label="Bookmaker"
                                type="string"
                                placeholder="Winamax"
                            />
                            </VCol>

                            <VCol cols="12" md="6">
                                <VTextField
                                v-model="minBoostedOdd"
                                label="Cote boostée min"
                                type="number"
                                placeholder="1.5"
                            />
                            </VCol>

                            <VCol cols="12" md="6">
                                <VTextField
                                v-model="maxBoostedOdd"
                                label="Cote boostée max"
                                type="number"
                                placeholder="2.5"
                            />
                            </VCol>

                            <VCol cols="12" md="6">
                                <VTextField
                                v-model="minInitialOdd"
                                label="Cote initiale min"
                                type="number"
                                placeholder="1.5"
                            />
                            </VCol>

                            <VCol cols="12" md="6">
                                <VTextField
                                v-model="maxInitialOdd"
                                label="Cote initiale max"
                                type="number"
                                placeholder="2"
                            />
                            </VCol>

                            <VCol cols="12" md="6" v-if="editAmount">
                                <VTextField
                                v-model="minAmount"
                                label="Mise min"
                                type="number"
                                placeholder="10"
                            />
                            </VCol>

                            <VCol cols="12" md="6" v-if="editAmount">
                                <VTextField
                                v-model="maxAmount"
                                label="Mise max"
                                type="number"
                                placeholder="50"
                            />
                            </VCol>

                            <VCol cols="12" md="6">
                                <VTextField
                                v-model="startDate"
                                label="Date de début"
                                type="date"
                            />
                            </VCol>

                            <VCol cols="12" md="6">
                                <VTextField
                                v-model="endDate"
                                label="Date de fin"
                                type="date"
                            />
                            </VCol>

                            <VCol
                                cols="12"
                                class="d-flex gap-4"
                            >

                                <VBtn type="submit" :loading="isLoading">
                                    Chercher
                                </VBtn>
                            </VCol>
                        </VRow>
                    </VForm>
                </VCardText>

                <VCardActions>
                    <VBtn @click="closeFilterDialog">Fermer</VBtn>
                </VCardActions>
            </VCard>
        </VDialog>

        <VCol
            cols="12"
            class="d-flex flex-wrap gap-4"
        >
            <VBtn
                color="secondary"
                @click="openFilterDialog"
            >
                Filtres avancés
            </VBtn>

            <VBtn
                :loading="isLoading"
                type="submit"
                >
                Chercher
            </VBtn>

            <VBtn
                type="reset"
                color="on-background"
                variant="tonal"
                @click.prevent="resetForm"
                :disabled="isLoading"
            >
                Réinitialiser
            </VBtn>
        </VCol>
    </VRow>
  </VForm>
</template>

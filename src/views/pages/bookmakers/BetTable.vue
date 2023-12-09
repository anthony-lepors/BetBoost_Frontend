<script setup>
    import { ref, computed, onMounted } from 'vue';
    import { loadItems, newBet, editBet, deleteBet, loadStats } from '@/services/betFunctions';

    import { useAuthStore } from '@/store/auth';
    const authStore = useAuthStore();

    // Transforme tous les props en string ci-dessous
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
    ]);

    const emit = defineEmits();

    const itemsPerPage = ref(10); // Nombre d'éléments par page

    const betState = ref({
        isLoading: true,
        betList: [],
        betLastParams: null,
        betTotalNumber: 0,
        betErrors: {
            get: [],
            post: [],
            edit: [],
            delete: [],
        },
    });

    const betStats = ref({
        isLoading: true,
        data: {
            bankroll: [],
            date: [],
            totalBets: 0,
            roi: 0,
            boostAverage: 0,
            lastWeekBets: 0,
            lastWeekProfit: 0,
            lastWeekRoi: 0,
            lastWeekBoost: 0,
        },
        betErrors: {
            get: [],
        },
    });

    const isMobile = ref(window.innerWidth <= 600); // Ajoutez votre propre valeur de seuil pour déterminer ce qui est considéré comme "mobile"

    // Mettez à jour la variable isMobile lorsque la fenêtre est redimensionnée
    onMounted(() => {
        window.addEventListener('resize', () => {
            isMobile.value = window.innerWidth <= 600; // Mettez à jour la largeur de la fenêtre
        });
    });

    const dynamicHeaders = computed(() => {
        const baseHeaders = [
            { title: 'Date', key: 'date_event'},
            { title: 'Match', key: 'match', sortable : false},
            { title: 'Pari', key: 'bet', sortable : false},
            { title: 'Cote initiale', key: 'odd_initial'},
            { title: 'Cote boostée', key: 'odd_boost'},
            { title: 'Mise', key: 'bet_amount'},
            { title: 'Profit', key: 'profit'},
        ];

        // Ajoutez l'en-tête 'Bookmaker' si possibilite de modifier le bookmaker
        const bookmakerHeader = { title: 'Bookmaker', key: 'bookmaker' };
        if (props.editBookmaker) {
            baseHeaders.splice(1, 0, bookmakerHeader);
        }

        // Retirez les colonnes indésirables sur mobile
        if (isMobile.value) {
            const unwantedHeaders = ['Date', 'Match', 'Cote initiale', 'Mise'];
            for (const header of unwantedHeaders) {
                const index = baseHeaders.findIndex(item => item.title === header);
                if (index !== -1) {
                    baseHeaders.splice(index, 1);
                }
            }
        }

        return baseHeaders;
    });

    // ----- START OF FAKE DATA -----
    // Il faudra commenter combinedSearch et refreshData

    // Fonction pour générer une date aléatoire dans l'intervalle spécifié
    // function randomDate(start, end) {
    //     return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    // }

    // const fakeData = Array.from({ length: 10 }, (_, index) => ({
    //     id: index + 1,
    //     competition: `La Grosse Cote Boostée Match ${index + 1}`,
    //     match: `Équipe A - Équipe B ${index + 1}`,
    //     date_event: randomDate(new Date(2023, 0, 1), new Date()).toISOString(),
    //     bookmaker: `Bookmaker ${index + 1}`,
    //     bet: `Pari ${index + 1}`,
    //     sport: `Sport ${index + 1}`,
    //     competition: `Compétition ${index + 1}`,
    //     date_validity: randomDate(new Date(), new Date(2024, 0, 1)).toISOString(),
    //     status: index % 2 === 0 ? 'Won' : 'Lost',  // Statut alternatif entre 'Won' et 'Lost'
    //     odd_initial: Math.random() * 10 + 1,  // Valeur aléatoire entre 1 et 11
    //     odd_boost: Math.random() * 5 + 1,  // Valeur aléatoire entre 1 et 6
    //     bet_amount: Math.floor(Math.random() * 100) + 1,  // Valeur aléatoire entre 1 et 100
    //     profit: Math.floor(Math.random() * 100) - 50,  // Valeur aléatoire entre -50 et 50    
    // }));

    // betState.value.betList = fakeData;  // Initialisez betList avec les données fictives
    // betState.value.betTotalNumber = fakeData.length;
    // betState.value.isLoading = false;
    // ----- END OF FAKE DATA -----

    // Propriété calculée pour combiner les champs de recherche en une seule chaîne de caractères
    const combinedSearch = computed(() => {
        const propValues = Object.values(props);    
        return propValues.join(' ');
    });

    const refreshData = async (options) => {
        // Add props element to data table options
        options.bet = props.bet;
        options.sport = props.sport;
        options.match = props.match;
        options.competition = props.competition;
        options.status = props.status;
        options.bookmaker = props.bookmaker;
        options.minBoostedOdd = props.minBoostedOdd;
        options.maxBoostedOdd = props.maxBoostedOdd;
        options.minInitialOdd = props.minInitialOdd;
        options.maxInitialOdd = props.maxInitialOdd;
        options.minAmount = props.minAmount;
        options.maxAmount = props.maxAmount;
        options.startDate = props.startDate;
        options.endDate = props.endDate;

        await loadItems(options, betState.value);
        await loadStats(options, betStats.value);
        emit('updateStats', betStats.value);
    };

    function getColor (value) {
        if (value > 0) return 'green'
        else if (value < 0) return 'red'
        else return 'grey'
    }

    const defaultItem = {
        date_event: '',
        bookmaker: '',
        bet: '',
        sport: '',
        competition: '',
        match: '',
        date_validity: '',
        status: '',
        odd_initial: 0,
        odd_boost: 0,
        bet_amount: 0,
    };

    const editedIndex = ref(-1);
    const originalItem = ref(null);
    const editedItem = ref({
        defaultItem,
    });

    const formTitle = computed(() => {
        return editedIndex.value === -1 ? 'Nouveau Pari' : 'Editer Pari';
    });

    const dialog = ref(false);
    const dialogDelete = ref(false);

    const editItem = (item) => {
        originalItem.value = item;
        editedIndex.value = betState.value.betList.indexOf(item);
        editedItem.value = { ...originalItem.value };
        dialog.value = true;
    };

    const deleteItem = (item) => {
        editedIndex.value = betState.value.betList.indexOf(item);
        editedItem.value = { ...item };
        dialogDelete.value = true;
    };

    const deleteItemConfirm = () => {
        deleteBet(editedItem._rawValue, betState.value);
        closeDelete();
    };

    const close = () => {
        dialog.value = false;
        resetEditedItem();
    };

    const closeDelete = () => {
        dialogDelete.value = false;
        resetEditedItem();
    };

    const resetEditedItem = () => {
        editedItem.value = { ...defaultItem };
        editedIndex.value = -1;
    };

    const save = () => {
        if (editedIndex.value > -1) {
            // Mise à jour d'un pari existant
            editBet(editedItem._rawValue, betState.value);
        } else {
            // Ajout d'un nouveau pari
            newBet(editedItem._rawValue, betState.value);
        }
        close();
    };
</script>

<template>
    <div v-if="betState.betList">
        <v-data-table-server
            v-bind:items-per-page="itemsPerPage"
            :headers="dynamicHeaders"
            :items-length="betState.betTotalNumber"
            :items="betState.betList"
            :loading="betState.isLoading"
            :search="combinedSearch"
            :show-expand="authStore.user?.type == 'admin'"
            density="compact"
            class="elevation-1"
            v-on:update:options="refreshData"
        >

            <template v-slot:top v-if="authStore.user?.type == 'admin'" >
                <v-toolbar
                    flat
                >
                    <v-dialog
                        v-model="dialog"
                        max-width="500px"
                    >
                        <template v-slot:activator="{ props }">
                            <v-btn
                            color="primary"
                            dark
                            class="mb-2"
                            v-bind="props"
                            >
                            Nouveau pari
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col
                                            cols="12"
                                            sm="6"
                                            md="4"
                                        >
                                            <v-text-field
                                            v-model="editedItem.date_event"
                                            label="Date de l'événement"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            sm="6"
                                            md="4"
                                        >
                                            <v-text-field
                                            v-model="editedItem.bookmaker"
                                            label="Bookmaker"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            sm="6"
                                            md="4"
                                        >
                                            <v-text-field
                                            v-model="editedItem.bet"
                                            label="Pari"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            sm="6"
                                            md="4"
                                        >
                                            <v-text-field
                                            v-model="editedItem.sport"
                                            label="Sport"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            sm="6"
                                            md="4"
                                        >
                                            <v-text-field
                                            v-model="editedItem.competition"
                                            label="Competition"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            sm="6"
                                            md="4"
                                        >
                                            <v-text-field
                                            v-model="editedItem.match"
                                            label="Match"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            sm="6"
                                            md="4"
                                        >
                                            <v-text-field
                                            v-model="editedItem.date_validity"
                                            label="Date de validité"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            sm="6"
                                            md="4"
                                        >
                                            <v-text-field
                                            v-model="editedItem.odd_initial"
                                            label="Cote initiale"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            sm="6"
                                            md="4"
                                        >
                                            <v-text-field
                                            v-model="editedItem.odd_boost"
                                            label="Cote boostée"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            sm="6"
                                            md="4"
                                        >
                                            <v-text-field
                                            v-model="editedItem.bet_amount"
                                            label="Mise"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            sm="6"
                                            md="4"
                                        >
                                            <v-select
                                            v-model="editedItem.status"
                                            label="Statut"
                                            :items="['Won', 'Lost', 'Canceled', 'Pending']"
                                            ></v-select>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="blue-darken-1"
                                    variant="text"
                                    @click="close"
                                >
                                    Cancel
                                </v-btn>
                                <v-btn
                                    color="blue-darken-1"
                                    variant="text"
                                    @click="save"
                                >
                                    Save
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                                <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>

            <template v-if="authStore.user?.type == 'admin'" v-slot:expanded-row="{ columns, item }">
                <div class="d-flex align-center">
                    <v-btn
                        icon
                        @click="editItem(item)"
                        color="primary"
                    >
                        <v-icon size="18">mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn
                        icon
                        @click="deleteItem(item)"
                        color="error"
                    >
                        <v-icon size="18">mdi-delete</v-icon>
                    </v-btn>
                </div>
            </template>

            <template v-slot:item.profit="{ value }">
                <v-chip :color="getColor(value)">
                    {{ value }}
                </v-chip>
            </template>
        </v-data-table-server>
    </div>
</template>
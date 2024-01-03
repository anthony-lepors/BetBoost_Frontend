<script setup>
import { ref, watch, computed, onMounted   } from 'vue';
import { sub, startOfYear, differenceInDays, parseISO } from 'date-fns';

// Components
import CardStatisticsVertical from '@/@core/components/cards/CardStatisticsVertical.vue';
import ApexGraph from '@/@core/components/graphs/ApexGraph.vue';

// Images
import imgBets from '@images/cards/chart-success.png'
import imgProfit from '@images/cards/wallet-info.png'
import imgROI from '@images/cards/investment-info.png'
import imgBoost from '@images/cards/boost-info.png'

const props = defineProps([
    'betStats',
    'title',
    'startDate',
]);

const emit = defineEmits();

// const timeSelection = ref('ytd');
const timeSelection = ref(props.startDate === null ? null : 'ytd');

const timeButtons = [
  { value: 'week', label: '1w' },
  { value: 'month', label: '1m' },
  { value: 'year', label: '1y' },
  { value: 'ytd', label: 'ytd' },
  { value: 'all', label: 'tout' },
];

const updateTime = (selection) => {
    let selectedTime;

    // console.log('selection : ', selection);

    switch (selection) {
        case 'week':
        selectedTime = sub(new Date(), { weeks: 1 });
        break;
        case 'month':
        selectedTime = sub(new Date(), { months: 1 });
        break;
        case 'year':
        selectedTime = sub(new Date(), { years: 1 });
        break;
        case 'ytd':
        selectedTime = startOfYear(new Date());
        break;
        case 'all':
        selectedTime = null; // Pas de valeur
        break;
        default:
        selectedTime = null;
    }

    // Émettez la mise à jour de la prop selectedTime
    emit('update:selectedTime', selectedTime);

    return selectedTime;
};

const determinePeriod = (date) => {
    if (date === null) {
        return 'all';
    }

    if (!(date instanceof Date)) {
        date = parseISO(date);
    }

    const currentDate = new Date();
    const daysDifference = differenceInDays(currentDate, date);
    const dayOfTheYear = differenceInDays(date, startOfYear(date));

    if (daysDifference === 7) {
        return 'week';
    } else if (daysDifference === 31) {
        return 'month';
    } else if (daysDifference === 365) {
        return 'year';
    } else if (daysDifference < 365 && dayOfTheYear === 0) {
        return 'ytd';
    } else {
        return 'null';
    }
};

const startDateFiltered = computed(() => props.startDate);

onMounted(() => {  
    // Utilisez la fonction updateTime pour obtenir la nouvelle valeur de selectedTime
    updateTime(timeSelection.value);
});


// Mise à jour de la prop startDate
watch(startDateFiltered, (nouvelleValeur) => {
    timeSelection.value = determinePeriod(nouvelleValeur);
});

</script>

<template>
    <VRow>
        <!-- GRAPHIQUE -->
        <VCol
            cols="12"
            md="8"
            order="2"
            order-md="1"
        >

            <ApexGraph
                :data="betStats?.data.bankroll"
                :categories="betStats?.data.date"

            />  

            <v-btn-toggle
                v-model="timeSelection"
                rounded="2"
                color="primary"
                group
                >

                <v-btn v-for="button in timeButtons" :value="button.value" @click="updateTime(button.value)">
                    {{ button.label }}
                </v-btn>

            </v-btn-toggle>

        </VCol>

        <!-- STATS -->
        <VCol
            cols="12"
            sm="8"
            md="4"
            order="1"
            order-md="2"
            >
            <VRow>
                <VCol cols="12" class="text-center">
                    <h1 class="text-h1 mt-4 text-subtitle-1"> {{title}} </h1>
                </VCol>
            </VRow>
            <VRow>
                <VCol
                    cols="12"
                    sm="6"
                >
                    <CardStatisticsVertical
                        v-bind="{
                        title: 'Nombre de paris',
                        image: imgBets,
                        stats: betStats?.data.totalBets,
                        change: betStats?.data.lastWeekBets,
                        }"
                    />
                </VCol>

                <VCol
                    cols="12"
                    sm="6"
                >
                    <CardStatisticsVertical
                        v-bind="{
                        title: 'ROI (Retour sur Investissement)',
                        image: imgROI,
                        stats: betStats?.data.roi,
                        change: betStats?.data.lastWeekRoi,
                        unit: '%',
                        }"
                    />
                </VCol>

                <VCol
                    cols="12"
                    sm="6"
                    >
                    <CardStatisticsVertical
                        v-bind="{
                        title: 'Bénéfices',
                        image: imgProfit,
                        stats: betStats?.data.bankroll[betStats?.data.bankroll.length - 1],
                        change: betStats?.data.lastWeekProfit,
                        unit: '€',
                        }"
                    />
                </VCol>

                <VCol
                    cols="12"
                    sm="6"
                    >
                    <CardStatisticsVertical
                        v-bind="{
                        title: 'Boost moyen',
                        image: imgBoost,
                        stats: betStats?.data.boostAverage,
                        change: betStats?.data.lastWeekBoost,
                        unit: '%',
                        }"
                    />
                </VCol>
            </VRow>
        </VCol>
    </VRow>


</template>
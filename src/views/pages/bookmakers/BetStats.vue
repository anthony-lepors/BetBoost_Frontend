<script setup>
// import { ref, watch, computed } from 'vue';

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
]);

</script>

<template>

    <VRow>
        <VCol
            cols="12"
            md="8"
            order="2"
            order-md="1"
        >
        <!-- GRAPHIQUE -->
        <ApexGraph
            :data="betStats?.data.bankroll"
            :categories="betStats?.data.date"

        />  
        </VCol>
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
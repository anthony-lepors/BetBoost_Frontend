<script setup>
    import { ref } from 'vue';
    import { useRoute } from 'vue-router';

    import BetTable from '@/views/pages/bookmakers/BetTable.vue'
    import BetFilter from '@/views/pages/bookmakers/BetFilter.vue'
    import BetStats from '@/views/pages/bookmakers/BetStats.vue'

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
    const statsData = ref(null);

    const route = useRoute();
    const currentRouteName = route.name === 'Home' ? '' : route.name;

    const updateFilters = (newFilters) => {
        // Émettre l'événement vers le composant parent
        emit('updateFilters', newFilters);
    };

    const handleStatsUpdate = (newStatsData) => {
      // Handle the updated stats data here
      statsData.value = newStatsData;
    };
</script>

<template>
  <VRow>
    <VCol cols="12" v-if="statsData">
      <BetStats 
          :betStats="statsData"
          :title="`Statistiques des cotes boostées ${currentRouteName || ''}`"
      />
    </VCol>

    <VCol cols="12">
      <VCard :title="`Filtrer les cotes boostées ${currentRouteName || ''}`">
        <VCardText>
            <BetFilter 
                :bet="bet"
                :sport="sport"
                :match="match"
                :competition="competition"
                :status="status"
                :bookmaker="bookmaker"
                :minBoostedOdd="minBoostedOdd"
                :maxBoostedOdd="maxBoostedOdd"
                :minInitialOdd="minInitialOdd"
                :maxInitialOdd="maxInitialOdd"
                :minAmount="minAmount"
                :maxAmount="maxAmount"
                :startDate="startDate"
                :endDate="endDate"

                :editBookmaker="editBookmaker"
                :editAmount="editAmount"
                @update="updateFilters"
            />
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12">
      <VCard :title="`Historique de toutes les cotes boostées ${currentRouteName || ''}`">
        <VCardText>
          Ci-dessous vous retrouverez l'historique de toutes les cotes boostées {{ currentRouteName || '' }} jouées par BetBoost.
        </VCardText>
        <BetTable 
            :bet="bet"
            :sport="sport"
            :match="match"
            :competition="competition"
            :status="status"
            :bookmaker="bookmaker"
            :minBoostedOdd="minBoostedOdd"
            :maxBoostedOdd="maxBoostedOdd"
            :minInitialOdd="minInitialOdd"
            :maxInitialOdd="maxInitialOdd"
            :minAmount="minAmount"
            :maxAmount="maxAmount"
            :startDate="startDate"
            :endDate="endDate"
            :editBookmaker="editBookmaker"
            @updateStats="handleStatsUpdate"
        />
      </VCard>
    </VCol>
  </VRow>
</template>
<script setup>
    import BetsDashboard from '@/views/pages/bookmakers/BetsDashboard.vue';
    import { ref } from 'vue';

    const bet = ref('');
    const sport = ref('');
    const match = ref('');
    const competition = ref('');
    const status = ref('');
    const bookmaker = ref('');
    const minBoostedOdd = ref('');
    const maxBoostedOdd = ref('');
    const minInitialOdd = ref('');
    const maxInitialOdd = ref('');
    const minAmount = ref('');
    const maxAmount = ref('');
    const startDate = ref('');
    const endDate = ref('');

    const updateFilters = (newFilters) => {
      bet.value = newFilters.bet;
      sport.value = newFilters.sport;
      match.value = newFilters.match;
      competition.value = newFilters.competition;
      status.value = newFilters.status;
      bookmaker.value = newFilters.bookmaker;
      minBoostedOdd.value = newFilters.minBoostedOdd;
      maxBoostedOdd.value = newFilters.maxBoostedOdd;
      minInitialOdd.value = newFilters.minInitialOdd;
      maxInitialOdd.value = newFilters.maxInitialOdd;
      minAmount.value = newFilters.minAmount;
      maxAmount.value = newFilters.maxAmount;
      startDate.value = newFilters.startDate;
      endDate.value = newFilters.endDate;
    };    
</script>

<template>
  <div>
    <BetsDashboard
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

      :editBookmaker="true"
      :editAmount="true"
      @updateFilters="updateFilters"
    />
</div>
</template>

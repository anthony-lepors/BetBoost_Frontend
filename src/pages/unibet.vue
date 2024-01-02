<script setup>
    import BetsDashboard from '@/views/pages/bookmakers/BetsDashboard.vue';
    import { ref } from 'vue';
    import { generateSeoMeta } from '@/services/seo';

    const pageTitle = "Historique des Cotes Boostées Unibet";
    const pageDescription = "Retrouvez l'historique et les statistiques des cotes boostées (Flash Bet) Unibet sur BetBoost. Application paris sportifs boostés !";
    const pageImage = "https://mybetboost.com/wp-content/uploads/2023/11/betboost-unibet.png";

    const pageKeywords = [
      "historique cotes boostées unibet",
      "historique cote boostée unibet",
      "historiques cotes boostées unibet",
      "historiques cote boostée unibet",
      "statistique cotes boostées unibet",
      "statistique cote boostée unibet",
      "statistiques cotes boostées unibet",
      "statistiques cote boostée unibet",
      "cote boostée unibet",
      "cotes boostées unibet",
      "flash bet unibet",
      "flash bet unibet aujourd'hui",
    ];

    generateSeoMeta(pageTitle, pageDescription, pageImage, pageKeywords);

    const bet = ref('');
    const sport = ref('');
    const match = ref('');
    const competition = ref('');
    const status = ref('');
    const bookmaker = ref('Unibet');
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
    
    import { useRoute } from 'vue-router'
    const route = useRoute()
    const activeTab = ref(route.params.tab)

    // tabs
    const tabs = [
        {
            title: 'Flash Bet',
            icon: 'mdi-podium-gold',
            tab: 'gold',
        },
        {
            title: 'Cotes Boostées',
            icon: 'mdi-podium-silver',
            tab: 'silver',
        },
        {
            title: 'Tout',
            icon: 'mdi-podium',
            tab: 'all',
        },
    ];

</script>

<template>
    <div>
    <VTabs
      v-model="activeTab"
      show-arrows
    >
      <VTab
        v-for="item in tabs"
        :key="item.icon"
        :value="item.tab"
      >
        <VIcon
          size="20"
          start
          :icon="item.icon"
        />
        {{ item.title }}
      </VTab>
    </VTabs>
    <VDivider />

    <VWindow
      v-model="activeTab"
      class="mt-5 disable-tab-transition"
    >
      <!-- First tab -->
      <VWindowItem value="gold">
        <BetsDashboard
            :bet="bet"
            :sport="sport"
            :match="match"
            :competition="competition"
            :status="status"
            :bookmaker="'Unibet'"
            :minBoostedOdd="minBoostedOdd"
            :maxBoostedOdd="maxBoostedOdd"
            :minInitialOdd="minInitialOdd"
            :maxInitialOdd="maxInitialOdd"
            :minAmount="0"
            :maxAmount="25"
            :startDate="startDate"
            :endDate="endDate"

            :editBookmaker="false"
            :editAmount="false"
            @updateFilters="updateFilters"
        />
      </VWindowItem>

      <!-- Second tab -->
      <VWindowItem value="silver">
        <BetsDashboard
            :bet="bet"
            :sport="sport"
            :match="match"
            :competition="competition"
            :status="status"
            :bookmaker="'Unibet'"
            :minBoostedOdd="minBoostedOdd"
            :maxBoostedOdd="maxBoostedOdd"
            :minInitialOdd="minInitialOdd"
            :maxInitialOdd="maxInitialOdd"
            :minAmount="50"
            :maxAmount="10000"
            :startDate="startDate"
            :endDate="endDate"

            :editBookmaker="false"
            :editAmount="false"
            @updateFilters="updateFilters"
        />
      </VWindowItem>

      <!-- Third tab -->
      <VWindowItem value="all">
        <BetsDashboard
            :bet="bet"
            :sport="sport"
            :match="match"
            :competition="competition"
            :status="status"
            :bookmaker="'Unibet'"
            :minBoostedOdd="minBoostedOdd"
            :maxBoostedOdd="maxBoostedOdd"
            :minInitialOdd="minInitialOdd"
            :maxInitialOdd="maxInitialOdd"
            :minAmount="minAmount"
            :maxAmount="maxAmount"
            :startDate="startDate"
            :endDate="endDate"

            :editBookmaker="false"
            :editAmount="true"
            @updateFilters="updateFilters"
        />
      </VWindowItem>
    </VWindow>
    </div>
</template>

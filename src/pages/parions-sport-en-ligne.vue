<script setup>
    import BetsDashboard from '@/views/pages/bookmakers/BetsDashboard.vue';
    import { ref } from 'vue';
    import { generateSeoMeta } from '@/services/seo';

    const pageTitle = "Historique Cotes Boostées Parions Sport";
    const pageDescription = "Retrouvez l'historique et les statistiques des cotes boostées Parions Sport en Ligne (PSEL) sur BetBoost. Application paris sportifs boostés !";
    const pageImage = "https://mybetboost.com/wp-content/uploads/2023/11/betboost-psel.png";

    const pageKeywords = [
      "historique cotes boostées psel",
      "historique cotes boostées parions sport",
      "historique cote boostée psel",
      "historiques cotes boostées psel",
      "historiques cote boostée psel",
      "statistique cotes boostées psel",
      "statistique cote boostée psel",
      "statistiques cotes boostées psel",
      "statistiques cotes boostées parions sport",
      "statistiques cote boostée psel",
      "cote boostée psel",
      "cotes boostées psel",
      "cote boostée parions sport",
      "cotes boostées parions sport",
      "cb flash psel",
      "cb flash psel aujourd'hui",
      "time boost psel",
      "time boost psel aujourd'hui",
    ];

    generateSeoMeta(pageTitle, pageDescription, pageImage, pageKeywords);


    const bet = ref('');
    const sport = ref('');
    const match = ref('');
    const competition = ref('');
    const status = ref('');
    const bookmaker = ref('Parions Sport');
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

    const updateStartDate = (newSelectedTime) => {
      startDate.value = newSelectedTime;
    };
    
    import { useRoute } from 'vue-router'
    const route = useRoute()
    const activeTab = ref(route.params.tab)

    // tabs
    const tabs = [
        {
            title: 'CB Flash',
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
            :bookmaker="'Parions Sport'"
            :minBoostedOdd="minBoostedOdd"
            :maxBoostedOdd="maxBoostedOdd"
            :minInitialOdd="minInitialOdd"
            :maxInitialOdd="maxInitialOdd"
            :minAmount="0"
            :maxAmount="10"
            :startDate="startDate"
            :endDate="endDate"

            :editBookmaker="false"
            :editAmount="false"
            @updateFilters="updateFilters"
            @updateStartDate="updateStartDate"
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
            :bookmaker="'Parions Sport'"
            :minBoostedOdd="minBoostedOdd"
            :maxBoostedOdd="maxBoostedOdd"
            :minInitialOdd="minInitialOdd"
            :maxInitialOdd="maxInitialOdd"
            :minAmount="11"
            :maxAmount="10000"
            :startDate="startDate"
            :endDate="endDate"

            :editBookmaker="false"
            :editAmount="false"
            @updateFilters="updateFilters"
            @updateStartDate="updateStartDate"
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
            :bookmaker="'Parions Sport'"
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
            @updateStartDate="updateStartDate"
        />
      </VWindowItem>
    </VWindow>
    </div>
</template>

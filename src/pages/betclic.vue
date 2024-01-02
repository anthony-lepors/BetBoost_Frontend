<script setup>
    import BetsDashboard from '@/views/pages/bookmakers/BetsDashboard.vue';
    import { ref } from 'vue';

    import { generateSeoMeta } from '@/services/seo';

    const pageTitle = "Historique des Cotes Boostées Betclic";
    const pageDescription = "Retrouvez l'historique et les statistiques des cotes boostées (Flash Boost) Betclic sur BetBoost. Application paris sportifs boostés !";
    const pageImage = "https://mybetboost.com/wp-content/uploads/2023/11/betboost-betclic.png";

    const pageKeywords = [
      "historique cotes boostées betclic",
      "historique cote boostée betclic",
      "historiques cotes boostées betclic",
      "historiques cote boostée betclic",
      "statistique cotes boostées betclic",
      "statistique cote boostée betclic",
      "statistiques cotes boostées betclic",
      "statistiques cote boostée betclic",
      "cote boostée betclic",
      "cotes boostées betclic",
      "flash boost betclic",
      "flash boost betclic aujourd'hui",
    ];

    generateSeoMeta(pageTitle, pageDescription, pageImage, pageKeywords);

    const bet = ref('');
    const sport = ref('');
    const match = ref('');
    const competition = ref('');
    const status = ref('');
    const bookmaker = ref('Betclic');
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
          title: 'Flash Boost',
          icon: 'mdi-podium-gold',
          tab: 'gold',
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
            :bookmaker="'Betclic'"
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

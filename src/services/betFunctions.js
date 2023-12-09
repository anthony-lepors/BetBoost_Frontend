import axios from 'axios';

function formatSortBy(sortBy) {
    if (!sortBy || !Array.isArray(sortBy)) {
        return '';
    }

    return sortBy
        .map(sortOption => `${sortOption.key}:${sortOption.order}`)
        .join(',');
}

export async function loadItems(options, betState) {
    betState.isLoading = true;
    betState.betErrors.get = [];
    const sortParam = formatSortBy(options.sortBy);

    const params = {
        page: options.page,
        itemsPerPage: options.itemsPerPage,
        sortBy: sortParam,
        bet: options.bet,
        sport: options.sport,
        match: options.match,
        competition: options.competition,
        status: options.status,
        bookmaker: options.bookmaker,
        minBoostedOdd: options.minBoostedOdd,
        maxBoostedOdd: options.maxBoostedOdd,
        minInitialOdd: options.minInitialOdd,
        maxInitialOdd: options.maxInitialOdd,
        minAmount: options.minAmount,
        maxAmount: options.maxAmount,
        startDate: options.startDate,
        endDate: options.endDate,
    };

    try {
        const response = await axios.get('/api/feed', { params });
        betState.betList = response.data.data;
        betState.betLastParams = params;
        betState.betTotalNumber = response.data.total;
        betState.isLoading = false;
    } catch (error) {
        // Gérer l'erreur
        betState.betErrors.get = error.response?.data?.data || ["Erreur de chargement"];
        betState.isLoading = false;
    }
}

export async function editBet(params, betState) {
    betState.betErrors.edit = [];
    try {
      await axios.put(`/api/bets/${params.id}`, params);
      await loadItems(betState.betLastParams, betState);
    } catch (error) {
      betState.betErrors.edit = error.response?.data || ["Erreur de modification"];
    }
  }
  
export async function deleteBet(bet, betState) {
  betState.betErrors.delete = [];
  try {
    await axios.delete(`/api/bets/${bet.id}`);
    await loadItems(betState.betLastParams, betState);
  } catch (error) {
    betState.betErrors.delete = error.response?.data || ["Erreur de suppression"];
  }
}

export async function newBet(params, betState) {
  betState.betErrors.post = [];
  try {
    await axios.post('/api/bets/', params);
    await loadItems(betState.betLastParams, betState);
  } catch (error) {
    betState.betErrors.post = error.response?.data || ["Erreur de creation"];
  }
}

export async function loadStats(params, betState) {
  betState.isLoading = true;
  betState.betErrors.get = [];

  try {
    const response = await axios.get('/api/stats', { params });
    betState.data = response.data;
    betState.isLoading = false;
  }
  catch (error) {
    betState.betErrors.get = error.response?.data?.data || ["Erreur de chargement"];
    betState.isLoading = false;
  }
}

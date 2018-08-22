export const isValidPortfolio = portfolio => {
  let sumPercent = 0;

  for (let i = 0; i < portfolio.holdings.length; i++) {
    const currentHolding = portfolio.holdings[i];

    // Ticker has percent but no history
    if (
      currentHolding.percent &&
      (!currentHolding.ticker.history || !currentHolding.ticker.history.length)
    ) {
      return false;
    }

    if (!currentHolding.unsupportedSymbol) {
      sumPercent += currentHolding.percent;
    }
  }

  return sumPercent === 100;
};

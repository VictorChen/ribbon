import uniqueId from 'lodash.uniqueid';

const receiveTickerHistory = (ticker, tickerHistory, holdingId) => {
  return {
    type: 'RECEIVE_TICKER_HISTORY',
    ticker,
    tickerHistory,
    holdingId
  };
};

const tickerHistoryError = holdingId => {
  return {
    type: 'TICKER_HISTORY_ERROR',
    holdingId
  };
};

export const addPortfolio = () => dispatch => {
  const portfolioId = uniqueId('portfolio');
  dispatch({
    type: 'ADD_PORTFOLIO',
    portfolioId
  });
  return portfolioId;
};

export const addHolding = (portfolioId, ticker, percent) => dispatch => {
  dispatch({
    type: 'ADD_HOLDING',
    holdingId: uniqueId('holding'),
    portfolioId,
    ticker,
    percent
  });
};

export const renamePortfolio = (portfolioId, newName) => dispatch => {
  dispatch({
    type: 'RENAME_PORTFOLIO',
    portfolioId,
    newName
  });
};

export const updateHoldingTicker = (holdingId, newTicker) => dispatch => {
  dispatch({
    type: 'UPDATE_HOLDING_TICKER',
    holdingId,
    newTicker
  });
};

export const updateHoldingPercent = (holdingId, newPercent) => dispatch => {
  dispatch({
    type: 'UPDATE_HOLDING_PERCENT',
    holdingId,
    newPercent
  });
};

export const fetchTickerHistory = (ticker, holdingId) => async (
  dispatch,
  getState
) => {
  const { tickersHistory } = getState();

  if (!tickersHistory[ticker]) {
    const url = `https://api.iextrading.com/1.0/stock/${ticker}/chart/5y`;

    try {
      const response = await fetch(url);
      const history = await response.json();
      dispatch(receiveTickerHistory(ticker, history, holdingId));
    } catch (error) {
      dispatch(tickerHistoryError(holdingId));
    }
  }
};

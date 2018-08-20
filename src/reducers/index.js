export default (state = {}, action) => {
  switch (action.type) {
    case 'ADD_PORTFOLIO':
      return {
        ...state,
        portfoliosById: {
          ...state.portfoliosById,
          [action.portfolioId]: {
            name: `Portfolio ${state.portfolios.length + 1}`,
            holdings: []
          }
        },
        portfolios: [...state.portfolios, action.portfolioId]
      };
    case 'ADD_HOLDING':
      return {
        ...state,
        holdingsById: {
          ...state.holdingsById,
          [action.holdingId]: {
            ticker: action.ticker,
            percent: action.percent
          }
        },
        portfoliosById: {
          ...state.portfoliosById,
          [action.portfolioId]: {
            ...state.portfoliosById[action.portfolioId],
            holdings: [
              ...state.portfoliosById[action.portfolioId].holdings,
              action.holdingId
            ]
          }
        }
      };
    case 'RENAME_PORTFOLIO':
      return {
        ...state,
        portfoliosById: {
          ...state.portfoliosById,
          [action.portfolioId]: {
            ...state.portfoliosById[action.portfolioId],
            name: action.newName
          }
        }
      };
    case 'UPDATE_HOLDING_TICKER':
      return {
        ...state,
        holdingsById: {
          ...state.holdingsById,
          [action.holdingId]: {
            ...state.holdingsById[action.holdingId],
            ticker: action.newTicker
          }
        }
      };
    case 'UPDATE_HOLDING_PERCENT':
      return {
        ...state,
        holdingsById: {
          ...state.holdingsById,
          [action.holdingId]: {
            ...state.holdingsById[action.holdingId],
            percent: action.newPercent
          }
        }
      };
    case 'RECEIVE_TICKER_HISTORY':
      return {
        ...state,
        holdingsById: {
          ...state.holdingsById,
          [action.holdingId]: {
            ...state.holdingsById[action.holdingId],
            unsupportedSymbol: false
          }
        },
        tickersHistory: {
          ...state.tickersHistory,
          [action.ticker]: action.tickerHistory
        }
      };
    case 'TICKER_HISTORY_ERROR':
      return {
        ...state,
        holdingsById: {
          ...state.holdingsById,
          [action.holdingId]: {
            ...state.holdingsById[action.holdingId],
            unsupportedSymbol: true
          }
        }
      };
    default:
      return state;
  }
};

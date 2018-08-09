export default (state = {}, action) => {
  switch (action.type) {
    case 'ADD_PORTFOLIO':
      return {
        ...state,
        portfolios: state.portfolios.concat([
          { id: action.id, name: `Portfolio ${state.portfolios.length + 1}` }
        ])
      };
    case 'RENAME_PORTFOLIO':
      return {
        ...state,
        portfolios: state.portfolios.map(portfolio => {
          if (portfolio.id === action.id) {
            return {
              ...portfolio,
              name: action.newName
            };
          }

          return portfolio;
        })
      };
    default:
      return state;
  }
};

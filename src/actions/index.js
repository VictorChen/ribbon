let uniqueId = 1;

export const addPortfolio = () => dispatch => {
  dispatch({
    type: 'ADD_PORTFOLIO',
    id: uniqueId++
  });
};

export const renamePortfolio = (id, newName) => dispatch => {
  dispatch({
    type: 'RENAME_PORTFOLIO',
    id,
    newName
  });
};

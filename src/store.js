import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
  tickersHistory: {
    // fds: [],
    // googl: []
  },
  holdingsById: {
    // holding0: {
    //   ticker: 'aapl',
    //   percent: 0.5,
    //   unsupportedSymbol: true
    // },
    // holding1: {
    //   ticker: 'fds',
    //   percent: 0.5
    // }
  },
  portfoliosById: {
    // 'portfolio-0': {
    //   name: 'fang',
    //   holdings: ['holding0']
    // },
    // 'portfolio-1': {
    //   name: 'fang',
    //   holdings: ['holding0']
    // }
  },
  portfolios: []
};

export default createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

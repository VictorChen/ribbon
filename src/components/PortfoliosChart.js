import React from 'react';
import moment from 'moment';
import Intro from './Intro';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const CHART_COLORS = ['#2c8a6c', '#9d3254'];

class PortfoliosChart extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  filterHoldings(portfolio) {
    return {
      ...portfolio,
      holdings: portfolio.holdings.filter(
        holding =>
          holding.ticker &&
          holding.percent &&
          holding.ticker.history &&
          holding.ticker.history.length
      )
    };
  }

  getValidPortfolios() {
    const validPortfolios = this.props.portfolios.filter(portfolio => {
      let sumPercent = 0;

      for (let i = 0; i < portfolio.holdings.length; i++) {
        const currentHolding = portfolio.holdings[i];

        // Ticker has percent but no history
        if (
          currentHolding.percent &&
          (!currentHolding.ticker.history ||
            !currentHolding.ticker.history.length)
        ) {
          return false;
        }

        if (!currentHolding.unsupportedSymbol) {
          sumPercent += currentHolding.percent;
        }
      }

      return sumPercent === 100;
    });

    return validPortfolios.map(this.filterHoldings);
  }

  getEarliestDate(portfolios) {
    const earliestPortfolioDates = portfolios.map(portfolio => {
      const holdingDates = portfolio.holdings.map(
        holding => holding.ticker.history[0].date
      );
      holdingDates.sort();
      return holdingDates[holdingDates.length - 1];
    });

    earliestPortfolioDates.sort();
    return earliestPortfolioDates[earliestPortfolioDates.length - 1];
  }

  getCombinedPortfolioData(holdings, earliestDate) {
    const tickers = holdings.map(holding => holding.ticker);
    const choppedTickerHistories = tickers.map(ticker => {
      const tickerHistory = ticker.history;
      const index = tickerHistory.findIndex(
        history => history.date === earliestDate
      );
      return tickerHistory.slice(index);
    });

    const result = [];

    for (let i = 0; i < choppedTickerHistories[0].length; i++) {
      const dateHistory = {
        date: choppedTickerHistories[0][i].date
      };

      choppedTickerHistories.forEach((history, index) => {
        dateHistory[tickers[index].value] = history[i];
      });

      result.push(dateHistory);
    }

    // Calculate total portfolio change
    const percentMap = holdings.reduce((map, holding) => {
      map[holding.ticker.value] = holding.percent;
      return map;
    }, {});

    const { date, ...initialDate } = result[0];

    return result.map(dateHistory => {
      const { date, ...tickers } = dateHistory;
      const portfolioDateHistory = { date };

      const totalPercentChange = Object.keys(tickers).reduce(
        (currentPercentChange, symbol) => {
          const percentChange =
            (tickers[symbol].close - initialDate[symbol].close) /
            initialDate[symbol].close;
          const weightedChange = percentMap[symbol] * percentChange;
          return currentPercentChange + weightedChange;
        },
        0
      );

      portfolioDateHistory.percentChange = totalPercentChange;

      return portfolioDateHistory;
    });
  }

  getCombinedChartData(portfolios) {
    const earliestDate = this.getEarliestDate(portfolios);

    const portfolioCombinedHistories = portfolios.map(portfolio => {
      return this.getCombinedPortfolioData(portfolio.holdings, earliestDate);
    });

    console.log(portfolioCombinedHistories);

    if (!portfolioCombinedHistories.length) {
      return [];
    }

    return portfolioCombinedHistories[0].map((dateHistory, index) => {
      const item = {
        date: moment(dateHistory.date).valueOf()
      };

      portfolios.forEach((portfolio, portfolioIndex) => {
        item[portfolio.id] =
          portfolioCombinedHistories[portfolioIndex][index].percentChange;
      });

      return item;
    });
  }

  toolTipLabelFormatter(unixTime) {
    return moment(unixTime).format('MM/DD/YY');
  }

  tooltipValueFormatter(value) {
    return `${Math.round(value * 100) / 100}%`;
  }

  sortTooltips(series1, series2) {
    return series2.value - series1.value;
  }

  yTickFormatter(tickValue) {
    return `${tickValue}%`;
  }

  render() {
    const validPortfolios = this.getValidPortfolios();

    if (validPortfolios.length) {
      return (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={this.getCombinedChartData(validPortfolios)}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <XAxis
              dataKey="date"
              type="number"
              tickCount={7}
              domain={['dataMin', 'dataMax']}
              tickFormatter={unixTime => moment(unixTime).format('MM/DD/YY')}
            />
            <YAxis
              tickFormatter={this.yTickFormatter}
              label={{
                offset: 10,
                angle: -90,
                fill: 'white',
                position: 'insideLeft'
              }}
            />
            <CartesianGrid
              fillOpacity={0.5}
              strokeDasharray="3 3"
              stroke="#666666"
              vertical
              horizontal
              verticalFill={['#0d1738', '#1d2b58']}
            />
            <Tooltip
              itemSorter={this.sortTooltips}
              labelFormatter={this.toolTipLabelFormatter}
              formatter={this.tooltipValueFormatter}
            />
            <Legend />
            {validPortfolios.map((portfolio, index) => {
              return (
                <Line
                  key={portfolio.id}
                  name={portfolio.name}
                  type="monotone"
                  dataKey={portfolio.id}
                  dot={false}
                  strokeWidth={2}
                  stroke={CHART_COLORS[index]}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      );
    }
    return <Intro />;
  }
}

const mapStateToProps = state => {
  const { portfolios, portfoliosById, holdingsById, tickersHistory } = state;
  return {
    portfolios: portfolios.map(portfolioId => ({
      ...portfoliosById[portfolioId],
      id: portfolioId,
      holdings: portfoliosById[portfolioId].holdings.map(holdingId => {
        const currentHolding = holdingsById[holdingId];
        return {
          ...currentHolding,
          id: holdingId,
          ticker: {
            ...currentHolding.ticker,
            history:
              (currentHolding.ticker &&
                tickersHistory[currentHolding.ticker.value]) ||
              []
          }
        };
      })
    }))
  };
};

export default connect(mapStateToProps)(PortfoliosChart);

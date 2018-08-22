import React from 'react';
import moment from 'moment';
import Intro from './Intro';
import ReactEcharts from 'echarts-for-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { chartSeriesColors } from '../styles/common';
import { isValidPortfolio } from '../utils/portfolioUtil';

class PortfoliosChart extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  getValidPortfolios() {
    return this.props.portfolios.filter(isValidPortfolio);
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

    return portfolioCombinedHistories;
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
    const chartData = this.getCombinedChartData(validPortfolios);

    const series = chartData.map((portfolioData, index) => {
      return {
        name: validPortfolios[index].name,
        data: portfolioData.map(item => {
          return {
            value: [item.date, item.percentChange]
          };
        }),
        type: 'line',
        symbol: 'none',
        itemStyle: { color: chartSeriesColors[index] }
      };
    });

    if (validPortfolios.length) {
      const chartOptions = {
        grid: {
          left: 40,
          top: 20,
          right: 20,
          bottom: 40
        },
        legend: {},
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'time',
          axisLabel: {
            color: '#818999'
          },
          axisTick: {
            lineStyle: {
              color: '#ecedef'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(83, 82, 82, 0.5)',
              type: 'dotted'
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(29, 43, 88, 0.35)', 'rgba(22, 21, 78, 0)']
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#818999'
          },
          axisTick: {
            lineStyle: {
              color: '#ecedef'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(83, 82, 82, 1)',
              type: 'dotted'
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['#0d1738']
            }
          }
        },
        series
      };

      return <ReactEcharts option={chartOptions} opts={{ renderer: 'svg' }} />;
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

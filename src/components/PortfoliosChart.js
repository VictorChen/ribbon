import React from 'react';
import moment from 'moment';
import Intro from './Intro';
import ReactEcharts from 'echarts-for-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { styles, chartSeriesColors } from '../styles/common';
import { isValidPortfolio } from '../utils/portfolioUtil';

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
    return this.props.portfolios
      .filter(isValidPortfolio)
      .map(this.filterHoldings);
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
    const earliestDate = this.getEarliestDate(validPortfolios);

    const series = this.props.portfolios.map((portfolio, index) => {
      // https://github.com/apache/incubator-echarts/issues/6202
      const portfolioData = isValidPortfolio(portfolio)
        ? this.getCombinedPortfolioData(
            this.filterHoldings(portfolio).holdings,
            earliestDate
          )
        : [];

      return {
        name: portfolio.name,
        data: portfolioData.map(item => ({
          value: [item.date, item.percentChange]
        })),
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
          bottom: 80
        },
        tooltip: {
          trigger: 'axis'
        },
        dataZoom: {
          borderColor: styles.dark1,
          show: true,
          realtime: true,
          backgroundColor: styles.dark1,
          dataBackground: {
            areaStyle: {
              color: '#D8D8D8',
              opacity: 0.2
            }
          },
          fillerColor: 'rgba(29,43,88,0.5)',
          handleColor: '#D8D8D8',
          start: 0,
          end: 100,
          textStyle: {
            color: 'transparent'
          }
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
              color: [styles.dark1]
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
    portfolios: portfolios.map((portfolioId, index) => ({
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
      }),
      color: chartSeriesColors[index]
    }))
  };
};

export default connect(mapStateToProps)(PortfoliosChart);

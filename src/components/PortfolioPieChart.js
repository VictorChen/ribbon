import React from 'react';
import ReactEcharts from 'echarts-for-react';
import PropTypes from 'prop-types';
// import { styles, chartSeriesColors } from '../styles/common';

class PortfolioPieChart extends React.Component {
  static propTypes = {
    holdings: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  getPieColor(validPercentSum) {
    return validPercentSum === 100
      ? '#67a8b6'
      : validPercentSum < 100
        ? '#bbafb3'
        : 'red';
  }

  render() {
    console.log(this.props.holdings);

    const validPercentSum = this.props.holdings.reduce((sum, holding) => {
      return holding.ticker ? sum + holding.percent : sum;
    }, 0);

    const emptySliceValue = validPercentSum > 100 ? 0 : 100 - validPercentSum;

    const chartOptions = {
      series: [
        {
          type: 'pie',
          radius: '100%',
          center: ['50%', '50%'],
          silent: true,
          label: {
            show: false
          },
          itemStyle: {
            color: '#bbafb3'
          },
          data: [
            {
              value: validPercentSum,
              itemStyle: { color: this.getPieColor(validPercentSum) }
            },
            { value: emptySliceValue, itemStyle: { color: 'blue', opacity: 0 } }
          ]
        }
      ]
    };

    return (
      <ReactEcharts
        style={{ height: '100%', width: '100%' }}
        option={chartOptions}
        opts={{ renderer: 'svg' }}
      />
    );
  }
}

export default PortfolioPieChart;

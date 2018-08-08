import React, { Component } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import styled from 'styled-components';
import TickerAutocomplete from './components/TickerAutocomplete';
import { fetchTickerHistory } from './utils/api';
import './styles';

const AppWrapper = styled.div`
  background-color: #232323;
  box-sizing: border-box;
  height: 100vh;
  overflow: auto;
  padding: 20px;
`;

const AppHeader = styled.div`
  background-color: #232323;
`;

const AppTitle = styled.h1`
  color: white;
`;

const AppBody = styled.div`
  display: flex;
`;

const AppSide = styled.div`
  width: 350px;
`;

const AppMain = styled.div`
  background-color: gray;
  flex-grow: 1;
`;

const ChartWrapper = styled.div``;

const ChartPlaceholder = styled.div`
  height: 400px;
  border: 1px solid gray;
`;

class App extends Component {
  state = {
    stockPrices: []
  };

  handleTickerChange = ticker => {
    if (ticker && ticker.value) {
      fetchTickerHistory(ticker.value).then(
        stockPrices => {
          this.setState({ stockPrices });
        },
        error => {
          alert('Symbol not supported');
        }
      );
    } else {
      this.setState({ stockPrices: [] });
    }
  };

  renderChart() {
    const { stockPrices } = this.state;

    if (stockPrices.length) {
      return (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={stockPrices}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="date" />
            <YAxis
              label={{ value: 'Price', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="close"
              dot={false}
              stroke="#8884d8"
            />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    return <ChartPlaceholder />;
  }

  render() {
    return (
      <AppWrapper>
        <AppHeader>
          <AppTitle>Portfolio Backtester</AppTitle>
        </AppHeader>
        <AppBody>
          <AppSide>
            <TickerAutocomplete onChange={this.handleTickerChange} />
          </AppSide>
          <AppMain>
            <ChartWrapper>{this.renderChart()}</ChartWrapper>
          </AppMain>
        </AppBody>
      </AppWrapper>
    );
  }
}

export default App;

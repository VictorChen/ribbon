import React from 'react';
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
import { Scrollbars } from 'react-custom-scrollbars';
import MainContainer from './components/MainContainer';
import PortfoliosList from './components/PortfoliosList';
import Intro from './components/Intro';
import Nav from './components/Nav';
import { fetchTickerHistory } from './utils/api';
import './globalStyles';

const AppWrapper = styled.div`
  background-color: #1b2449;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
`;

const AppBody = styled.div`
  display: flex;
  flex-grow: 1;
`;

const AppSide = styled.div`
  flex: 0 0 260px;
  padding: 40px 60px;
`;

const AppMain = styled.div`
  flex-grow: 1;
  overflow: auto;
  width: 0; // https://github.com/recharts/recharts/issues/172
`;

class App extends React.Component {
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
        <ResponsiveContainer width="100%" height="100%">
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

    return <Intro />;
  }

  render() {
    return (
      <AppWrapper>
        <Nav />
        <AppBody>
          <AppSide>
            <PortfoliosList />
          </AppSide>
          <AppMain>
            <Scrollbars style={{ height: '100%' }}>
              <MainContainer>{this.renderChart()}</MainContainer>
              <MainContainer />
            </Scrollbars>
          </AppMain>
        </AppBody>
      </AppWrapper>
    );
  }
}

export default App;

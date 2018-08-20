import React from 'react';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';
import MainContainer from './components/MainContainer';
import PortfoliosList from './components/PortfoliosList';
import PortfoliosChart from './components/PortfoliosChart';
import Nav from './components/Nav';
import './styles/globalStyles';

const AppWrapper = styled.div`
  background-image: linear-gradient(#323c73, #1a244b);
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
  flex: 0 0 360px;
`;

const AppMain = styled.div`
  flex-grow: 1;
  overflow: auto;
  width: 0; // https://github.com/recharts/recharts/issues/172
`;

class App extends React.Component {
  render() {
    return (
      <AppWrapper>
        <Nav />
        <AppBody>
          <AppSide>
            <Scrollbars style={{ height: '100%' }}>
              <PortfoliosList />
            </Scrollbars>
          </AppSide>
          <AppMain>
            <Scrollbars style={{ height: '100%' }}>
              <MainContainer>
                <PortfoliosChart />
              </MainContainer>
              <MainContainer />
            </Scrollbars>
          </AppMain>
        </AppBody>
      </AppWrapper>
    );
  }
}

export default App;

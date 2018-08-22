import React from 'react';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';
import MainContainer from './components/MainContainer';
import PortfoliosList from './components/PortfoliosList';
import PortfoliosChart from './components/PortfoliosChart';
import SideNav from './components/SideNav';
import Nav from './components/Nav';
import { styles } from './styles/common';
import './styles/globalStyles';

const AppWrapper = styled.div`
  background-image: linear-gradient(157deg, #8f96f180 -112%, #16154e80 78%);
  background-color: #19334d;
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
  display: flex;
  flex: 0 0 ${styles.sideWidth}px;
`;

const SideContent = styled.div`
  flex-grow: 1;
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
            <SideNav />
            <SideContent>
              <Scrollbars style={{ height: '100%' }}>
                <PortfoliosList />
              </Scrollbars>
            </SideContent>
          </AppSide>
          <AppMain>
            <Scrollbars style={{ height: '100%' }}>
              <MainContainer>
                <PortfoliosChart />
              </MainContainer>
              <MainContainer>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                  iaculis hendrerit ante, sit amet ultrices libero ullamcorper
                  eu. Proin mi turpis, porttitor et purus in, sollicitudin
                  mollis mauris. Integer nec nulla gravida, semper tellus sit
                  amet, rhoncus dolor. Morbi ut diam vitae tortor viverra
                  iaculis. Donec commodo turpis sit amet venenatis efficitur.
                  Suspendisse potenti. Nulla egestas fringilla dui a venenatis.
                  Mauris tempus orci a enim sagittis, nec varius eros vehicula.
                  Ut sed tincidunt eros. Morbi ut laoreet tortor. Sed
                  scelerisque lacinia sollicitudin. Quisque elementum in justo
                  sit amet tristique. Nam sed suscipit est, id aliquam ipsum.
                  Pellentesque vitae ligula congue, mattis mi sit amet,
                  fringilla ex. Sed diam ex, feugiat et augue vel, gravida
                  aliquet nunc.
                </p>
                <p>
                  Nullam magna mauris, auctor condimentum sagittis laoreet,
                  lobortis tristique est. Fusce bibendum maximus mauris, vel
                  tempor quam porttitor a. Nulla sapien diam, rhoncus a
                  vestibulum sed, semper sed sapien. Nam malesuada sem non justo
                  ultrices feugiat. Maecenas libero nulla, porttitor a
                  ullamcorper vel, dictum quis sapien. Donec vitae nisl sed
                  augue convallis cursus at a dolor. Nunc fermentum faucibus
                  sagittis.
                </p>
                <p>
                  Nullam scelerisque justo sed libero lobortis vulputate. Lorem
                  ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec
                  auctor metus. Donec dolor neque, varius a odio sed, varius
                  placerat tortor. Aliquam ultricies euismod quam, in laoreet
                  sapien dignissim eu. Pellentesque habitant morbi tristique
                  senectus et netus et malesuada fames ac turpis egestas. Donec
                  non leo mauris. Ut lobortis elit tellus, at vestibulum metus
                  maximus eu. Curabitur leo metus, tincidunt non sagittis ac,
                  dignissim non nulla. Pellentesque velit eros, tempor ac
                  scelerisque nec, aliquet et est. Nulla metus tellus, tristique
                  et sapien at, consectetur tempor erat. Curabitur placerat,
                  lorem in efficitur volutpat, lorem augue faucibus dui, vel
                  auctor urna diam at tortor. Nullam consequat ligula vitae
                  sapien suscipit, vitae ultricies massa vulputate. Mauris
                  gravida turpis sed magna lobortis, eget aliquet dui eleifend.
                </p>
                <p>
                  Nulla quam est, vehicula vel lectus sit amet, dignissim
                  aliquam ligula. Vivamus eleifend vel magna a interdum. Class
                  aptent taciti sociosqu ad litora torquent per conubia nostra,
                  per inceptos himenaeos. Donec eu leo orci. In hac habitasse
                  platea dictumst. Maecenas at rhoncus nulla, sit amet ultricies
                  mi. Etiam quis vulputate lacus. Sed tortor lorem, tempus sit
                  amet sagittis quis, dignissim fermentum est. Pellentesque et
                  rutrum quam.
                </p>
                <p>
                  Pellentesque pulvinar varius euismod. Vivamus a ante sit amet
                  tellus iaculis commodo eget et ligula. Sed mi quam, interdum
                  scelerisque ligula a, varius rhoncus sem. Pellentesque congue
                  erat ac metus consectetur, a malesuada nunc imperdiet. Proin
                  ornare eget justo egestas dapibus. Nulla erat leo, placerat
                  sed varius in, vestibulum non sapien. Ut et congue velit, eu
                  pulvinar mauris. Duis consequat efficitur eros non euismod. Ut
                  tempus efficitur enim, at placerat nisi ultricies ut. Aliquam
                  risus orci, gravida pretium urna non, hendrerit porttitor
                  diam. Vestibulum lorem mauris, dignissim eget eleifend ac,
                  sollicitudin nec nunc. Phasellus pretium turpis ac nulla
                  tristique pharetra.
                </p>
              </MainContainer>
            </Scrollbars>
          </AppMain>
        </AppBody>
      </AppWrapper>
    );
  }
}

export default App;

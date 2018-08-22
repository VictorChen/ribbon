import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 20px;

  h1 {
    margin-bottom: 40px;
  }
`;

const Intro = () => {
  return (
    <Wrapper>
      <h1>ribbon</h1>
      <p>
        This free tool allows you to backtest multiple portfolios. You will be
        able to observe how one portfolio compares to another during historical
        times.
      </p>
      <p>
        While the past doesn't necessarily predict the future, it is still a
        valuable tool for optimizing a portfolio.
      </p>
      <p>To get started, simply define your portfolios on the left.</p>
    </Wrapper>
  );
};

export default Intro;

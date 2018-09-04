import React from 'react';
import styled from 'styled-components';
import { styles } from '../styles/common';
import logoSrc from '../assets/ribbon-logo.svg';

const Wrapper = styled.div`
  height: ${styles.navHeight}px;
  position: relative;
`;

const LogoWrapper = styled.div`
  align-items: center;
  display: flex;
  height: ${styles.navHeight}px;
  justify-content: center;
  width: 80px;
  position: absolute;
  top: 0;
  left: 0;

  img {
    width: 28px;
  }
`;

const Nav = () => {
  return (
    <Wrapper>
      <LogoWrapper>
        <img src={logoSrc} alt="logo" />
      </LogoWrapper>
    </Wrapper>
  );
};

export default Nav;

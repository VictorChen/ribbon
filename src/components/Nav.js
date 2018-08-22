import React from 'react';
import styled from 'styled-components';
import { styles } from '../styles/common';

const Wrapper = styled.div`
  height: ${styles.navHeight}px;
  position: relative;
`;

const Logo = styled.div`
  color: #4d9ef0;
  font-size: 16px;
  font-weight: bold;
  position: absolute;
  top: 30px;
  left: 15px;
`;

const Nav = () => {
  return (
    <Wrapper>
      <Logo>ribbon</Logo>
    </Wrapper>
  );
};

export default Nav;

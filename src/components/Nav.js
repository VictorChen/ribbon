import React from 'react';
import Logo from './Logo';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100px;
`;

const Nav = () => {
  return (
    <Wrapper>
      <Logo />
    </Wrapper>
  );
};

export default Nav;

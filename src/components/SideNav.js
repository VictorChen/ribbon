import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { styles } from '../styles/common';

const Wrapper = styled.div`
  flex: 0 0 ${styles.navWidth}px;
`;

const PlaceHolderIcon = styled.div`
  border: 1px solid #000;
  border-radius: 100%;
  display: inline-block;
  width: 28px;
  height: 24px;
  background-color: white;
  opacity: 0.7;
  transition: opacity 0.3s;
`;

const SideNavItem = styled.div`
  align-items: center;
  background-image: ${props =>
    props.active
      ? 'linear-gradient(to right, #3866af, rgba(78, 140, 193, 0))'
      : 'none'};
  cursor: pointer;
  display: flex;
  height: 68px;
  justify-content: center;
  opacity: 0.56;
  width: 80px;

  &:hover ${PlaceHolderIcon} {
    opacity: 1;
  }
`;

class SideNav extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    dispatch: PropTypes.func.isRequired
  };

  render() {
    return (
      <Wrapper>
        <SideNavItem active>
          <PlaceHolderIcon />
        </SideNavItem>
        <SideNavItem>
          <PlaceHolderIcon />
        </SideNavItem>
      </Wrapper>
    );
  }
}

export default connect()(SideNav);

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { styles } from '../styles/common';
import { Icon } from 'react-icons-kit';
import { home, settings } from 'react-icons-kit/feather/';

const Wrapper = styled.div`
  flex: 0 0 ${styles.navWidth}px;
`;

const SideNavItem = styled.div`
  align-items: center;
  background-image: ${props =>
    props.active
      ? 'linear-gradient(to right, #8fbfc9, rgba(143, 191, 201, 0))'
      : 'none'};
  cursor: pointer;
  display: flex;
  height: 68px;
  justify-content: center;
  opacity: ${props => (props.active ? '1' : '0.56')};
  width: 80px;
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
          <Icon size={28} icon={home} />
        </SideNavItem>
        <SideNavItem>
          <Icon size={28} icon={settings} />
        </SideNavItem>
      </Wrapper>
    );
  }
}

export default connect()(SideNav);

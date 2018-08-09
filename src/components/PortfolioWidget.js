import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import TickerAutocomplete from './TickerAutocomplete';
import EditableField from './EditableField';
import { connect } from 'react-redux';
import { renamePortfolio } from '../actions';

const Wrapper = styled.div`
  padding: 20px;
`;

class PortfolioWidget extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    portfolio: PropTypes.object.isRequired
  };

  handleRename = name => {
    this.props.dispatch(renamePortfolio(this.props.portfolio.id, name));
  };

  render() {
    return (
      <Wrapper>
        <EditableField
          value={this.props.portfolio.name}
          onChange={this.handleRename}
        />
        <TickerAutocomplete />
      </Wrapper>
    );
  }
}

export default connect()(PortfolioWidget);

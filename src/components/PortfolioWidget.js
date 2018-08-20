import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import TickerAutocomplete from './TickerAutocomplete';
import EditableField from './EditableField';
import PercentField from './PercentField';
import { connect } from 'react-redux';
import {
  renamePortfolio,
  updateHoldingTicker,
  updateHoldingPercent,
  addHolding,
  fetchTickerHistory
} from '../actions';

const Wrapper = styled.div``;

const TitleEditableField = styled(EditableField)`
  color: white;
`;

const PortfolioHeader = styled.div`
  margin-bottom: 20px;
`;

const HoldingRow = styled.div`
  align-items: center;
  display: flex;
  border-bottom: 1px solid #c0c3cc33;
  padding-bottom: 10px;
  margin-bottom: 10px;

  > *:first-child {
    flex-grow: 1;
    margin-right: 10px;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 10px;
  padding: 5px;
`;

const AddButton = styled.span`
  border: 0;
  border-radius: 3px;
  color: #818999;
  cursor: pointer;
  outline: 0;
  font-size: 14px;

  &:hover {
    color: white;
  }
`;

const HoldingsList = styled.div``;

class PortfolioWidget extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    portfolioId: PropTypes.string.isRequired,
    portfolio: PropTypes.object.isRequired
  };

  handleRename = name => {
    this.props.dispatch(renamePortfolio(this.props.portfolioId, name));
  };

  handleTickerChange(holdingId, ticker) {
    const tickerValue = (ticker && ticker.value) || '';
    if (tickerValue) {
      this.props.dispatch(fetchTickerHistory(tickerValue, holdingId));
    }
    this.props.dispatch(updateHoldingTicker(holdingId, ticker));
  }

  handlePercentUpdate(holdingId, percent) {
    if (percent === '') {
      return;
    }
    this.props.dispatch(updateHoldingPercent(holdingId, Number(percent)));
  }

  handleAddHolding = () => {
    const { dispatch, portfolioId } = this.props;
    dispatch(addHolding(portfolioId, '', 0));
  };

  render() {
    const { className, portfolio } = this.props;

    return (
      <Wrapper className={className}>
        <PortfolioHeader>
          <TitleEditableField
            value={portfolio.name}
            onChange={this.handleRename}
            width="100%"
          />
        </PortfolioHeader>
        <HoldingsList>
          {portfolio.holdings.map(holding => (
            <HoldingRow key={holding.id}>
              <TickerAutocomplete
                showNotSupportedError={holding.unsupportedSymbol}
                value={holding.ticker}
                onChange={ticker => this.handleTickerChange(holding.id, ticker)}
              />
              <PercentField
                value={{
                  label: holding.percent.toString(),
                  value: holding.percent.toString()
                }}
                onChange={percent =>
                  this.handlePercentUpdate(holding.id, percent)
                }
              />
            </HoldingRow>
          ))}
        </HoldingsList>
        <ButtonWrapper>
          <AddButton onClick={this.handleAddHolding}>+ New Asset</AddButton>
        </ButtonWrapper>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    portfolio: {
      ...state.portfoliosById[props.portfolioId],
      holdings: state.portfoliosById[props.portfolioId].holdings.map(
        holdingId => ({
          ...state.holdingsById[holdingId],
          id: holdingId
        })
      )
    }
  };
};

export default connect(mapStateToProps)(PortfolioWidget);

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import TickerAutocomplete from './TickerAutocomplete';
import EditableField from './EditableField';
import PortfolioPieChart from './PortfolioPieChart';
import PercentField from './PercentField';
import { Icon } from 'react-icons-kit';
import { chevronDown, chevronUp } from 'react-icons-kit/feather/';
import { styles } from '../styles/common';
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
  display: grid;
  grid-template-columns: 1fr 22px 26px;
  grid-column-gap: 17px;
  margin-bottom: 20px;
`;

const PortfolioName = styled.div`
  display: flex;
`;

const CollapseIconWrapper = styled.div`
  color: ${props => props.color};
  cursor: pointer;
  display: flex;
`;

const PortfolioPieChartWrapper = styled.div``;

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

const HoldingTag = styled.div`
  display: inline-flex;
  border-radius: 15px;
  overflow: hidden;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const HoldingTagTicker = styled.span`
  background-color: #597186;
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${styles.light1};
  padding: 4px 5px 4px 10px;
`;

const HoldingTagPercent = styled.span`
  background-color: #405b77;
  font-size: 12px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${styles.light1};
  padding: 4px 10px 4px 5px;
`;

const HoldingsList = styled.div`
  padding-right: 40px;
`;

class PortfolioWidget extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    portfolioId: PropTypes.string.isRequired,
    portfolio: PropTypes.object.isRequired,
    color: PropTypes.string.isRequired
  };

  state = {
    isCollapsed: false
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

  toggleCollapse = () => {
    this.setState({ isCollapsed: !this.state.isCollapsed });
  };

  renderOverview() {
    return (
      <div>
        {this.props.portfolio.holdings.map(holding => (
          <HoldingTag key={holding.id}>
            <HoldingTagTicker>
              {holding.ticker.symbol || 'N/A'}
            </HoldingTagTicker>
            <HoldingTagPercent>{holding.percent}%</HoldingTagPercent>
          </HoldingTag>
        ))}
      </div>
    );
  }

  renderHoldings() {
    return (
      <React.Fragment>
        <HoldingsList>
          {this.props.portfolio.holdings.map(holding => (
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
      </React.Fragment>
    );
  }

  render() {
    const { className, portfolio, color } = this.props;
    const { isCollapsed } = this.state;
    const collapseIcon = isCollapsed ? chevronUp : chevronDown;

    return (
      <Wrapper className={className}>
        <PortfolioHeader>
          <PortfolioName>
            <TitleEditableField
              value={portfolio.name}
              onChange={this.handleRename}
              width="100%"
            />
            <CollapseIconWrapper color={color} onClick={this.toggleCollapse}>
              <Icon size={28} icon={collapseIcon} />
            </CollapseIconWrapper>
          </PortfolioName>
          <PortfolioPieChartWrapper>
            <PortfolioPieChart holdings={portfolio.holdings} />
          </PortfolioPieChartWrapper>
        </PortfolioHeader>
        {isCollapsed ? this.renderOverview() : this.renderHoldings()}
      </Wrapper>
    );
  }
}

const mapStateToProps = (state, props) => ({
  portfolio: {
    ...state.portfoliosById[props.portfolioId],
    holdings: state.portfoliosById[props.portfolioId].holdings.map(
      holdingId => ({
        ...state.holdingsById[holdingId],
        id: holdingId
      })
    )
  }
});

export default connect(mapStateToProps)(PortfolioWidget);

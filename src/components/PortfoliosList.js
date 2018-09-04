import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PortfolioWidget from './PortfolioWidget';
import PropTypes from 'prop-types';
import { addPortfolio, addHolding } from '../actions';
import { chartSeriesColors } from '../styles/common';

const Wrapper = styled.div`
  margin-right: 60px;
`;

const StyledPortfolioWidget = styled(PortfolioWidget)`
  margin-bottom: 40px;
`;

const ButtonWrapper = styled.div`
  margin-top: 60px;
`;

const AddButton = styled.button`
  border: 0;
  border-radius: 20px;
  background-image: linear-gradient(to right, #328b9d, #26437a);
  box-shadow: 3px 3px 4px 0 rgba(11, 24, 49, 0.23);
  letter-spacing: 0.5px;
  padding: 10px 20px;
  color: #ededee;
  cursor: pointer;
  outline: 0;
  text-transform: uppercase;
  margin: 0;
  font-size: 14px;
`;

class PortfoliosList extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  handleAdd = () => {
    const portfolioId = this.props.dispatch(addPortfolio());
    this.props.dispatch(addHolding(portfolioId, '', 100));
  };

  render() {
    return (
      <Wrapper>
        {this.props.portfolios.map((portfolioId, index) => (
          <StyledPortfolioWidget
            key={portfolioId}
            portfolioId={portfolioId}
            color={chartSeriesColors[index]}
          />
        ))}
        <ButtonWrapper>
          <AddButton onClick={this.handleAdd}>
            <span>Add Portfolio</span>
          </AddButton>
        </ButtonWrapper>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  portfolios: state.portfolios
});

export default connect(mapStateToProps)(PortfoliosList);

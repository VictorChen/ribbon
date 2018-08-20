import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PortfolioWidget from './PortfolioWidget';
import PropTypes from 'prop-types';
import { addPortfolio, addHolding } from '../actions';

const Wrapper = styled.div`
  padding: 20px;
`;

const StyledPortfolioWidget = styled(PortfolioWidget)`
  margin-bottom: 40px;
`;

const ButtonWrapper = styled.div`
  margin-top: 60px;
`;

const AddButton = styled.button`
  border: 1px solid #808080;
  border-radius: 6px;
  padding: 6px;
  color: #818999;
  cursor: pointer;
  outline: 0;
  margin: 0;
  background-color: transparent;
  font-size: 16px;

  img {
    width: 18px;
    height: 18px;
    margin-right: 5px;
  }

  & > * {
    vertical-align: middle;
  }

  &:hover {
    color: white;
  }
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
        {this.props.portfolios.map(portfolioId => (
          <StyledPortfolioWidget key={portfolioId} portfolioId={portfolioId} />
        ))}
        <ButtonWrapper>
          <AddButton onClick={this.handleAdd}>
            <span>+ Add Portfolio</span>
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

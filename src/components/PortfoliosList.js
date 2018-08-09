import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PortfolioWidget from './PortfolioWidget';
import PropTypes from 'prop-types';
import { addPortfolio } from '../actions';

const Wrapper = styled.div`
  padding: 20px;
`;

class PortfoliosList extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    console.log(this.props.portfolios);
  }

  handleAdd = () => {
    this.props.dispatch(addPortfolio());
  };

  render() {
    const { portfolios } = this.props;

    return (
      <Wrapper>
        {portfolios.map(portfolio => (
          <PortfolioWidget key={portfolio.id} portfolio={portfolio} />
        ))}
        <div>
          <button onClick={this.handleAdd}>Add Portfolio</button>
        </div>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  portfolios: state.portfolios
});

export default connect(mapStateToProps)(PortfoliosList);

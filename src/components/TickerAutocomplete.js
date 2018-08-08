import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/lib/Async';
import { fetchTickers } from '../utils/api';

const StyledAsyncSelect = styled(AsyncSelect)`
  .ticker-autocomplete__control--is-focused .ticker-autocomplete__single-value {
    opacity: 0.4;
  }

  .ticker-autocomplete__indicator-separator,
  .ticker-autocomplete__dropdown-indicator {
    display: none;
  }
`;

const TickerSymbol = styled.span`
  display: inline-block;
  font-weight: bold;
  width: 80px;
`;

class TickerAutocomplete extends Component {
  static propTypes = {
    onChange: PropTypes.func
  };

  static defaultProps = {
    onChange: () => null
  };

  loadOptions = inputValue => {
    if (!inputValue) {
      return Promise.resolve([]);
    }

    return fetchTickers(inputValue).then(response => {
      const tickers = response.ResultSet.Result.map(ticker => {
        return {
          ...ticker,
          value: ticker.symbol,
          label: ticker.name
        };
      });
      return tickers;
    });
  };

  filterOption = item => {
    const allowedExch = ['NYSE', 'NASDAQ'];
    const allowedType = ['Equity', 'ETF', 'Fund'];
    return (
      allowedExch.includes(item.data.exchDisp) &&
      allowedType.includes(item.data.typeDisp)
    );
  };

  formatOptionLabel = (item, { context }) => {
    const ticker =
      context === 'menu' ? <TickerSymbol>{item.value}</TickerSymbol> : null;
    return (
      <div>
        {ticker} {item.label}
      </div>
    );
  };

  render() {
    return (
      <StyledAsyncSelect
        classNamePrefix="ticker-autocomplete"
        placeholder="Search for symbol"
        loadOptions={this.loadOptions}
        onChange={this.props.onChange}
        filterOption={this.filterOption}
        formatOptionLabel={this.formatOptionLabel}
        noOptionsMessage={value => null}
        cacheOptions
        blurInputOnSelect
        isClearable
        defaultOptions
      />
    );
  }
}

export default TickerAutocomplete;

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/lib/Async';
import { fetchTickers } from '../utils/api';
import Tooltip from 'rc-tooltip';
import ReactDOM from 'react-dom';
import styles from '../styles/styles';

const TickerSymbol = styled.div`
  color: '#c0c3cc';
  font-size: 12px;
  font-weight: bold;
  flex: 0 0 60px;
`;

const StyledAsyncSelect = styled(AsyncSelect)`
  color: black;

  .ticker-autocomplete__clear-indicator {
    padding: 2px;
  }

  .ticker-autocomplete__menu {
    font-size: 14px;
  }

  .ticker-autocomplete__input {
    color: ${styles.white1};
  }

  .ticker-autocomplete__value-container .ticker-autocomplete__single-value {
    color: ${styles.white1};
  }

  .ticker-autocomplete__value-container--has-value ${TickerSymbol} {
    color: #c0c3cc;
    opacity: 0.5;
    font-weight: normal;
    font-size: 10px;
  }

  .ticker-autocomplete__control {
    background-color: transparent;
    border: 0;
    border-radius: 0;
    font-size: 14px;
    min-height: auto;
  }

  .ticker-autocomplete__control .ticker-autocomplete__indicators {
    display: none;
  }

  .ticker-autocomplete__control--is-focused {
    box-shadow: none;
  }

  .ticker-autocomplete__control--is-focused .ticker-autocomplete__indicators {
    display: block;
  }

  .ticker-autocomplete__control--is-focused .ticker-autocomplete__single-value {
    opacity: 0.5;
  }

  .ticker-autocomplete__indicator-separator,
  .ticker-autocomplete__dropdown-indicator {
    display: none;
  }
`;

const MenuItem = styled.span``;

class TickerAutocomplete extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    showNotSupportedError: PropTypes.bool
  };

  static defaultProps = {
    onChange: () => null,
    showNotSupportedError: false
  };

  loadOptions = inputValue => {
    if (!inputValue) {
      return Promise.resolve([]);
    }

    // For testing with no wifi
    // return Promise.resolve([
    //   {
    //     value: 'fds',
    //     label: 'FactSet',
    //     exchDisp: 'NYSE',
    //     typeDisp: 'Equity'
    //   },
    //   {
    //     value: 'sq',
    //     label: 'Square',
    //     exchDisp: 'NYSE',
    //     typeDisp: 'Equity'
    //   }
    // ]);

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
    return (
      <MenuItem>
        <TickerSymbol>{item.value}</TickerSymbol>
        <span>{item.label}</span>
      </MenuItem>
    );
  };

  renderSelect() {
    return (
      <StyledAsyncSelect
        {...this.props}
        classNamePrefix="ticker-autocomplete"
        placeholder="Search for symbol"
        loadOptions={this.loadOptions}
        onChange={this.props.onChange}
        filterOption={this.filterOption}
        formatOptionLabel={this.formatOptionLabel}
        noOptionsMessage={value => null}
        cacheOptions
        blurInputOnSelect
        defaultOptions
      />
    );
  }

  render() {
    if (this.props.showNotSupportedError) {
      return (
        <Tooltip
          placement="topLeft"
          getTooltipContainer={() => ReactDOM.findDOMNode(this)}
          visible
          overlay={<span>Sorry, this symbol is not supported</span>}
        >
          {this.renderSelect()}
        </Tooltip>
      );
    }

    return this.renderSelect();
  }
}

export default TickerAutocomplete;

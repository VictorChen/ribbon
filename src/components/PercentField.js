import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CreatableSelect from 'react-select/lib/Creatable';
import styles from '../styles/styles';

const PercentNumber = styled.span`
  color: #4e8cc1;
  font-size: 16px;
  font-weight: bold;
`;

const PercentSymbol = styled.span`
  color: white;
  font-size: 16px;
  margin-left: 4px;
`;

const StyledCreatableSelect = styled(CreatableSelect)`
  color: black;

  .percent-field__clear-indicator {
    padding: 2px;
  }

  .percent-field__menu {
    font-size: 12px;
  }

  .percent-field__menu ${PercentSymbol}, .percent-field__menu ${PercentNumber} {
    color: black;
  }

  .percent-field__input {
    color: ${styles.white1};
  }

  .percent-field__value-container--has-value {
    align-items: right;
  }

  .percent-field__value-container .percent-field__single-value {
    color: ${styles.white1};
    width: 100%;
    text-align: right;
  }

  .percent-field__control {
    background-color: transparent;
    border: 0;
    border-radius: 0;
    font-size: 12px;
    min-height: auto;
    width: 55px;
  }

  .percent-field__control .percent-field__indicators {
    display: none;
  }

  .percent-field__control--is-focused {
    box-shadow: none;
  }

  .percent-field__control--is-focused .percent-field__indicators {
    display: block;
  }

  .percent-field__control--is-focused .percent-field__single-value {
    opacity: 0.5;
  }

  .percent-field__indicator-separator,
  .percent-field__dropdown-indicator {
    display: none;
  }
`;

class PercentField extends React.Component {
  static propTypes = {
    onChange: PropTypes.func
  };

  static defaultProps = {
    onChange: () => null
  };

  handleKeyDown = event => {
    const inputValue = event.target.value;
    if (inputValue && event.key === 'Enter') {
      this.props.onChange(inputValue);
      event.target.blur();
      event.preventDefault();
    }
  };

  formatOptionLabel = item => (
    <div>
      <PercentNumber>{item.label}</PercentNumber>
      <PercentSymbol>%</PercentSymbol>
    </div>
  );

  formatCreateLabel = inputValue => <span>{inputValue}</span>;

  handleChange = item => {
    this.props.onChange(item.value);
  };

  render() {
    return (
      <StyledCreatableSelect
        value={this.props.value}
        classNamePrefix="percent-field"
        onKeyDown={this.handleKeyDown}
        onChange={this.handleChange}
        formatOptionLabel={this.formatOptionLabel}
        blurInputOnSelect
        noOptionsMessage={value => null}
        formatCreateLabel={this.formatCreateLabel}
      />
    );
  }
}

export default PercentField;

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.span``;

class EditableField extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string.isRequired
  };

  static defaultProps = {
    onChange: null
  };

  state = {
    editing: false
  };

  handleChange = event => {
    if (this.props.onChange) {
      this.props.onChange(event.target.value);
    }
  };

  handleEditStart = () => {
    this.setState({ editing: true });
  };

  handleEditEnd = () => {
    this.setState({ editing: false });
  };

  render() {
    if (this.state.editing) {
      return (
        <input
          autoFocus
          value={this.props.value}
          onChange={this.handleChange}
          onBlur={this.handleEditEnd}
        />
      );
    }

    return <Wrapper onClick={this.handleEditStart}>{this.props.value}</Wrapper>;
  }
}

export default EditableField;

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import EditIconSrc from '../assets/edit.png';

const Wrapper = styled.div`
  display: inline-block;
  color: #808080;
`;

const Field = styled.span`
  border: 0;
  display: inline-block;
  font-size: 18px;
  margin: 0;
  padding: 5px 8px;
  position: relative;

  &:hover img {
    opacity: 1;
  }

  img {
    width: 12px;
    height: 12px;
    opacity: 0;
    position: absolute;
    top: 50%;
    left: -10px;
    transition: opacity 0.3s ease-in;
    transform: translateY(-50%);
  }
`;

const InputField = Field.withComponent('input').extend`
  background-color: transparent;
  box-sizing: border-box;
  color: white;
  width: ${props => props.width}
  outline: none;
`;

class EditableField extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    width: PropTypes.string,
    value: PropTypes.string.isRequired
  };

  static defaultProps = {
    onChange: null
  };

  state = {
    editing: false
  };

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.handleEditEnd();
    }
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

  renderControl() {
    if (this.state.editing) {
      return (
        <InputField
          autoFocus
          width={this.props.width}
          value={this.props.value}
          onChange={this.handleChange}
          onBlur={this.handleEditEnd}
          onKeyPress={this.handleKeyPress}
        />
      );
    }

    return (
      <Field onClick={this.handleEditStart}>
        {this.props.value} <img src={EditIconSrc} alt="edit name" />
      </Field>
    );
  }

  render() {
    return (
      <Wrapper className={this.props.className}>{this.renderControl()}</Wrapper>
    );
  }
}

export default EditableField;

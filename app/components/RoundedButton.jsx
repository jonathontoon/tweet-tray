import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';

import * as constants from '../constants';

const RoundedButtonStyle = Styled.button`
    user-select: none;
    display: block;
    margin: 0 auto;
    height: 38px;
    padding-left: 24px;
    padding-right: 24px;
    border-radius: 100px;
    font-size: ${constants.REGULAR_FONT_SIZE}px;
    font-weight: bold;
    border: 0px;
    outline: 0px;
    background-color: ${constants.BLUE};
    color: ${constants.WHITE};
    transition: all 0.3s ease 0s;
    line-height: 20px;
    text-align: center;

    &.fullWidth {
        width: 100% !important;
    }

    &.invertColor {
        background-color: ${constants.WHITE};
        color: ${constants.BLUE};
    }

    &.borderButton {
        border-width: 1px;
        border-style: bold;
        background-color: transparent;
    }

    &:hover {
        opacity: 0.75;
        cursor: pointer;
        transition: all 0.3s ease 0s;
    }

    &:disabled, &[disabled] {
      opacity: 0.4 !important;
      cursor: default !important;
  }
`;

class RoundedButton extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    invertColor: PropTypes.bool,
    borderButton: PropTypes.bool,
    fullWidth: PropTypes.bool,
    style: PropTypes.object,
    title: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.string,
  };
  static defaultProps = {
    disabled: false,
    invertColor: false,
    borderButton: false,
    fullWidth: false,
    style: null,
    title: 'A Button',
    onClick: null,
    type: 'button',
  };

  render() {
    const {
      disabled,
      style,
      title,
      onClick,
      invertColor,
      borderButton,
      fullWidth,
      type,
    } = this.props;

    return (
      <RoundedButtonStyle
        type={type}
        style={style}
        className={`
          ${fullWidth ? 'fullWidth' : ''}
          ${invertColor ? 'invertColor' : ''}
          ${borderButton ? 'borderButton' : ''}
        `}
        onClick={onClick}
        disabled={disabled}
      >
        { title }
      </RoundedButtonStyle>
    );
  }
}

export default RoundedButton;

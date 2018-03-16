import React from 'react';
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
  background-color: ${(props) => {
    return props.color;
  }};
  color: ${constants.WHITE};
  transition: all 0.3s ease 0s;
  line-height: 20px;
  text-align: center;

  &.fullWidth {
      width: 100% !important;
  }

  &.borderButton {
      color: ${constants.BLUE} !important;
      border: 2px solid ${constants.BLUE} !important;
      background-color: ${constants.WHITE} !important;
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

const RoundedButton = (props) => {
  const {
    disabled,
    theme,
    color,
    marginTop,
    height,
    title,
    onClick,
    borderButton,
    fullWidth,
    type,
  } = props;

  return (
    <RoundedButtonStyle
      theme={theme}
      color={color}
      type={type}
      style={{
        marginTop: `${marginTop}px`,
        height: `${height}px`,
      }}
      className={`${fullWidth ? 'fullWidth' : ''} ${borderButton ? 'borderButton' : ''}`}
      onClick={onClick}
      disabled={disabled}
      value={title}
    >
      {title}
    </RoundedButtonStyle>
  );
};

RoundedButton.propTypes = {
  disabled: PropTypes.bool,
  theme: PropTypes.string,
  color: PropTypes.string,
  borderButton: PropTypes.bool,
  fullWidth: PropTypes.bool,
  marginTop: PropTypes.number,
  height: PropTypes.number,
  title: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

RoundedButton.defaultProps = {
  disabled: false,
  theme: 'day',
  color: constants.BLUE,
  borderButton: false,
  fullWidth: false,
  marginTop: 0,
  height: 38,
  title: 'A Button',
  onClick: {},
  type: 'button',
};

export default RoundedButton;


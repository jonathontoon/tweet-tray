import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';

const IconButtonStyle = Styled.button`
    -webkit-app-region: no-drag;
    user-select: none;
    width: auto;
    height: 100%;
    border: 0px;
    outline: 0px;
    background-color: transparent;
    transition: all 0.3s ease 0s;

    &:disabled, &[disabled], &:hover {
        opacity: 0.75;
        cursor: pointer !important;
        transition: all 0.3s ease 0s;
    }

    &:disabled, &[disabled] {
      cursor: default !important;
    }
`;

const ImageStyle = Styled.img`
    display: block;
    pointer-events: none;
    margin-top: 1px;
    width: 25px;
    height: 25px;

    &:hover {
      cursor: pointer !important;
    }
`;

const IconButton = (props) => {
  const {
    disabled, iconSrc, altText, onClick,
  } = props;

  return (
    <IconButtonStyle
      onClick={onClick}
      disabled={disabled}
    >
      <ImageStyle
        src={iconSrc}
        alt={altText}
      />
    </IconButtonStyle>
  );
};

IconButton.propTypes = {
  disabled: PropTypes.bool,
  altText: PropTypes.string.isRequired,
  iconSrc: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

IconButton.defaultProps = {
  disabled: false,
};
export default IconButton;

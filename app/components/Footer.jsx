import React from 'react';
import PropTypes from 'prop-types';

import Styled from 'styled-components';

import * as constants from '../constants';

const FooterStyle = Styled.footer`
  position: absolute;
  z-index: 99;
  left: 0px;
  bottom: 0px;
  width: 100%;
  height: 38px;
  padding-top: 8px;
  padding-bottom: 8px;
  background-color: ${(props) => {
    return props.theme === 'day' ? constants.WHITE : constants.DARK_MODE_FOREGROUND;
  }};
  border-top: 1px solid ${(props) => {
    return props.theme === 'day' ? constants.BORDER_GREY : constants.DARK_MODE_BACKGROUND;
  }};
`;

const LeftViewStyle = Styled.div`
  max-width: 50%;
  height: 100%;
  float: left;
  padding-left: ${constants.SPACING}px;

  & > * {
    float: left;
  }
`;

const RightViewStyle = Styled.div`
  max-width: 50%;
  height: 100%;
  float: right;
  padding-right: ${constants.SPACING}px;

  & > * {
    float: right;
  }
`;

const Footer = (props) => {
  const { leftView, rightView, theme, } = props;
  return (
    <FooterStyle
      theme={theme}
    >
      {leftView !== null && (
        <LeftViewStyle>
          {leftView}
        </LeftViewStyle>
      )}
      {rightView !== null && (
        <RightViewStyle>
          {rightView}
        </RightViewStyle>
      )}
    </FooterStyle>
  );
};

Footer.propTypes = {
  theme: PropTypes.string,
  leftView: PropTypes.object,
  rightView: PropTypes.object,
};

Footer.defaultProps = {
  theme: 'day',
  leftView: null,
  rightView: null,
};

export default Footer;

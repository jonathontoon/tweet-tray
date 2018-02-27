import React from 'react';
import PropTypes from 'prop-types';

import Styled from 'styled-components';
import Theme from 'styled-theming';

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
  background-color: ${Theme('mode', { day: constants.WHITE, night: constants.DARK_MODE_FOREGROUND, })};
  border-top: 1px solid ${Theme('mode', { day: constants.BORDER_GREY, night: constants.DARK_MODE_BACKGROUND, })};;
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
  const { leftView, rightView, } = props;
  return (
    <FooterStyle>
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
  leftView: PropTypes.object,
  rightView: PropTypes.object,
};

Footer.defaultProps = {
  leftView: null,
  rightView: null,
};

export default Footer;

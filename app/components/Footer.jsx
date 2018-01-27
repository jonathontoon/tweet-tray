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
  width: calc(100% - ${constants.SPACING * 2}px);
  height: 38px;
  padding-left: ${constants.SPACING}px;
  padding-right: ${constants.SPACING}px;
  padding-top: 8px;
  padding-bottom: 8px;
  background-color: ${Theme('mode', { day: constants.WHITE, night: constants.DARK_MODE_FOREGROUND, })};
  border-top: 1px solid ${Theme('mode', { day: constants.BORDER_GREY, night: constants.DARK_MODE_BACKGROUND, })};;
`;

const LeftStyle = Styled.div`
  max-width: 50%;
  height: 100%;
  float: left;

  & > * {
    float: left;
  }
`;

const RightStyle = Styled.div`
  max-width: 50%;
  height: 100%;
  float: right;

  & > * {
    float: right;
  }
`;

const Footer = (props) => {
  const { left, right, } = props;
  return (
    <FooterStyle>
      <LeftStyle>
        {left}
      </LeftStyle>
      <RightStyle>
        {right}
      </RightStyle>
    </FooterStyle>
  );
};

Footer.propTypes = {
  left: PropTypes.object,
  right: PropTypes.object,
};

Footer.defaultProps = {
  left: null,
  right: null,
};

export default Footer;

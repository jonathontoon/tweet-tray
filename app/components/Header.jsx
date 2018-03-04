import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import Theme from 'styled-theming';

import * as constants from '../constants';

const HeaderStyle = Styled.header`
    user-select: none;
    position: absolute;
    z-index: 99;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 34px;
    padding-top: 8px;
    padding-bottom: 7px;
    background-color: ${Theme('mode', { day: constants.WHITE, night: constants.DARK_MODE_FOREGROUND, })};
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25);
`;

const LeftViewStyle = Styled.div`
    width: auto;
    height: 100%;
    float: left;
    padding-left: ${constants.SPACING}px;
    & > * {
      float: left;
    }
`;

const TitleStyle = Styled.div`
    user-select: none !important;
    font-size:  ${constants.LARGE_FONT_SIZE}px;
    font-weight: bold;
    color: ${Theme('mode', { day: constants.BLACK, night: constants.WHITE, })};
    line-height: 33px;
    float: left;
    padding-left: ${constants.SPACING}px;
    width: auto;
    height: 100%;
`;

const RightViewStyle = Styled.div`
    width: auto;
    height: 100%;
    float: right;
    padding-right: ${constants.SPACING}px;

    & > * {
      float: right;
    }
`;

const Header = (props) => {
  const { leftView, title, rightView, } = props;

  return (
    <HeaderStyle>
      {leftView !== null && (
        <LeftViewStyle>
          {leftView}
        </LeftViewStyle>
      )}
      <TitleStyle>
        {title}
      </TitleStyle>
      {rightView !== null && (
        <RightViewStyle>
          {rightView}
        </RightViewStyle>
      )}
    </HeaderStyle>
  );
};

Header.propTypes = {
  leftView: PropTypes.object,
  title: PropTypes.string.isRequired,
  rightView: PropTypes.object,
};
Header.defaultProps = {
  leftView: null,
  rightView: null,
};

export default Header;


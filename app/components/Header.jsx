import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import Theme from 'styled-theming';

import * as constants from '../constants';

const HeaderStyle = Styled.header`
    position: absolute;
    z-index: 99;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 34px;
    padding-top: 8px;
    padding-bottom: 8px;
    background-color: ${Theme('mode', { day: constants.WHITE, night: constants.DARK_MODE_FOREGROUND, })};
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3);
`;

const LeftStyle = Styled.div`
    width: 50%;
    height: 100%;
    float: left;
    padding-left: ${constants.SPACING}px;
    & > * {
      float: left;
    }
`;

const TitleStyle = Styled.div`
    font-size:  ${constants.LARGE_FONT_SIZE}px;
    font-weight: bold;
    color: ${Theme('mode', { day: constants.BLACK, night: constants.WHITE, })};
    line-height: 34px;
    float: left;
    padding-left: ${constants.SPACING}px;
    height: 100%;
`;

const RightStyle = Styled.div`
    width: 50%;
    height: 100%;
    float: right;
    padding-right: ${constants.SPACING}px;

    & > * {
      float: right;
    }
`;

const Header = (props) => {
  const { left, title, right, } = props;

  return (
    <HeaderStyle>
      {left !== null && (
        <LeftStyle>
          {left}
        </LeftStyle>
      )}
      <TitleStyle>
        {title}
      </TitleStyle>
      {right !== null && (
        <RightStyle>
          {right}
        </RightStyle>
      )}
    </HeaderStyle>
  );
};

Header.propTypes = {
  left: PropTypes.object,
  title: PropTypes.string.isRequired,
  right: PropTypes.object,
};
Header.defaultProps = {
  left: null,
  right: null,
};

export default Header;


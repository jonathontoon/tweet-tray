import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';

import * as constants from '../constants';

const ListViewSectionStyle = Styled.div`
  overflow: hidden;
  position: relative;
  margin-top: ${constants.SPACING}px;
  border-top: 1px ${(props) => {
    return props.theme === 'day' ? constants.BORDER_GREY : constants.DARK_MODE_BACKGROUND;
  }} solid;
  border-bottom: 1px ${(props) => {
    return props.theme === 'day' ? constants.BORDER_GREY : constants.DARK_MODE_BACKGROUND;
  }} solid;

  button:last-child {
    border-bottom: none;
  }
`;

const ListViewSection = (props) => {
  const { children, theme, } = props;
  return (
    <ListViewSectionStyle theme={theme}>
      {children}
    </ListViewSectionStyle>
  );
};

ListViewSection.propTypes = {
  theme: PropTypes.string,
};

ListViewSection.defaultProps = {
  theme: 'day',
};

export default ListViewSection;


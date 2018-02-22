import React from 'react';
import PropTypes from 'prop-types';

import Styled from 'styled-components';
import Theme from 'styled-theming';

import * as constants from '../constants';

const ListViewItemStyle = Styled.button`
    overflow: hidden;
    display: block;
    min-width: 100%;
    height: 54px;
    outline: none;
    border: none;
    background-color: ${Theme('mode', { day: constants.WHITE, night: constants.DARK_MODE_FOREGROUND, })};
    font-weight: 500;
    text-align: left;
    color: ${Theme('mode', { day: constants.GREY, night: constants.WHITE, })};
    font-size: ${constants.REGULAR_FONT_SIZE}px;
    padding-left: ${constants.SPACING}px;
    padding-right: ${constants.SPACING}px;

    &.last {
      border-top: 1px solid ${Theme('mode', { day: constants.BORDER_GREY, night: constants.DARK_MODE_BACKGROUND, })};
      font-weight: normal;
    }

    &.warning {
      color: ${Theme('mode', { day: constants.RED, night: constants.WHITE, })};
    }

    &:hover {
      cursor: pointer;
      background-color: ${Theme('mode', { day: constants.LIGHT_GREY, night: constants.BLUE, })};
      transition: all 0.3s ease 0s;
    }
`;

const ListViewItem = (props) => {
  const { title, action, type, } = props;
  return (
    <ListViewItemStyle
      onClick={action}
      className={type}
    >
      {title}
    </ListViewItemStyle>
  );
};

ListViewItem.propTypes = {
  title: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  type: PropTypes.string,
};

ListViewItem.defaultProps = {
  type: null,
};

export default ListViewItem;


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
    color: ${Theme('mode', {
        day: (props) => { /* eslint indent: 0 */
          return props.isWarning ? constants.RED : constants.BLACK;
        },
        night: constants.WHITE,
      })};
    font-size: ${constants.REGULAR_FONT_SIZE}px;
    padding-left: ${constants.SPACING}px;
    padding-right: ${constants.SPACING}px;

    &:hover {
      cursor: pointer;
      transition: all 0.3s ease 0s;
      background-color: ${Theme('mode', { day: constants.BORDER_GREY, night: constants.DARK_MODE_FOREGROUND_LIGHT, },)};
    }

    &.noHover {
      &:hover {
        cursor: default;
        transition: none;
        background-color: ${Theme('mode', { day: constants.WHITE, night: constants.DARK_MODE_FOREGROUND, })};
      }
    }
`;

const TitleStyle = Styled.div`
    font-size: ${constants.LARGE_FONT_SIZE}px;
    font-weight: 500;
    line-height: 53px;
    float: left;
    width: auto;
    height: 100%;
`;

const RightViewStyle = Styled.div`
    width: auto;
    height: 100%;
    float: right;
    margin-top: 13px;

    & > * {
      float: right;
    }
`;

const BorderViewStyle = Styled.div`
  margin-top: 53px;
  width: 100%;
  height: 1px;
  background-color: ${Theme('mode', { day: constants.BORDER_GREY, night: constants.DARK_MODE_BACKGROUND, })};
`;

const ListViewItem = (props) => {
  const {
    title,
    action,
    rightView,
    isLast,
    type,
  } = props;

  return (
    <ListViewItemStyle
      onClick={action}
      isSwitch={type === 'switch'}
      isWarning={type === 'warning'}
      className={type === 'switch' ? 'noHover' : ''}
    >
      <TitleStyle>
        {title}
      </TitleStyle>
      {rightView !== null && (
        <RightViewStyle>
          {rightView}
        </RightViewStyle>
      )}
      {!isLast && (
        <BorderViewStyle />
      )}
    </ListViewItemStyle>
  );
};

ListViewItem.propTypes = {
  title: PropTypes.string.isRequired,
  action: PropTypes.func,
  rightView: PropTypes.object,
  isLast: PropTypes.bool,
  type: PropTypes.string,
};

ListViewItem.defaultProps = {
  action: null,
  rightView: null,
  isLast: false,
  type: null,
};

export default ListViewItem;


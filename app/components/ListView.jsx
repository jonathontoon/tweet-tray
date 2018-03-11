import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import TinyColor from 'tinycolor2';

import SwitchListViewItem from './SwitchListViewItem';
import ListViewItem from './ListViewItem';

import * as constants from '../constants';

const ListViewStyle = Styled.div`
  overflow: hidden;
  position: absolute;
  left: 0px;
  top: 0px;
  min-width: 100%;
  height: auto;
  background-color: ${(props) => {
    return props.theme === 'day' ? constants.LIGHT_GREY : constants.DARK_MODE_BACKGROUND;
  }}
`;

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

const ListView = (props) => {
  const { dataSource, color, theme, } = props;
  const onColor = TinyColor(color).lighten(25).toString();
  return (
    <ListViewStyle
      theme={theme}
    >
      {dataSource.map((section) => {
        return (
          <ListViewSectionStyle
            theme={theme}
            key={section.title}
          >
            {section.items.map((item, i) => {
              if (item.type === 'switch') {
                return (
                  <SwitchListViewItem
                    key={item.title}
                    theme={theme}
                    title={item.title}
                    onColor={onColor}
                    onHandleColor={color}
                    action={item.action}
                    type={item.type}
                    state={item.state}
                    isLast={section.items.length - 1 === i}
                  />
                );
              }
              return (
                <ListViewItem
                  key={item.title}
                  theme={theme}
                  title={item.title}
                  action={item.action}
                  type={item.type}
                  isLast={section.items.length - 1 === i}
                />
              );
            })}
          </ListViewSectionStyle>
        );
      })}
    </ListViewStyle>
  );
};

ListView.propTypes = {
  theme: PropTypes.string,
  dataSource: PropTypes.array.isRequired,
  color: PropTypes.string.isRequired,
};

ListView.defaultProps = {
  theme: 'day',
};

export default ListView;


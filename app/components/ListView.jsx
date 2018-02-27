import React from 'react';
import PropTypes from 'prop-types';

import Styled from 'styled-components';
import Theme from 'styled-theming';

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
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    background-color: ${Theme('mode', { day: constants.LIGHT_GREY, night: constants.DARK_MODE_BACKGROUND, })};
`;

const ListViewSectionStyle = Styled.div`
    overflow: hidden;
    position: relative;
    margin-top: ${constants.SPACING}px;
    border-top: 1px ${Theme('mode', { day: constants.BORDER_GREY, night: constants.DARK_MODE_BACKGROUND, })} solid;
    border-bottom: 1px ${Theme('mode', { day: constants.BORDER_GREY, night: constants.DARK_MODE_BACKGROUND, })} solid;

    button:last-child {
      border-bottom: none;
    }
`;

const ListView = (props) => {
  const { dataSource, } = props;
  return (
    <ListViewStyle>
      {dataSource.map((section) => {
        return (
          <ListViewSectionStyle key={section.title}>
            {section.items.map((item, i) => {
              if (item.type === 'switch') {
                return (
                  <SwitchListViewItem
                    key={item.title}
                    title={item.title}
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
  dataSource: PropTypes.array.isRequired,
};

export default ListView;


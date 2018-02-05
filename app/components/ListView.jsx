import React from 'react';
import PropTypes from 'prop-types';

import Styled from 'styled-components';
import Theme from 'styled-theming';

import ListViewItem from './ListViewItem';

import * as constants from '../constants';

const ListViewStyle = Styled.div`
    overflow: hidden;
    position: absolute;
    left: 0px;
    bottom: 0px;
    min-width: 100%;
    height: auto;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    background-color: ${Theme('mode', { day: constants.WHITE, night: constants.DARK_MODE_FOREGROUND, })};
    box-shadow: 0px -1px 25px rgba(0,0,0,0.1);
`;

const ListView = (props) => {
  const { dataSource, } = props;
  return (
    <ListViewStyle>
      {dataSource.map((item) => {
          return (
            <ListViewItem
              key={item.title}
              title={item.title}
              action={item.action}
              type={item.type}
              right={item.right}
            />
          );
        })}
    </ListViewStyle>
  );
};

ListView.propTypes = {
  dataSource: PropTypes.array.isRequired,
};

export default ListView;


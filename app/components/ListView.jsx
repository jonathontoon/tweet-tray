import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';

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

const ListView = (props) => {
  const { children, theme, } = props;
  return (
    <ListViewStyle theme={theme}>
      {children}
    </ListViewStyle>
  );
};

ListView.propTypes = {
  theme: PropTypes.string,
};

ListView.defaultProps = {
  theme: 'day',
};

export default ListView;


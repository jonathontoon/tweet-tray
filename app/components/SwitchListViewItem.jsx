import React from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-switch';

import ListViewItem from './ListViewItem';

import * as constants from '../constants';

const SwitchListViewItem = (props) => {
  const {
    action,
    state,
    isLast,
    title,
    type,
  } = props;

  return (
    <ListViewItem
      title={title}
      isLast={isLast}
      type={type}
      rightView={
        <Switch
          onColor="#91C6F6"
          onHandleColor={constants.BLUE}
          offColor={constants.MID_GREY}
          offHandleColor={constants.WHITE}
          handleDiameter={28}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 5px rgba(0, 0, 0, 0.15)"
          height={18}
          width={48}
          onChange={action}
          checked={state}
        />
      }
    />
  );
};

SwitchListViewItem.propTypes = {
  action: PropTypes.func,
  state: PropTypes.bool,
  isLast: PropTypes.bool,
  title: PropTypes.string,
  type: PropTypes.string,
};

SwitchListViewItem.defaultProps = {
  action: null,
  state: false,
  isLast: false,
  title: null,
  type: null,
};

export default SwitchListViewItem;


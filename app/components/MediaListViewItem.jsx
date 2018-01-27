import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';

import RemoveIcon from '../../resources/remove.svg';

import * as constants from '../constants';

const MediaListViewItemStyle = Styled.div`
  position: relative;

  &:not(:last-child) {
   margin-bottom: ${constants.SPACING}px;
  }
`;

const MediaImageStyle = Styled.img`
  width: 100%;
  height: auto;
  background-color: ${constants.LIGHT_GREY};
`;

const MediaCloseButtonStyle = Styled.button`
  width: 28px;
  height: 28px;
  background-color: transparent;
  outline: 0;
  border: 0;
  position: absolute;
  top: 10px;
  right: 10px;
  transition: all 0.3s ease 0s;

  &:hover {
    opacity: 0.8;
    cursor: pointer;
    transition: all 0.3s ease 0s;
  }
`;

const MediaListViewItem = (props) => {
  const { media, action, } = props;
  return (
    <MediaListViewItemStyle>
      <MediaImageStyle src={`data:image/jpeg;base64,${media.data}`} alt="To Upload" />
      <MediaCloseButtonStyle onClick={action}>
        <img src={RemoveIcon} alt="Remove Icon" />
      </MediaCloseButtonStyle>
    </MediaListViewItemStyle>
  );
};

MediaListViewItem.propTypes = {
  media: PropTypes.object.isRequired,
  action: PropTypes.func.isRequired,
};

export default MediaListViewItem;


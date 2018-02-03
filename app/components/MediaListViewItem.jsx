import path from 'path';
import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';

import RemoveIcon from '../../resources/remove.svg';
import GIFLabelIcon from '../../resources/gif-label.svg';

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
  border-radius: 2px;
`;

const MediaGIFLabelStyle = Styled.img`
  user-select: none;
  width: 34px;
  height: 18px;
  padding: 2px;
  padding-bottom: 3px;
  padding-top: 3px;
  border-radius: 4px;
  outline: 0;
  border: 0;
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-color: ${constants.OPAQUE_BLACK};
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
      {path.extname(media.path) === '.gif' && (
        <MediaGIFLabelStyle src={GIFLabelIcon} alt="GIF" />
      )}
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


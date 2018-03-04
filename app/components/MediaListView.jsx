import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';

import MediaListViewItem from './MediaListViewItem';

const MediaListView = (props) => {
  const { dataSource, onRemoveImage, } = props;
  return (
    <Fragment>
      {dataSource && dataSource.map((image) => {
          return (
            <MediaListViewItem
              key={image.path}
              media={image}
              action={() => {
                onRemoveImage();
              }}
            />
          );
        })}
    </Fragment>
  );
};

MediaListView.propTypes = {
  dataSource: PropTypes.array,
  onRemoveImage: PropTypes.func.isRequired,
};

MediaListView.defaultProps = {
  dataSource: [],
};

export default MediaListView;


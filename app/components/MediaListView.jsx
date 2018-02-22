import React from 'react';
import PropTypes from 'prop-types';

import MediaListViewItem from './MediaListViewItem';

const MediaListView = (props) => {
  const { dataSource, onRemoveImage, } = props;
  return (
    <div>
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
    </div>
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


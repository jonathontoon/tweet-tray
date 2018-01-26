import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import Theme from 'styled-theming';

import Header from './Header';
import Settings from './Settings';
import InnerContent from './InnerContent';
import UserProfilePhoto from './UserProfilePhoto';
import IconButton from './IconButton';
import StatusInput from './StatusInput';
import MediaListView from './MediaListView';
import RoundedButton from './RoundedButton';
import Footer from './Footer';

import * as constants from '../constants';

import SettingsIcon from '../../resources/settings.svg';
import PhotoIcon from '../../resources/photo.svg';

const { ipcRenderer, } = window.require('electron');

const ComposerStyle = Styled.section`
  overflow: hidden;
  user-select: none;
  width: ${window.innerWidth}px;
  height: ${window.innerHeight}px;
  background-color: ${Theme('mode', { day: constants.WHITE, night: constants.DARK_MODE_BACKGROUND, })};
  position: relative;
`;

class Composer extends Component {
  static propTypes = {
    weightedStatus: PropTypes.object,
    accessTokenPair: PropTypes.object,
    onToggleSettingsVisibility: PropTypes.func.isRequired,
    onUpdateWeightedStatus: PropTypes.func.isRequired,
  };

  static defaultProps = {
    weightedStatus: null,
    accessTokenPair: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };

    this._addImage = this._addImage.bind(this);
    this._removeImage = this._removeImage.bind(this);
    this._postStatus = this._postStatus.bind(this);
  }

  componentDidMount() {
    ipcRenderer.on('addImageComplete', (event, response) => {
      this._addImage(response);
    });

    ipcRenderer.on('postStatusComplete', () => {
      this.setState({
        image: null,
      });
      this.props.onUpdateWeightedStatus(null);
      this.forceUpdate();
    });
  }

  _addImage(newImage) {
    this.setState({
      image: newImage,
    });
  }

  _removeImage() {
    this.setState({
      image: null,
    });
  }

  _postStatus(e) {
    e.preventDefault();

    const { image, } = this.state;
    const { accessTokenPair, weightedStatus, } = this.props;

    const statusText = weightedStatus === null ? '' : weightedStatus.text;
    const imageData = image ? image.data : null;

    ipcRenderer.send('postStatus', {
      accessTokenPair,
      statusText,
      imageData,
    });

    this._composerForm.reset();
  }

  render() {
    const { image, } = this.state;
    const { weightedStatus, onToggleSettingsVisibility, } = this.props;

    const imageDataSource = image !== null ? [image, ] : null;

    return (
      <ComposerStyle>
        <Header
          title="Compose Tweet"
          right={
            <IconButton
              iconSrc={SettingsIcon}
              altText="Open Settings"
              onClick={() => {
                onToggleSettingsVisibility(true);
              }}
            />
          }
        />
        <form
          onSubmit={this._postStatus}
          style={{
            display: 'inline',
          }}
          ref={(el) => {
            this._composerForm = el;
          }}
        >
          <InnerContent
            style={{
              position: 'relative',
              top: '48px',
              left: '0px',
              minHeight: '180px',
              height: 'calc(100% - 133px)',
            }}
          >
            <UserProfilePhoto />
            <StatusInput />
            <MediaListView
              dataSource={imageDataSource}
              onRemoveImage={() => {
                this._removeImage();
              }}
            />
          </InnerContent>
          <Footer
            left={
              <IconButton
                disabled={image !== null}
                iconSrc={PhotoIcon}
                altText="Add Photo"
                onClick={(e) => {
                  e.preventDefault();
                  ipcRenderer.send('addImage');
                }}
              />
            }
            right={
              <RoundedButton
                disabled={weightedStatus === null && image === null}
                title="Tweet"
                fullWidth={false}
                type="submit"
              />
            }
          />
        </form>
        <Settings />
      </ComposerStyle>
    );
  }
}

export default Composer;


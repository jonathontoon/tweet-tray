import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import Theme from 'styled-theming';

import ConnectUtilities from '../containers/ConnectUtilities';

import Header from './Header';
import SettingsContainer from '../containers/SettingsContainer';
import InnerContent from './InnerContent';
import UserProfilePhoto from './UserProfilePhoto';
import IconButton from './IconButton';
import StatusInput from './StatusInput';
import MediaListView from './MediaListView';
import RoundedButton from './RoundedButton';
import Footer from './Footer';

import * as constants from '../constants';

import ImageDialog from '../utils/ImageDialog';

import SettingsIcon from '../../resources/settings.svg';
import PhotoIcon from '../../resources/photo.svg';

const { renderProcess, shell, } = window;

const ComposerStyle = Styled.section`
  overflow: hidden;
  user-select: none;
  width: 100%;
  height: 100%;
  background-color: ${Theme('mode', { day: constants.WHITE, night: constants.DARK_MODE_BACKGROUND, })};
  position: relative;
`;

class Composer extends Component {
  static propTypes = {
    weightedStatus: PropTypes.object,
    userCredentials: PropTypes.object,
    accessTokenPair: PropTypes.object,
    onToggleSettingsVisibility: PropTypes.func.isRequired,
    onUpdateWeightedStatus: PropTypes.func.isRequired,
    notificationManager: PropTypes.object.isRequired,
    localeManager: PropTypes.object.isRequired,
  };

  static defaultProps = {
    weightedStatus: null,
    userCredentials: null,
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
    const { notificationManager, localeManager, } = this.props;

    renderProcess.on('postStatusError', () => {
      notificationManager.send(
        localeManager.post_status_error.title,
        localeManager.post_status_error.description,
      );
    });

    renderProcess.on('postStatusComplete', (event, response) => {
      notificationManager.send(
        localeManager.post_status_success.title,
        localeManager.post_status_success.description,
        () => {
          shell.openExternal(`https://twitter.com/${response.user.screen_name}/status/${response.id_str}`);
        }
      );
    });

    renderProcess.on('addImageComplete', (event, response) => {
      this._addImage(response);
    });

    renderProcess.on('addGIFComplete', (event, response) => {
      this._addImage(response);
    });

    renderProcess.on('send-tweet-shortcut', () => {
      this._postStatus();
    });
  }

  _addImage() {
    ImageDialog((newImage) => {
      this.setState({
        image: newImage,
      });
    });
  }

  _removeImage() {
    this.setState({
      image: null,
    });
  }

  _postStatus(e) {
    if (e) {
      e.preventDefault();
    }

    const { image, } = this.state;
    const { accessTokenPair, weightedStatus, } = this.props;

    const statusText = weightedStatus === null ? '' : weightedStatus.text;
    const imageData = image ? image.data : null;

    renderProcess.send('postStatus', {
      accessTokenPair,
      statusText,
      imageData,
    });

    this.setState({ image: null, });
    this.props.onUpdateWeightedStatus(null);
    this.forceUpdate();
  }

  render() {
    const { image, } = this.state;
    const {
      userCredentials,
      weightedStatus,
      onUpdateWeightedStatus,
      onToggleSettingsVisibility,
      localeManager,
    } = this.props;

    const profilePhotoURL = userCredentials !== null ? userCredentials.profileImageURL : null;
    const weightedStatusText = weightedStatus === null ? null : weightedStatus.text;
    const weightedTextAmount = weightedStatus !== null ? weightedStatus.permillage : null;
    const imageDataSource = image !== null ? [image, ] : null;

    return (
      <ComposerStyle>
        <Header
          title={localeManager.composer.title}
          right={
            <IconButton
              iconSrc={SettingsIcon}
              altText={localeManager.composer.settings_alt_text}
              onClick={() => {
                onToggleSettingsVisibility(true);
              }}
            />
          }
        />
        <InnerContent
          style={{
            position: 'relative',
            top: '51px',
            left: '0px',
            minHeight: '180px',
            height: 'calc(100% - 136px)',
          }}
        >
          <UserProfilePhoto
            profilePhotoURL={profilePhotoURL}
            weightedTextAmount={weightedTextAmount}
          />
          <StatusInput
            placeholder={localeManager.composer.placeholder}
            weightedStatusText={weightedStatusText}
            updateWeightedStatus={onUpdateWeightedStatus}
          />
          <MediaListView
            dataSource={imageDataSource}
            onRemoveImage={() => {
              this._removeImage();
            }}
          />
        </InnerContent>
        <Footer
          left={
            <Fragment>
              <IconButton
                disabled={image !== null}
                iconSrc={PhotoIcon}
                altText={localeManager.composer.image_alt_text}
                onClick={(e) => {
                  e.preventDefault();
                  this._addImage();
                }}
              />
            </Fragment>
            }
          right={
            <RoundedButton
              disabled={weightedStatus === null && image === null}
              title={localeManager.composer.tweet_button}
              fullWidth={false}
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                this._postStatus();
              }}
            />
            }
        />
        <SettingsContainer />
      </ComposerStyle>
    );
  }
}

export default ConnectUtilities(Composer);


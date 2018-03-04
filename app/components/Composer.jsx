import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import Theme from 'styled-theming';

import ConnectUtilities from '../containers/ConnectUtilities';

import Header from './Header';
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
    profileImageURL: PropTypes.string,
    accessTokenPair: PropTypes.object,
    onUpdateWeightedStatus: PropTypes.func.isRequired,
    renderProcess: PropTypes.object.isRequired,
    shell: PropTypes.object.isRequired,
    notificationManager: PropTypes.object.isRequired,
    localeManager: PropTypes.object.isRequired,
  };

  static defaultProps = {
    weightedStatus: null,
    profileImageURL: null,
    accessTokenPair: null,
  };

  static contextTypes = {
    router: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };

    this.addImage = this.addImage.bind(this);
    this.removeImage = this.removeImage.bind(this);
    this.postStatus = this.postStatus.bind(this);
    this.goToSettings = this.goToSettings.bind(this);
  }

  componentDidMount() {
    const {
      renderProcess,
      shell,
      notificationManager,
      localeManager,
    } = this.props;

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

    renderProcess.on('send-tweet-shortcut', () => {
      this.postStatus();
    });
  }

  addImage(e) {
    if (e) {
      e.preventDefault();
    }
    ImageDialog((newImage) => {
      this.setState({
        image: newImage,
      });
    });
  }

  removeImage() {
    this.setState({
      image: null,
    });
  }

  postStatus(e) {
    if (e) {
      e.preventDefault();
    }

    const { image, } = this.state;
    const { renderProcess, accessTokenPair, weightedStatus, } = this.props;

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

  goToSettings() {
    this.context.router.history.replace('/settings');
  }

  render() {
    const { image, } = this.state;
    const {
      profileImageURL,
      weightedStatus,
      onUpdateWeightedStatus,
      localeManager,
    } = this.props;

    const weightedStatusText = weightedStatus === null ? null : weightedStatus.text;
    const weightedTextAmount = weightedStatus !== null ? weightedStatus.permillage : null;
    const imageDataSource = image !== null ? [image, ] : null;

    return (
      <ComposerStyle>
        <Header
          title={
            localeManager.composer.title
          }
          rightView={
            <IconButton
              iconSrc={SettingsIcon}
              altText={localeManager.composer.settings_alt_text}
              onClick={this.goToSettings}
            />
          }
        />
        <InnerContent
          style={{
            position: 'relative',
            top: '48px',
            left: '0px',
            minHeight: '180px',
            height: 'calc(100% - 132px)',
          }}
        >
          <UserProfilePhoto
            profilePhotoURL={profileImageURL}
            weightedTextAmount={weightedTextAmount}
          />
          <StatusInput
            placeholder={localeManager.composer.placeholder}
            weightedStatusText={weightedStatusText}
            updateWeightedStatus={onUpdateWeightedStatus}
          />
          <MediaListView
            dataSource={imageDataSource}
            onRemoveImage={this.removeImage}
          />
        </InnerContent>
        <Footer
          leftView={
            <IconButton
              disabled={image !== null}
              iconSrc={PhotoIcon}
              altText={localeManager.composer.image_alt_text}
              onClick={this.addImage}
            />
          }
          rightView={
            <RoundedButton
              disabled={weightedStatus === null && image === null}
              title={localeManager.composer.tweet_button}
              fullWidth={false}
              type="submit"
              onClick={this.postStatus}
            />
            }
        />
      </ComposerStyle>
    );
  }
}

export default ConnectUtilities(Composer);


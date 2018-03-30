import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import { connect, } from 'react-redux';

import Header from './Header';
import InnerContent from './InnerContent';
import UserProfilePhoto from './UserProfilePhoto';
import IconButton from './IconButton';
import StatusInput from './StatusInput';
import MediaListView from './MediaListView';
import RoundedButton from './RoundedButton';
import Footer from './Footer';

import * as constants from '../constants';

import SystemNotification from '../utils/SystemNotification';
import ImageDialog from '../utils/ImageDialog';

import Utilities from '../containers/Utilities';

const ComposerStyle = Styled.section`
  overflow: hidden;
  user-select: none;
  width: 100%;
  height: 100%;
  background-color: ${(props) => {
    return props.theme === 'day' ? constants.WHITE : constants.DARK_MODE_BACKGROUND;
  }};
  position: relative;
`;

class Composer extends Component {
  static propTypes = {
    theme: PropTypes.string.isRequired,
    weightedStatus: PropTypes.object.isRequired,
    statusImage: PropTypes.object,
    profileImageURL: PropTypes.string,
    profileLinkColor: PropTypes.string.isRequired,
    accessTokenPair: PropTypes.object,
    onUpdateWeightedStatus: PropTypes.func.isRequired,
    onSetStatusImage: PropTypes.func.isRequired,
    renderProcess: PropTypes.object.isRequired,
    shell: PropTypes.object.isRequired,
    localeManager: PropTypes.object.isRequired,
  };

  static defaultProps = {
    statusImage: null,
    profileImageURL: null,
    accessTokenPair: null,
  };

  static contextTypes = {
    router: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.addImage = this.addImage.bind(this);
    this.removeImage = this.removeImage.bind(this);
    this.startPostStatus = this.startPostStatus.bind(this);
    this.goToSettings = this.goToSettings.bind(this);
  }

  componentDidMount() {
    const {
      renderProcess,
      shell,
      localeManager,
    } = this.props;

    renderProcess.on('uploadError', () => {
      SystemNotification(
        localeManager.post_status_error.title,
        localeManager.post_status_error.description,
        false,
      );
    });

    renderProcess.on('postStatusError', () => {
      SystemNotification(
        localeManager.post_status_error.title,
        localeManager.post_status_error.description,
        false,
      );
    });

    renderProcess.on('postStatusComplete', (event, response) => {
      const { id_str, user, } = response; /* eslint camelcase: 0 */

      SystemNotification(
        localeManager.post_status_success.title,
        localeManager.post_status_success.description,
        false,
        () => {
          shell.openExternal(`https://twitter.com/${user.screen_name}/status/${id_str}`);
        }
      );
    });

    renderProcess.on('startPostStatusShortcut', () => {
      this.startPostStatus();
    });
  }

  componentWillUnmount() {
    const { renderProcess, } = this.props;
    renderProcess.removeAllListeners(['uploadError', 'postStatusError', 'postStatusComplete', 'startPostStatusShortcut', ]);
  }

  addImage(e) {
    const { onSetStatusImage, } = this.props;
    if (e) {
      e.preventDefault();
    }
    ImageDialog((newImage) => {
      onSetStatusImage(newImage);
    });
  }

  removeImage() {
    const { onSetStatusImage, } = this.props;
    onSetStatusImage(null);
  }

  startPostStatus(e) {
    const {
      renderProcess,
      accessTokenPair,
      weightedStatus,
      statusImage,
      onUpdateWeightedStatus,
      onSetStatusImage,
    } = this.props;

    if (e) {
      e.preventDefault();
    }

    renderProcess.send('postStatus', {
      accessTokenPair,
      statusText: weightedStatus.text,
      imageData: statusImage ? statusImage.data : null,
    });

    onSetStatusImage(null);
    onUpdateWeightedStatus({
      text: '',
      weightedLength: 0,
      permillage: 0,
      valid: true,
      displayRangeStart: 0,
      displayRangeEnd: 0,
      validDisplayRangeStart: 0,
      validDisplayRangeEnd: 0,
    });
  }

  goToSettings() {
    this.context.router.history.replace('/settings');
  }

  render() {
    const {
      theme,
      profileImageURL,
      profileLinkColor,
      weightedStatus,
      statusImage,
      onUpdateWeightedStatus,
      localeManager,
    } = this.props;

    const imageDataSource = statusImage !== null ? [statusImage, ] : null;

    return (
      <ComposerStyle
        theme={theme}
      >
        <Header
          theme={theme}
          title={
            localeManager.composer.title
          }
          rightView={
            <IconButton
              theme={theme}
              icon="settings"
              color={profileLinkColor}
              onClick={this.goToSettings}
            />
          }
        />
        <InnerContent
          theme={theme}
          style={{
            position: 'relative',
            top: '48px',
            left: '0px',
            minHeight: '180px',
            height: 'calc(100% - 132px)',
          }}
        >
          <UserProfilePhoto
            theme={theme}
            profilePhotoURL={profileImageURL}
            arcColor={profileLinkColor}
            weightedTextAmount={weightedStatus.permillage}
          />
          <StatusInput
            theme={theme}
            placeholder={localeManager.composer.placeholder}
            weightedStatusText={weightedStatus.text}
            updateWeightedStatus={onUpdateWeightedStatus}
          />
          <MediaListView
            dataSource={imageDataSource}
            onRemoveImage={this.removeImage}
          />
        </InnerContent>
        <Footer
          theme={theme}
          leftView={
            <IconButton
              theme={theme}
              disabled={imageDataSource !== null}
              icon="photo"
              color={profileLinkColor}
              onClick={this.addImage}
            />
          }
          rightView={
            <RoundedButton
              theme={theme}
              disabled={weightedStatus.weightedLength === 0 && imageDataSource === null}
              title={localeManager.composer.tweet_button}
              color={profileLinkColor}
              fullWidth={false}
              type="submit"
              onClick={this.startPostStatus}
            />
            }
        />
      </ComposerStyle>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    theme: store.theme,
  };
};

export default connect(mapStateToProps, null)(Utilities(Composer));

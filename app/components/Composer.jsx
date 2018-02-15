import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import Theme from 'styled-theming';
import Localize from 'localize';

import Notifier from '../utils/Notifier';
import Locale from '../utils/Locale';

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

import PostStatusErrorStrings from '../translations/PostStatusError';
import PostStatusSuccessStrings from '../translations/PostStatusSuccess';
import ComposerStrings from '../translations/Composer';

import SettingsIcon from '../../resources/settings.svg';
import PhotoIcon from '../../resources/photo.svg';
import NotificationIcon from '../../resources/notification.jpg';

const { ipcRenderer, shell, } = window.require('electron');

const postStatusErrorLocalizations = new Localize(PostStatusErrorStrings);
postStatusErrorLocalizations.setLocale(Locale());

const postStatusSuccessLocalizations = new Localize(PostStatusSuccessStrings);
postStatusSuccessLocalizations.setLocale(Locale());

const composerLocalizations = new Localize(ComposerStrings);
composerLocalizations.setLocale(Locale());

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

    ipcRenderer.on('addGIFComplete', (event, response) => {
      this._addImage(response);
    });

    ipcRenderer.on('postStatusError', (event, response) => {
      Notifier(postStatusErrorLocalizations.translate('title'), postStatusErrorLocalizations.translate('description'), false, NotificationIcon, null);
    });

    ipcRenderer.on('postStatusComplete', (event, response) => {
      Notifier(postStatusSuccessLocalizations.translate('title'), postStatusSuccessLocalizations.translate('description'), false, NotificationIcon, () => {
        shell.openExternal(`https://twitter.com/${response.user.screen_name}/status/${response.id_str}`);
      });
    });

    ipcRenderer.on('send-tweet-shortcut', () => {
      this._postStatus();
    });
  }

  _addImage(newImage) {
    if (newImage !== null) {
      this.setState({
        image: newImage,
      });
    }
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

    const statusData = {
      accessTokenPair,
      statusText,
      imageData,
    };

    this.setState({
      image: null,
    });
    this.props.onUpdateWeightedStatus(null);
    this._composerForm.reset();
    ipcRenderer.send('postStatus', statusData);
    this.forceUpdate();
  }

  render() {
    const { image, } = this.state;
    const { weightedStatus, onToggleSettingsVisibility, } = this.props;

    const imageDataSource = image !== null ? [image, ] : null;

    return (
      <ComposerStyle>
        <Header
          title={composerLocalizations.translate('title')}
          right={
            <IconButton
              iconSrc={SettingsIcon}
              altText={composerLocalizations.translate('settings_alt')}
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
              top: '51px',
              left: '0px',
              minHeight: '180px',
              height: 'calc(100% - 136px)',
            }}
          >
            <UserProfilePhoto />
            <StatusInput placeholder={composerLocalizations.translate('status_placeholder')}/>
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
                  altText={composerLocalizations.translate('add_photo_alt')}
                  onClick={(e) => {
                    e.preventDefault();
                    ipcRenderer.send('addImage');
                  }}
                />
              </Fragment>
            }
            right={
              <RoundedButton
                disabled={weightedStatus === null && image === null}
                title={composerLocalizations.translate('tweet_button')}
                fullWidth={false}
                type="submit"
              />
            }
          />
        </form>
        <SettingsContainer />
      </ComposerStyle>
    );
  }
}

export default Composer;


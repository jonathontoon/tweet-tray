import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import Theme from 'styled-theming';

import ConnectUtilities from '../containers/ConnectUtilities';

import Header from './Header';
import IconButton from './IconButton';
import InnerContent from './InnerContent';
import ListView from './ListView';

import * as constants from '../constants';

import BackIcon from '../../resources/back.svg';

const SettingsStyle = Styled.section`
    overflow: hidden;
    user-select: none;
    width: 100%;
    height: 100%;
    background-color: ${Theme('mode', { day: constants.LIGHT_GREY, night: constants.DARK_MODE_BACKGROUND, })};
    position: relative;
`;

class Settings extends Component {
  static propTypes = {
    launchOnStartUp: PropTypes.bool.isRequired,
    colorTheme: PropTypes.string.isRequired,
    onToggleLaunchOnStartUp: PropTypes.func.isRequired,
    onToggleColorTheme: PropTypes.func.isRequired,
    renderProcess: PropTypes.object.isRequired,
    shouldLogout: PropTypes.func.isRequired,
    localeManager: PropTypes.object.isRequired,
  };

  static contextTypes = {
    router: PropTypes.object,
  };

  render() {
    const {
      launchOnStartUp,
      colorTheme,
      onToggleLaunchOnStartUp,
      onToggleColorTheme,
      shouldLogout,
      renderProcess,
      localeManager,
    } = this.props;

    return (
      <SettingsStyle>
        <Header
          title={localeManager.settings.title}
          leftView={
            <IconButton
              iconSrc={BackIcon}
              altText={localeManager.composer.settings_alt_text}
              onClick={() => {
                this.context.router.history.replace('/composer');
              }}
            />
          }
        />
        <InnerContent
          style={{
            position: 'relative',
            top: '51px',
            left: '0px',
            height: 'calc(100% - 81px)',
          }}
        >
          <ListView
            dataSource={[
              {
                title: 'Customization',
                items: [{
                  title: localeManager.settings.night_mode_enable_action,
                  action: () => {
                    onToggleColorTheme(colorTheme === 'day' ? 'night' : 'day');
                  },
                  state: colorTheme !== 'day',
                  type: 'switch',
                }, {
                  title: 'Launch at System Start',
                  action: (checked) => {
                    if (checked) {
                      renderProcess.send('enableAtStartUp');
                    } else {
                      renderProcess.send('disableAtStartUp');
                    }
                    onToggleLaunchOnStartUp(checked);
                  },
                  state: launchOnStartUp,
                  type: 'switch',
                }, ],
              },
              {
                title: 'Help',
                items: [{
                  title: 'View Website',
                  action: (e) => {
                    e.stopPropagation();
                    renderProcess.send('quitApplication');
                  },
                }, {
                  title: 'Read FAQ',
                  action: (e) => {
                    e.stopPropagation();
                    renderProcess.send('quitApplication');
                  },
                }, {
                  title: 'Report an Issue',
                  action: (e) => {
                    e.stopPropagation();
                    this.context.router.history.replace('/');
                    shouldLogout();
                  },
                }, ],
              },
              {
                title: 'Escape',
                items: [{
                  title: localeManager.settings.quit_action,
                  action: (e) => {
                    e.stopPropagation();
                    renderProcess.send('quitApplication');
                  },
                }, {
                  title: localeManager.settings.log_out_action,
                  action: (e) => {
                    e.stopPropagation();
                    this.context.router.history.replace('/');
                    shouldLogout();
                  },
                  type: 'warning',
                }, ],
              },
            ]}
          />
        </InnerContent>
      </SettingsStyle>
    );
  }
}

export default ConnectUtilities(Settings);


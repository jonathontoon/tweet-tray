import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';

import Utilities from '../containers/Utilities';

import Header from './Header';
import IconButton from './IconButton';
import InnerContent from './InnerContent';
import ListView from './ListView';

import * as constants from '../constants';

const SettingsStyle = Styled.section`
  overflow: hidden;
  user-select: none;
  width: 100%;
  height: 100%;
  background-color: ${(props) => {
    return props.theme === 'day' ? constants.LIGHT_GREY : constants.DARK_MODE_BACKGROUND;
  }};
  position: relative;
`;

const AppVersionStyle = Styled.section`
  position: absolute;
  left: 0px;
  bottom: 0px;
  width: 100%;
  height: 40px;
  color: ${(props) => {
    return props.theme === 'day' ? constants.BORDER_GREY : constants.GREY;
  }};
  font-size: ${constants.SMALL_FONT_SIZE}px;
  text-align: center;
  line-height: 40px;
`;

const Settings = (props, context) => {
  const {
    app,
    theme,
    launchOnStartUp,
    profileLinkColor,
    onToggleLaunchOnStartUp,
    onToggleTheme,
    shouldLogout,
    renderProcess,
    shell,
    localeManager,
  } = props;

  return (
    <SettingsStyle
      theme={theme}
    >
      <Header
        theme={theme}
        title={localeManager.settings.title}
        leftView={
          <IconButton
            theme={theme}
            icon="back"
            color={profileLinkColor}
            onClick={() => {
              context.router.history.replace('/composer');
            }}
          />
        }
      />
      <InnerContent
        theme={theme}
        style={{
          position: 'relative',
          top: '51px',
          left: '0px',
          height: 'calc(100% - 81px)',
        }}
      >
        <ListView
          theme={theme}
          color={profileLinkColor}
          dataSource={[
            {
              title: 'Customization',
              items: [{
                title: localeManager.settings.night_mode_action,
                action: () => {
                  onToggleTheme(theme === 'day' ? 'night' : 'day');
                },
                state: theme !== 'day',
                type: 'switch',
              }, {
                title: localeManager.settings.launch_start_up_action,
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
                title: localeManager.settings.view_website_action,
                action: (e) => {
                  e.stopPropagation();
                  shell.openExternal('https://github.com/jonathontoon/tweet-tray');
                },
              }, {
                title: localeManager.settings.read_faq_action,
                action: (e) => {
                  e.stopPropagation();
                  shell.openExternal('https://github.com/jonathontoon/tweet-tray/blob/master/README.md');
                },
              }, {
                title: localeManager.settings.report_issue_action,
                action: (e) => {
                  e.stopPropagation();
                  shell.openExternal('https://github.com/jonathontoon/tweet-tray/issues');
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
                  context.router.history.replace('/');
                  shouldLogout();
                },
                type: 'warning',
              }, ],
            },
          ]}
        />
        <AppVersionStyle>
          Version {app.getVersion()}
        </AppVersionStyle>
      </InnerContent>
    </SettingsStyle>
  );
};

Settings.propTypes = {
  theme: PropTypes.string,
  launchOnStartUp: PropTypes.bool.isRequired,
  profileLinkColor: PropTypes.string,
  onToggleLaunchOnStartUp: PropTypes.func.isRequired,
  onToggleTheme: PropTypes.func.isRequired,
  shouldLogout: PropTypes.func.isRequired,
  app: PropTypes.object.isRequired,
  renderProcess: PropTypes.object.isRequired,
  shell: PropTypes.object.isRequired,
  localeManager: PropTypes.object.isRequired,
};

Settings.defaultProps = {
  theme: 'day',
  profileLinkColor: constants.BLUE,
};

Settings.contextTypes = {
  router: PropTypes.object,
};

export default Utilities(Settings);

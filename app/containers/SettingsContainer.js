import { connect, } from 'react-redux';

import withRenderer from './withRenderer';

import { toggleSettingsVisibility, toggleColorTheme, onLogout, } from '../actions/index';
import Settings from '../components/Settings';

const mapStateToProps = (store) => {
  return {
    showSettings: store.settingsVisibility,
    colorTheme: store.colorTheme,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleSettingsVisibility: (settingsVisibility) => {
      dispatch(toggleSettingsVisibility(settingsVisibility));
    },
    onToggleColorTheme: (colorTheme) => {
      dispatch(toggleColorTheme(colorTheme));
    },
    shouldLogout() {
      dispatch(onLogout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRenderer(Settings));

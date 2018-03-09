import { connect, } from 'react-redux';

import { toggleLaunchOnStartUp, toggleColorTheme, onLogout, } from '../actions/index';
import Settings from '../components/Settings';

const mapStateToProps = (store) => {
  return {
    launchOnStartUp: store.launchOnStartUp,
    profileLinkColor: store.profileLinkColor,
    colorTheme: store.colorTheme,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleLaunchOnStartUp: (launchOnStartUp) => {
      dispatch(toggleLaunchOnStartUp(launchOnStartUp));
    },
    onToggleColorTheme: (colorTheme) => {
      dispatch(toggleColorTheme(colorTheme));
    },
    shouldLogout() {
      dispatch(onLogout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

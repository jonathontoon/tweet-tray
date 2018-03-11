import { connect, } from 'react-redux';

import { toggleLaunchOnStartUp, toggleTheme, onLogout, } from '../actions/index';
import Settings from '../components/Settings';

const mapStateToProps = (store) => {
  return {
    theme: store.theme,
    launchOnStartUp: store.launchOnStartUp,
    profileLinkColor: store.profileLinkColor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleLaunchOnStartUp: (launchOnStartUp) => {
      dispatch(toggleLaunchOnStartUp(launchOnStartUp));
    },
    onToggleTheme: (theme) => {
      dispatch(toggleTheme(theme));
    },
    shouldLogout() {
      dispatch(onLogout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

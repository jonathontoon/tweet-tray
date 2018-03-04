import { connect, } from 'react-redux';
import { withRouter, } from 'react-router-dom';
import { updateWeightedStatus, toggleSettingsVisibility, } from '../actions/index';
import Composer from '../components/Composer';

const mapStateToProps = (store) => {
  return {
    weightedStatus: store.weightedStatus,
    profileImageURL: store.profileImageURL,
    accessTokenPair: store.accessTokenPair,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleSettingsVisibility: (settingsVisibility) => {
      dispatch(toggleSettingsVisibility(settingsVisibility));
    },
    onUpdateWeightedStatus: (weightedStatus) => {
      dispatch(updateWeightedStatus(weightedStatus));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Composer));

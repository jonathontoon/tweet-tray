import { connect, } from 'react-redux';
import { withRouter, } from 'react-router-dom';
import { updateWeightedStatus, toggleSettingsVisibility, setStatusImage, } from '../actions/index';
import Composer from '../components/Composer';

const mapStateToProps = (store) => {
  return {
    weightedStatus: store.weightedStatus,
    statusImage: store.statusImage,
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
    onSetStatusImage: (statusImage) => {
      dispatch(setStatusImage(statusImage));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Composer));

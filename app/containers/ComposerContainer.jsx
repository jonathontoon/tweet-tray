import { connect, } from 'react-redux';
import { updateWeightedStatus, toggleSettingsVisibility, } from '../actions/index';
import Composer from '../components/Composer';

const mapStateToProps = (store) => {
  return {
    weightedStatus: store.weightedStatus,
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

export default connect(mapStateToProps, mapDispatchToProps)(Composer);

import { connect, } from 'react-redux';
import { withRouter, } from 'react-router-dom';
import { updateAccessTokenPair, setUserCredentials, } from '../actions';
import VerifierCode from '../components/VerifierCode';

const mapStateToProps = (store) => {
  return {
    requestTokenPair: store.requestTokenPair,
    router: store.router,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateAccessTokenPair: (accessTokenPair) => {
      dispatch(updateAccessTokenPair(accessTokenPair));
    },
    onSetUserCredentials: (userCredentials) => {
      dispatch(setUserCredentials(userCredentials));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VerifierCode));

import { connect, } from 'react-redux';
import { withRouter, } from 'react-router-dom';
import { updateAccessTokenPair, setUserCredentials, } from '../actions';
import AuthorizationCode from '../components/AuthorizationCode';

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthorizationCode));

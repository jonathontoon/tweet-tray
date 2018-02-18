import { connect, } from 'react-redux';
import { withRouter, } from 'react-router-dom';

import withRenderer from './withRenderer';

import { updateRequestTokenPair, } from '../actions';
import LogIn from '../components/LogIn';

const mapStateToProps = (store) => {
  return {
    router: store.router,
    accessTokenPair: store.accessTokenPair,
    userCredentials: store.userCredentials,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateRequestTokenPair: (requestTokenPair) => {
      dispatch(updateRequestTokenPair(requestTokenPair));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withRenderer(LogIn)));

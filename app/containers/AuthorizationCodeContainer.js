import { connect, } from 'react-redux';
import { withRouter, } from 'react-router-dom';
import { updateAccessTokenPair, setProfileImageURL, setProfileLinkColor, } from '../actions';
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
    onSetProfileImageURL: (profileImageURL) => {
      dispatch(setProfileImageURL(profileImageURL));
    },
    onSetProfileLinkColor: (profileLinkColor) => {
      dispatch(setProfileLinkColor(profileLinkColor));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthorizationCode));

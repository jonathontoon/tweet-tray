import { connect, } from 'react-redux';
import { updateAccessTokenPair, updateRequestTokenPair, setUserCredentials, } from '../actions';
import OAuth from '../components/OAuth';

const mapStateToProps = (store) => {
  return {
    requestTokenPair: store.requestTokenPair,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateAccessTokenPair: (accessTokenPair) => {
      dispatch(updateAccessTokenPair(accessTokenPair));
    },
    onUpdateRequestTokenPair: (requestTokenPair) => {
      dispatch(updateRequestTokenPair(requestTokenPair));
    },
    onSetUserCredentials: (userCredentials) => {
      dispatch(setUserCredentials(userCredentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OAuth);

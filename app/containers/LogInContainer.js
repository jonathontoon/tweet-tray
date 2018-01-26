import { connect, } from 'react-redux';
import { withRouter, } from 'react-router-dom';
import { updateRequestTokenPair, } from '../actions';
import LogIn from '../components/LogIn';

const mapStateToProps = (store) => {
  return {
    router: store.router,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateRequestTokenPair: (requestTokenPair) => {
      console.log(requestTokenPair);
      dispatch(updateRequestTokenPair(requestTokenPair));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LogIn));

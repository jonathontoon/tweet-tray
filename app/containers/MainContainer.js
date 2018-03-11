import { connect, } from 'react-redux';
import { withRouter, } from 'react-router-dom';
import Main from '../components/Main';

const mapStateToProps = (store) => {
  return {
    theme: store.theme,
  };
};

export default withRouter(connect(mapStateToProps, null)(Main));

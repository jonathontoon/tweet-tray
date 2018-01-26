import React from 'react';
import PropTypes from 'prop-types';
import { Provider, } from 'react-redux';
import { ConnectedRouter, } from 'react-router-redux';
import Routes from '../routes';

const NextRootContainer = (props) => {
  const { store, history, } = props;
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>
  );
};

NextRootContainer.propTypes = {
  store: PropTypes.object,
  history: PropTypes.object,
};

NextRootContainer.defaultProps = {
  store: {},
  history: {},
};

export default NextRootContainer;

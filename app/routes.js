import React from 'react';
import { Switch, Route, } from 'react-router';
import App from './containers/App';
import ComposerContainer from './containers/ComposerContainer';
import OAuthContainer from './containers/OAuthContainer';

const Routes = () => {
  return (
    <App>
      <Switch>
        <Route path="/" component={OAuthContainer} />
        <Route path="/composer" component={ComposerContainer} />
      </Switch>
    </App>
  );
};

export default Routes;

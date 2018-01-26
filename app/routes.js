import React from 'react';
import { Switch, Route, } from 'react-router';
import App from './containers/App';
import ComposerContainer from './containers/ComposerContainer';
import LogInContainer from './containers/LogInContainer';
import VerifierCodeContainer from './containers/VerifierCodeContainer';

const Routes = () => {
  return (
    <App>
      <Switch>
        <Route exact path="/" component={LogInContainer} />
        <Route exact path="/verifier" component={VerifierCodeContainer} />
        <Route exact path="/composer" component={ComposerContainer} />
      </Switch>
    </App>
  );
};

export default Routes;

import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Home from './Home';
import SearchPage from './SearchPage';

function Router() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/search" component={SearchPage} />
      </Switch>
    </HashRouter>
  );
}

export default Router;

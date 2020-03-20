import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Home from './Home';
import SearchResult from './SearchResult';

function Router() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/search" component={SearchResult} />
      </Switch>
    </HashRouter>
  );
}

export default Router;

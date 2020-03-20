import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Home from './Home';
import SearchResult from './SearchResult';
import ProductDetails from './ProductDetails';

function Router() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/search" component={SearchResult} />
        <Route exact path="/products/:id" component={ProductDetails} />
      </Switch>
    </HashRouter>
  );
}

export default Router;

import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Products from './Products';
import ProductDetails from './ProductDetails';

function Router() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/products/:id" component={ProductDetails} />
      </Switch>
    </HashRouter>
  );
}

export default Router;

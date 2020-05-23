import React from 'react';
import { Switch, Route } from 'react-router-dom';

import auth from './utils/auth';
import Home from './pages/home';
import Products from './pages/products';
import Login from './pages/login';
import Register from './pages/register';
import UserDashboard from './pages/user-dashboard';
import ToolCategory from './pages/tool-category';
import ToolsPage from './pages/tools-page';
import ToolPage from './pages/tool-page';
import AddProduct from './pages/add-product';

const Routes = () => {
  return (
    <Switch>
      <Route path='/' exact component={auth(Home, null)} />
      <Route path='/products' exact component={auth(Products, null)} />
      <Route path='/login' exact component={auth(Login, false)} />
      <Route path='/register' exact component={auth(Register, false)} />
      <Route
        path='/user/dashboard'
        exact
        component={auth(UserDashboard, true)}
      />
      <Route
        path='/admin/add_product'
        exact
        component={auth(AddProduct, true, true)}
      />
      <Route path='/products/tool/:id' component={auth(ToolPage, null)} />
      <Route
        path='/products/:category'
        exact
        component={auth(ToolCategory, null)}
      />
      <Route
        path='/products/:category/:subcategory'
        exact
        component={auth(ToolsPage, null)}
      />
    </Switch>
  );
};

export default Routes;

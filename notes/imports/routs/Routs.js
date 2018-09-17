import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './../ui/Login.js';
import Signup from './../ui/Signup.js';
import Dashboard from './../ui/Dashboard.js';
import NotFound from './../ui/NotFound.js';


export default (props) => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route exact path="/dashboard/:id" component={Dashboard}/>
        <Route path="*" component={NotFound}/>
      </Switch>
    </div>
  </BrowserRouter>
);

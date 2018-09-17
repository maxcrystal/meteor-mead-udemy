import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Login from './../ui/Login.js';
import Signup from './../ui/Signup.js';
import Link from './../ui/Link.js';
import NotFound from './../ui/NotFound.js';


export default (props) => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/links" component={Link}/>
        <Route path="*" component={NotFound}/>
      </Switch>
    </div>
  </BrowserRouter>
);

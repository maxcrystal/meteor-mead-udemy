import React from 'react';
import { Link } from 'react-router-dom';

import BoxedView from './BoxedView.js';


export default (props) => (
  <BoxedView className="shadow">
    <h1>404 - Page Not Found</h1>
    <p>Can't find the requested page.</p>
    <Link role="button" className="btn btn-primary" to="/">Home</Link>
  </BoxedView>
);

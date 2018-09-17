import React from 'react';
import {Link} from 'react-router-dom';

export default (props) => (
  <div className="boxed-view">
    <div className="boxed-view__box">
      <h1>404 - Page Not Found</h1>
      <p>Can't find the requested page.</p>
      <Link className="button button--link" to="/">Home</Link>
    </div>
  </div>
);

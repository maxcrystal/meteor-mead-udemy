import React from 'react';

import PrivateHeader from './PrivateHeader.js';


export default (props) => (
  <div>
    <PrivateHeader title="Dashboard"/> 
    <div className="page-content">  
      Dashboard content
    </div>
  </div>
);
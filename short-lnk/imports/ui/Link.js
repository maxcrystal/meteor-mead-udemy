import React from 'react';

import LinksList from './LinksList.js';
import PrivateHeader from './PrivateHeader.js';
import AddLink from './AddLink';
import LinksListFilter from './LinksListFilter.js';


export default (props) => (
  <div>
    <PrivateHeader title="Links"/> 
    <div className="page-content">  
      <LinksListFilter/>  
      <AddLink/> 
      <LinksList/>
    </div>
  </div>
);
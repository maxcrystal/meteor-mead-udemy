import React from 'react';
import { Jumbotron } from 'reactstrap';


export default (props) => {

  return (
    <div className="boxed-view">
      <Jumbotron className="shadow-sm">
        {props.children}
      </Jumbotron>
    </div>
  );
}

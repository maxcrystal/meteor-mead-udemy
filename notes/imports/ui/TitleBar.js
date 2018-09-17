import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { 
  Container, 
  Navbar, 
  NavbarToggler, 
  NavbarBrand, 
  Nav, 
  NavItem,
  Button 
} from 'reactstrap';


export const TitleBar = function(props) {
  return (
    <Navbar className="title-bar" dark>
        <NavbarToggler className="title-bar__toggler mr-3" onClick={props.handleNavToggle} />
        <NavbarBrand className="title-bar__brand mr-auto" >{props.title}</NavbarBrand>
        <Nav>
          <NavItem>
            <Button className="title-bar__link" color="link" onClick={() => props.handleLogout()}>Logout</Button>
          </NavItem>
        </Nav>  
    </Navbar>
  );
}

TitleBar.propTypes = {
  'title': PropTypes.string.isRequired,
  'handleLogout': PropTypes.func.isRequired,
  'handleNavToggle': PropTypes.func.isRequired,
  'isNavOpen': PropTypes.bool.isRequired,
};

export default withTracker(props => {
  return {
    handleLogout: () => Meteor.logout(),
    handleNavToggle: () => Session.set({'isNavOpen': !Session.get('isNavOpen')}),
    isNavOpen: Session.get('isNavOpen'), 
  };
})(TitleBar);

import React from 'react';
import { Container } from 'reactstrap';

import Private from './Private';
import TitleBar from './TitleBar';
import NoteList from './NoteList';
import Editor from './Editor';


const Dashboard = props => {
  return (
    <Private redirect="/">
      <TitleBar title="Notes" /> 
      <Container className="page-content d-flex">
        <NoteList />
        <Editor />
      </Container>
    </Private>
  );
};

export default Dashboard;

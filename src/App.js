import React, { Component } from 'react';
import {
  Container, InputGroup, Input, InputGroupAddon, Button, Col
} from 'reactstrap';
import { Map } from 'immutable';
import firebase from 'firebase';
import Note from './Note';
import * as db from './services/datastore';

class App extends Component {
  constructor(props) {
    super(props);
    // Don't do this!
    this.state = {
      workingTitle: '',
      notes: Map(),
    };
  }

  componentDidMount() {
    const config = {
      apiKey: 'AIzaSyDqEhnwOzI8by47k1NXVi6JavNfqe7Yf9U',
      authDomain: 'react-notes-92378.firebaseapp.com',
      databaseURL: 'https://react-notes-92378.firebaseio.com',
      projectId: 'react-notes-92378',
      storageBucket: 'react-notes-92378.appspot.com',
      messagingSenderId: '774801949525',
    };
    firebase.initializeApp(config);


    this.refreshNotes();
  }

  refreshNotes = () => {
    db.fetchNotes((notes) => {
      this.setState({ notes: Map(notes) });
    });
  }

  onUpdate = async (id, fields) => {
    await db.updateNote(id, fields);
    this.refreshNotes();
  }

  updateTitle = (e) => {
    this.setState({ workingTitle: e.target.value });
  }

  onNoteAdd = async () => {
    const { workingTitle } = this.state;
    await db.createNote({ title: workingTitle, x: 500 * Math.random(), y: 500 * Math.random() });
    this.refreshNotes();
  }

  onNoteDelete = async (id) => {
    await db.deleteNote(id);
    this.refreshNotes();
  }

  onDrag = (e, data, id) => {
    this.onUpdate(id, { x: data.x, y: data.y });
  }

  render() {
    const { notes } = this.state;

    return (
      <Container style={{ height: '100vh', width: '100vh', alignItems: 'center' }}>
        <Col style={{ maxWidth: '50vh', padding: 20, alignItems: 'center' }}>
        <h1>Sticky Note Board</h1>
          <InputGroup>
          <Input placeholder="Note Title" value={this.state.workingTitle} onChange={this.updateTitle} />
          <InputGroupAddon addonType="append">
            <Button onClick={this.onNoteAdd}>Create</Button>
          </InputGroupAddon>
        </InputGroup>
        </Col>
        {notes.entrySeq().map(([id, note]) => {
          return (
            <Note
              key={id}
              id={id}
              note={note}
              onUpdate={this.onUpdate}
              onDrag={this.onDrag}
              onNoteDelete={this.onNoteDelete}
            />
          );
        })}
      </Container>
    );
  }
}

export default App;

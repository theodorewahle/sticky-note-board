import React, { Component } from 'react';
import Draggable from 'react-draggable';
import {
  Container, InputGroup, Input, InputGroupAddon, Button
} from 'reactstrap';
import { Map } from 'immutable';
import Note from './Note';


class App extends Component {
  constructor(props) {
    super(props);
    // Don't do this!
    this.state = {
      workingTitle: "",
      notes: Map({
        1: {
          title: 'testing',
          text: 'I is a note',
          x: 400,
          y: 12,
          zIndex: 26,
        },
      }),
    };
  }

  onUpdate = (id, fields) => {
    console.log(' IN ON UPDATe');
    console.log(id, fields);
    this.setState(prevState => ({
      notes: prevState.notes.update(id, (n) => { return Object.assign({}, n, fields); }),
    }));
  }

  updateTitle = (e) => {
    this.setState({ workingTitle: e.target.value});
  }

  onNoteAdd = () => {
    const { notes, workingTitle } =  this.state
    const newNoteID = notes.size + 1
    this.setState(prevState => ({
      notes: prevState.notes.set(newNoteID, { title: workingTitle }),
      workingTitle: ""
    }));
  }

  render() {
    const { notes } = this.state;

    return (
      <Container>
        <InputGroup>
          <Input placeholder="Note Title" value={this.state.workingTitle} onChange={this.updateTitle}/>
          <InputGroupAddon addonType="append"><Button onClick={this.onNoteAdd}>Create</Button></InputGroupAddon>

        </InputGroup>
        {notes.entrySeq().map(([id, note]) => {
          return <Note key={id} id={id} note={note} onUpdate={this.onUpdate} />;
        })}
      </Container>
    );
  }
}

export default App;

import React, { Component } from 'react';
import Draggable from 'react-draggable';
import { Container } from 'reactstrap';
import { Map } from 'immutable';
import Note from './Note';

class App extends Component {
  constructor(props) {
    super(props);
    // Don't do this!
    this.state = {
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
    console.log(" IN ON UPDATe")
    console.log(id, fields);
    this.setState(prevState => ({
      notes: prevState.notes.update(id, (n) => { return Object.assign({}, n, fields); }),
    }));
  }


  render() {
    const { notes } = this.state;
    console.log(this.state);
    return (
      <Container>
        {notes.entrySeq().map(([id, note]) => {
          return <Note key={id} id={id} note={note} onUpdate={this.onUpdate} />;
        })}
      </Container>
    );
  }
}

export default App;

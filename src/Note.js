import React, { Component } from 'react';
import {
  Card, CardHeader, CardBody, CardFooter, Button, Row,
} from 'reactstrap';
import marked from 'marked';
import TextareaAutosize from 'react-textarea-autosize';
import Draggable from 'react-draggable';
import If from './components/If';

class Note extends Component {
  state = {
    editing: false,
  }

  render() {
    const {
      id, note, onUpdate, onNoteDelete, onDrag,
    } = this.props;
    const { title, text } = note;
    const { editing } = this.state;

    return (
      <Draggable
        handle=".handle"
        grid={[25, 25]}
        position={{ x: note.x, y: note.y }}
        onDrag={(e, data) => { onDrag(e, data, id); }}
      >
        <Card className="handle" style={{ width: 300, position: 'absolute' }}>
          <CardHeader tag="h3">{title}</CardHeader>
          <CardBody>
            <If condition={editing}>
              <TextareaAutosize
                onMouseDown={e => e.stopPropagation()}
                style={{ width: '100%', borderRadius: 3 }}
                value={text}
                onChange={(e) => { onUpdate(id, { text: e.target.value }); }}
              />
            </If>
            <If condition={!editing}>
              <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(text || '') }} />
            </If>
          </CardBody>
          <CardFooter>
            <Row>
              <If condition={!editing}>
                <Button color="primary" onClick={() => { this.setState({ editing: true }); }}>Edit</Button>
              </If>
              <If condition={editing}>
                <Button color="success" onClick={() => { this.setState({ editing: false }); }}>
            Save
                </Button>
              </If>
              <Button style={{ marginLeft: 4 }} color="danger" onClick={() => { onNoteDelete(id); }}>Delete</Button>
            </Row>
          </CardFooter>
        </Card>
      </Draggable>

    );
  }
}

export default Note;

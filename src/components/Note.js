import React, { Component } from 'react';
import {
  Card, CardHeader, CardBody, CardFooter, Button, Row,
} from 'reactstrap';
import Draggable from 'react-draggable';
import If from './If';
import EditableTextField from './EditableTextField';


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
        <Card className="handle" style={{ width: 300 }}>
          <CardHeader tag="h3">
            <EditableTextField
              text={title}
              editing={editing}
              handleChange={(e) => { onUpdate(id, { title: e.target.value }); }
          }
            />
          </CardHeader>
          <CardBody>
            <EditableTextField
              text={text}
              editing={editing}
              handleChange={(e) => { onUpdate(id, { text: e.target.value }); }
            }
            />
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
              <Button color="danger" onClick={() => { onNoteDelete(id); }}>Delete</Button>
            </Row>
          </CardFooter>
        </Card>
      </Draggable>

    );
  }
}


export default Note;

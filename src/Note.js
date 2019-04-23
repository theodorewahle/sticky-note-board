import React, { Component } from 'react';
import {
  Card, CardHeader, CardBody, CardText, CardFooter, Button, Row,
} from 'reactstrap';
import TextareaAutosize from 'react-textarea-autosize';
import Draggable from 'react-draggable';
import If from './components/If';

class Note extends Component {
  state = {
    editing: false,
  }

  render() {
    const { id, onUpdate, note } = this.props;
    const { title, text } = note;
    const { editing } = this.state;

    return (
      <Draggable
        handle=".handle"
        grid={[25, 25]}
        defaultPosition={{ x: 20, y: 20 }}
        position={{ x: note.x ? note.x : 20, y: note.y ? note.y : 20}}
        onDrag={(e, data) => { this.props.handleDrag(e, data, id)}}
      >
        <Card className="handle" style={{ width: 300 }}>
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
              <CardText>{text}</CardText>
            </If>
          </CardBody>

          <CardFooter>
            <Row>
              <If condition={!editing}>
                <Button onClick={() => { this.setState({ editing: true }); }}>Edit</Button>
              </If>
              <If condition={editing}>
                <Button onClick={() => { this.setState({ editing: false }); }}>
            Save
                </Button>
              </If>

              <Button>Delete</Button>
            </Row>
          </CardFooter>
        </Card>
      </Draggable>

    );
  }
}

export default Note;

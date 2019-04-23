import React from 'react';
import marked from 'marked';
import TextareaAutosize from 'react-textarea-autosize';
import If from './If';

function EditableTextField({ editing, text, handleChange }) {
  return (
    <div>
      <If condition={editing}>
        <TextareaAutosize
          onMouseDown={e => e.stopPropagation()}
          className="resize"
          value={text}
          onChange={handleChange}
        />
      </If>
      <If condition={!editing}>
        <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(text || '') }} />
      </If>
    </div>
  );
}

export default EditableTextField;

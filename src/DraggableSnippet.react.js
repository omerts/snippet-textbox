import React from 'react';
import {DragSource} from 'react-dnd';
import {Types} from './enums.js';

const draggableSnippet = {
  beginDrag(props) {
    return props;
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
  }
}

class DraggableSnippet extends React.Component {
  _getStyles() {
    return {
      borderRadius: '0.5em',
      border: '1px solid #ccc',
      padding: '0.2em',
      display: 'inline-block',
      padding: '0 1em 0 0',
      cursor: 'pointer'
    }
  }

  render() {
    return this.props.connectDragSource(
      <div className='draggable-snippet' style={this._getStyles()}>
        &#8942; {this.props.connectDragPreview(<span>{this.props.title}</span>)}
      </div>
    );
  }
}

DraggableSnippet.propTypes = {
  title: React.PropTypes.string.isRequired,
  content: React.PropTypes.any.isRequired
}

export default DragSource(Types.Snippet, draggableSnippet, collect)(DraggableSnippet);
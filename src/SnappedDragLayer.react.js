import React from 'react';
import {DragLayer} from 'react-dnd';
import DraggableSnippet from './DraggableSnippet.react';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
};

function snapToGrid(x, y, width, height) {
  const snappedX = (Math.floor(x / width) * width);
  const snappedY = (Math.floor(y / height) * height);

  return [snappedX, snappedY];
}

function getCharIndex(x, y, width, height, textarea) {
  let fixedX = x - textarea.offsetLeft;
  let fixedY = y - textarea.offsetTop;

  console.log('fixedX: ' + fixedX);
  console.log('fixedY: ' + fixedY);
  console.log('width: ' + width);
  console.log('height: ' + height);

  let rowCharCount = Math.round(textarea.scrollWidth / width);
  console.log('rowCharCount: ' + rowCharCount);
  let charIndex = (Math.round(fixedX / width)) + (Math.round(fixedY / height) * rowCharCount);
console.log('charIndex: ' + charIndex);
  return charIndex;
}

function calcXY(props) {
  const {currentOffset, textarea, cellWidth, cellHeight } = props;

  if (!currentOffset || !textarea || !cellWidth || !cellHeight) {
    return null;
  }

  let {x, y} = currentOffset;

  if (props.shouldSnap) {
    x -= textarea.offsetLeft;
    y -= textarea.offsetTop;
    [x, y] = snapToGrid(x, y, cellWidth, cellHeight);
    x += textarea.offsetLeft;
    y += textarea.offsetTop;
    x = Math.max(x, textarea.offsetLeft);
    y = Math.max(y, textarea.offsetTop);
  }

  return {x: x, y: y};
}

function getItemStyles(props) {
  let xy = calcXY(props);

  if (!xy) {
    return {display: 'none'};
  }

  const transform = `translate(${xy.x}px, ${xy.y}px)`;

  return {
    transform: transform,
    WebkitTransform: transform
  };
}


function collect(monitor) {
  return {
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getClientOffset()
  };
}

class SnappedDragLayer extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    if (this.props.onCharIndexChanged) {
      let xy = calcXY(this.props);

      if (xy) {
        console.log("LAYER: " + getCharIndex(xy.x,
                                                   xy.y,
                                                   this.props.cellWidth,
                                                   this.props.cellHeight,
                                                   this.props.textarea));
        this.props.onCharIndexChanged(getCharIndex(xy.x,
                                                   xy.y,
                                                   this.props.cellWidth,
                                                   this.props.cellHeight,
                                                   this.props.textarea));
      }
    }
  }

  render() {
    if (!this.props.isDragging) {
      return null;
    }

    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props)}>
          &#124;
        </div>
      </div>
    );
  }
}

export default DragLayer(collect)(SnappedDragLayer);

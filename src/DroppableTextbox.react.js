import React from 'react';
import {Types} from './enums';
import {DropTarget} from 'react-dnd';

const textBoxTarget = {
  drop(props, monitor, component) {
    let offset = monitor.getClientOffset();
    let {content} = monitor.getItem();
    component.addSnippet(offset, content);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class DroppableTextbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {content: props.content || ''};
  }

  addSnippet(offset, content) {
    console.log(this.state.content.slice(0, this.props.dropCharIndex));
    console.log(this.props.dropCharIndex);
    // Insert the content at the chosen index
    this.state.content = this.state.content.slice(0, this.props.dropCharIndex) +
                         content +
                         this.state.content.slice(this.props.dropCharIndex);
    this.setState(this.state);
  }

  _contentChanged(event) {
    this.setState({content: event.target.value});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOver === undefined || !this.props.onHover) {
      return;
    }

    if (this.props.isOver === undefined || (nextProps.isOver !== this.props.isOver)) {
      this.props.onHover(nextProps.isOver,
                         this.refs.textarea);
    }
  }

  render() {
    return (
      this.props.connectDropTarget(<div>
                                      <textarea value={this.state.content}
                                                ref='textarea'
                                                className={this.props.className}
                                                onChange={this._contentChanged.bind(this)} />
                                    </div>)
    );
  }
}

DroppableTextbox.propTypes = {
  content: React.PropTypes.string
}

export default DropTarget(Types.Snippet, textBoxTarget, collect)(DroppableTextbox);
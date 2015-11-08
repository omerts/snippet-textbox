import React from 'react';
import html5backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';
import DraggableSnippet from './DraggableSnippet.react';
import DroppableTextbox from './DroppableTextbox.react';
import SnappedDragLayer from './SnappedDragLayer.react';

class SnippetTextBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {shouldSnap: false,
                  textarea: null,
                  currentCharIndex: 0};
  }

  _onHoverTextbox(isOver, offset) {
    this.setState({shouldSnap: isOver, textarea: offset, currentCharIndex: this.state.currentCharIndex});
  }

  _onCharIndexChanged(charIndex) {
    if (this.state.currentCharIndex !== charIndex) {
      this.state.currentCharIndex = charIndex;
      this.setState(this.state);
    }    
  }

  _getSnippets() {
    if (!this.props.snippets || !this.props.snippets.length) {
      return null;
    }

    return this.props.snippets.map((snippet) => {
      return <DraggableSnippet key={snippet.title} title={snippet.title} content={snippet.content} />;
    });
  }

  render() {
    let {snippets, ...other} = this.props;

    return (
      <div className='snippet-textbox-wrapper'>
        <div className='snippets'>
          {this._getSnippets()}
        </div>
        <div className='drop-textbox'>
          <DroppableTextbox dropCharIndex={this.state.currentCharIndex}
                            onHover={this._onHoverTextbox.bind(this)} />
        </div>
        <SnappedDragLayer {...other}
                          onCharIndexChanged={this._onCharIndexChanged.bind(this)}
                          textarea={this.state.textarea}
                          shouldSnap={this.state.shouldSnap} />
      </div>
    );
  }
}

SnippetTextBox.propTypes = {
  cellWidth: React.PropTypes.number,
  cellHeight: React.PropTypes.number,
  snippets: React.PropTypes.arrayOf(React.PropTypes.shape({title: React.PropTypes.string,
                                                           content: React.PropTypes.string}))
}

export default DragDropContext(html5backend)(SnippetTextBox);
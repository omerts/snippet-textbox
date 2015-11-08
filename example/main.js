import React from 'react';
import ReactDOM from 'react-dom';
import SnippetTextbox from '../src/SnippetTextbox.react';

const snippets = [{title: 'test', content: 'TEST'},
                  {title: 'snippet', content: 'SNIPPET'},
                  {title: 'snippet2', content: 'SNIPPET2'},
                  {title: 'snippet3', content: 'SNIPPET3'}];

ReactDOM.render(<SnippetTextbox cellWidth={7.35} cellHeight={15.5} snippets={snippets} />,
                 document.getElementById('app'), () => {
                  console.timeEnd('app render on route change');
                });
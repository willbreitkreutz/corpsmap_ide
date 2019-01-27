import React from 'react';
import { connect } from 'redux-bundler-react';
import brace from 'brace';
import AceEditor from 'react-ace';
import { debounce } from 'lodash';

import 'brace/mode/java';
import 'brace/mode/javascript';
import 'brace/mode/json';
import 'brace/mode/html';
import 'brace/mode/css';
import 'brace/theme/github';
import 'brace/theme/cobalt';

const modes = {
  'js': 'javascript',
  'json': 'json',
  'html': 'html',
  'css': 'css'
}

class Editor extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      navHeight: 75,
      content: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    const { doEditorSync } = this.props;
    this.sync = debounce(doEditorSync, 3000);
  }

  handleChange(content){
    const { doEditorUpdateContent } = this.props;
    doEditorUpdateContent(content);
    this.sync();
  }

  renderEditor(){
    const { mainContainerHeight, editorFilename, editorContent } = this.props;
    if(!editorFilename) return null;
    const filetype = new RegExp(/\.(.+)/).exec(editorFilename);
    const mode = modes[filetype[1]];
    return (
      <div>
        <AceEditor
          mode={ mode }
          theme="cobalt"
          value={ editorContent }
          onChange={ this.handleChange }
          name="cm-ide-editor"
          editorProps={{ $blockScrolling: true }}
          height={ `${mainContainerHeight}px` }
          width="100%"
        />
      </div>
    )
  }

  render(){
    return (
      <div className="editor">
        { this.renderEditor() }
      </div>
    )
  }
}

export default connect(
  'doEditorSync',
  'doEditorUpdateContent',
  'selectMainContainerHeight',
  'selectEditorContent',
  'selectEditorFilename',
  Editor
);
import React from 'react';
import { connect } from 'redux-bundler-react';
import brace from 'brace';
import AceEditor from 'react-ace';
import { debounce } from 'lodash';

import 'brace/mode/java';
import 'brace/theme/github';
import 'brace/theme/cobalt';

const modes = {
  'javascript': 'javascript',
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
    return (
      <div>
        <div>
          <span className="list-group-item">{ editorFilename }<i className="mdi mdi-close icon-inline-right"></i></span>
        </div>
        <AceEditor
          mode="javascript"
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
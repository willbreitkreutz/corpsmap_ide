import React from 'react';
import { connect } from 'redux-bundler-react';
import brace from 'brace';
import AceEditor from 'react-ace';

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
      navHeight: 75
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    console.log(e)
  }

  render(){
    const { mainContainerHeight } = this.props;
    return (
      <AceEditor
        mode="javascript"
        theme="cobalt"
        onChange={this.handleChange}
        name="cm-ide-editor"
        editorProps={{$blockScrolling: true}}
        height={`${mainContainerHeight}px`}
        width="100%"
      />
    )
  }
}

export default connect(
  'selectMainContainerHeight',
  Editor
);
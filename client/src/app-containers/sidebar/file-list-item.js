import React from 'react';

class FileListItem extends React.Component {
  render(){
    const { file } = this.props;
    return (
      <li className="list-group-item">
        { file.filename }
      </li>
    )
  }
}

export default FileListItem;
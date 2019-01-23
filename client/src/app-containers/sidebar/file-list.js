import React from 'react';
import FileListItem from './file-list-item';

class FileList extends React.Component {
  render(){
    const { files } = this.props;
    return (
      <ul className="list-group">
        {
          files.map((file, i) => {
            return <FileListItem file={file} key={i} />
          })
        }
      </ul>
    )
  }
}

export default FileList;
import { FileData, useFilesUpload } from '01/hooks/useFilesUpload';
import { DragAndDrop } from '01/shared/ui/DragAndDrop';
import { FilesList } from '01/shared/ui/FilesList';
import React from 'react';

interface Props {
  onChange?(files: FileData[]): void;
  max?: number;
}

export const FilesUpload: React.FC<Props> = (props) => {
  const { max, onChange } = props;
  const { files, addFile, removeFile } = useFilesUpload();

  return (
    <>
      <FilesList files={files} removeFile={removeFile} />

      {max === files.length && (
        <DragAndDrop
          accept="application/pdf"
          text="Добавьте акт-допуска"
          style={{ marginTop: '10px' }}
          uniqId="node-second-tab"
          fileHandler={(files) => addFile(files[0])}
        />
      )}
    </>
  );
};

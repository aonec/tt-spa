import { useFilesUpload } from '01/hooks/useFilesUpload';
import { DragAndDrop } from '01/shared/ui/DragAndDrop';
import { FilesList } from '01/shared/ui/FilesList';
import React from 'react';

export const FilesUpload: React.FC = () => {
  const { files, addFile, removeFile } = useFilesUpload();

  return (
    <>
      {files.length ? (
        <FilesList files={files} removeFile={removeFile} />
      ) : (
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

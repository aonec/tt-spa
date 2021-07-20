import { FileData, useFilesUpload } from '01/hooks/useFilesUpload';
import { DragAndDrop } from '01/shared/ui/DragAndDrop';
import { FilesList } from '01/shared/ui/FilesList';
import React from 'react';
import styled from 'styled-components';

interface Props {
  onChange?(files: FileData[]): void;
  max?: number;
  uniqId: string;
  text?: string;
}

export const FilesUpload: React.FC<Props> = (props) => {
  const { max = Infinity, onChange, uniqId, text } = props;
  const { files, addFile, removeFile } = useFilesUpload(onChange);

  return (
    <Wide>
      <FilesList files={files} removeFile={removeFile} />

      {max > files.length && (
        <DragAndDrop
          accept="application/pdf"
          text={text}
          style={{ marginTop: '15px' }}
          uniqId={`upload-files-${uniqId}`}
          fileHandler={(files) => addFile(files[0])}
        />
      )}
    </Wide>
  );
};

export const Wide = styled.div`
  width: 100%;
`;

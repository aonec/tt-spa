import { FileData, useFilesUpload } from '01/hooks/useFilesUpload';
import { DragAndDrop } from '01/shared/ui/DragAndDrop';
import { FilesList } from '01/shared/ui/FilesList';
import React, { useEffect } from 'react';
import styled from 'styled-components';

interface Props {
  onChange?(files: FileData[]): void;
  max?: number;
  uniqId: string;
  text?: string;
  filesInit?: FileData[] | null;
  withoutDeletion?: boolean;
  type?: string;
}

export const FilesUpload: React.FC<Props> = (props) => {
  const {
    max = Infinity,
    onChange,
    uniqId,
    text,
    filesInit,
    withoutDeletion,
    type,
  } = props;

  const { files, addFile, removeFile, clearFiles } = useFilesUpload(
    onChange,
    type
  );

  useEffect(() => {
    if (filesInit?.length === 0) clearFiles();
  }, [filesInit]);

  return (
    <Wide>
      <FilesList
        files={filesInit ? filesInit : files}
        removeFile={removeFile}
        controlType={withoutDeletion ? 'NONE' : 'CONTROL'}
      />

      {max > [...(filesInit ? [] : files), ...(filesInit || [])].length && (
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
  margin-top: 15px;
`;

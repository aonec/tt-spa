import React, { FC, useCallback } from 'react';
import { DocumentPreloadProps } from './DocumentPreload.types';
import { DragAndDrop } from 'ui-kit/DragAndDrop';
import {
  BottomBlock,
  Center,
  DisplayFileWrapper,
  FileName,
  FileTypeAndSize,
  IconWrapper,
  TrashIconWrapper,
} from './DocumentPreload.styled';
import { DocumentIcon, TrashIcon } from 'ui-kit/icons';

export const DocumentPreload: FC<DocumentPreloadProps> = ({
  accept,
  setFile,
  uniqId,
  label,
  file,
}) => {
  const handleFile = useCallback(
    (file: File) => {
      setFile(file);
    },
    [setFile],
  );

  const fileSizeKb = Math.floor((file?.size || 0) / 1024);

  return (
    <div>
      {!file && (
        <DragAndDrop
          accept={accept}
          fileHandler={(files: FileList) => handleFile(files[0])}
          uniqId={uniqId}
          text={label}
        />
      )}

      {Boolean(file) && (
        <DisplayFileWrapper>
          <Center>
            <IconWrapper>
              <DocumentIcon />
            </IconWrapper>
          </Center>
          <BottomBlock>
            <FileName>{file?.name}</FileName>
            <FileTypeAndSize> ({fileSizeKb}kb)</FileTypeAndSize>
            <TrashIconWrapper onClick={() => setFile(null)}>
              <TrashIcon />
            </TrashIconWrapper>
          </BottomBlock>
        </DisplayFileWrapper>
      )}
    </div>
  );
};

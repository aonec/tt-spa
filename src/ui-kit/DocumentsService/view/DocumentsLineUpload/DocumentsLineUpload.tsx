import React, { FC, useCallback } from 'react';
import { Button } from 'ui-kit/Button';
import { DocumentsListWrapper, Wrapper } from './DocumentsLineUpload.styled';
import { DocumentsLineUploadProps } from './DocumentsLineUpload.types';

export const DocumentsLineUpload: FC<DocumentsLineUploadProps> = ({
  fileHandler,
  accept,
  uniqId,
  lable = 'Загрузить файл',
  isLoading,
  documents,
}) => {
  const id = `file-input-${uniqId}`;

  const handleFile = useCallback(
    (files: FileList) => {
      if (isLoading) return;

      fileHandler(files);
    },
    [fileHandler, isLoading]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) handleFile(event.target.files);
    },
    [handleFile]
  );

  return (
    <Wrapper>
      <input
        id={id}
        type="file"
        name="file"
        multiple={false}
        value=""
        placeholder="Загрузить файл"
        onChange={handleChange}
        style={{ display: 'none' }}
        accept={accept}
      />
      <label htmlFor={id} style={{ margin: 0, width: 'min-content' }}>
        <Button disabled={isLoading} type="white">
          {lable}
        </Button>
      </label>
      <DocumentsListWrapper>
        {documents.map((elem) => (
          <div>{elem.name}</div>
        ))}
      </DocumentsListWrapper>
    </Wrapper>
  );
};

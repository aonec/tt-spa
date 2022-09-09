import { ButtonTT } from '01/tt-components';
import React, { FC, useCallback } from 'react';
import { Button } from 'ui-kit/Button';
import { DocumentsLineUploadProps } from './DocumentsLineUpload.types';

export const DocumentsLineUpload: FC<DocumentsLineUploadProps> = ({
  fileHandler,
  accept,
  uniqId,
  lable = 'Загрузить файл',
  isLoading,
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
    <div>
      <input
        id={id}
        type="file"
        name="file"
        multiple={false}
        value=""
        placeholder="Загрузить файл"
        onChange={handleChange}
        // style={{ display: 'none' }}
        accept={accept}
      />
      <label htmlFor={id} style={{ margin: 0, width: '100%' }}>
        <Button type="white">{lable}</Button>
      </label>
    </div>
  );
};

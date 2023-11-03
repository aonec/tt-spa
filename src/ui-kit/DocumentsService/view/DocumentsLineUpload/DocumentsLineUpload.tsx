import React, { FC, useCallback } from 'react';
import { saveAs } from 'file-saver';
import { Button } from 'ui-kit/Button';
import { UploadIcon } from 'ui-kit/icons';
import {
  CloseBlueIconSC,
  DocumentItemWrapper,
  DocumentSkeleton,
  DocumentsListElement,
  DocumentsListWrapper,
  PhotoWrapper,
  TrashIconSC,
  Wrapper,
} from './DocumentsLineUpload.styled';
import { DocumentsLineUploadProps } from './DocumentsLineUpload.types';
import { DocumentResponse } from 'api/types';
import axios from 'api/axios';
import { Image } from 'antd';

export const DocumentsLineUpload: FC<DocumentsLineUploadProps> = ({
  fileHandler,
  accept,
  uniqId,
  label = 'Загрузить файл',
  isLoading,
  documents,
  isMaxDocuments,
  removeDocument,
  isPhoto,
}) => {
  const id = `file-input-${uniqId}`;

  const handleDownloadFile = useCallback(
    (url?: string | null, name?: string | null) => {
      if (url && name) saveAs(url, name);
    },
    [],
  );

  const handleFile = useCallback(
    (files: FileList) => {
      if (isLoading) return;

      fileHandler(files);
    },
    [fileHandler, isLoading],
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) handleFile(event.target.files);
    },
    [handleFile],
  );

  return (
    <Wrapper>
      {!isLoading && !isMaxDocuments && (
        <input
          disabled={isLoading}
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
      )}
      <label htmlFor={id} style={{ margin: 0, width: 'min-content' }}>
        <Button
          disabled={isLoading || isMaxDocuments}
          type="ghost"
          icon={<UploadIcon />}
          onClick={() => {
            const element = document.getElementById(id);

            if (!element) return;

            element?.click?.();
          }}
        >
          {label}
        </Button>
      </label>

      {isLoading && <DocumentSkeleton active size="small" />}

      <DocumentsListWrapper>
        {(documents as DocumentResponse[]).map((document) => (
          <DocumentItemWrapper key={document.id}>
            {!isPhoto && (
              <>
                <TrashIconSC
                  onClick={() => {
                    try {
                      axios.delete(`Documents/${document.id}`);
                    } catch (error) {}
                    removeDocument(document.id);
                  }}
                />
                <DocumentsListElement
                  onClick={() =>
                    handleDownloadFile(document.url, document.name)
                  }
                  title={document.name || ''}
                >
                  {document.name}
                </DocumentsListElement>
              </>
            )}

            {isPhoto && document.url && (
              <PhotoWrapper key={document.id}>
                <Image height={60} src={document.url} />
                <CloseBlueIconSC
                  onClick={() => {
                    try {
                      axios.delete(`Documents/${document.id}`);
                    } catch (error) {}
                    removeDocument(document.id);
                  }}
                />
              </PhotoWrapper>
            )}
          </DocumentItemWrapper>
        ))}
      </DocumentsListWrapper>
    </Wrapper>
  );
};

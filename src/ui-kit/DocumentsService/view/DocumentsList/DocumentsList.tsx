import React, { FC } from 'react';
import { DocumentItem } from './DocumentItem';
import { DocumentItemLoader } from './DocumentItem/DocumentItem.loader';
import { Wrapper } from './DocumentsList.styled';
import { DocumentsListProps } from './DocumentsList.types';

export const DocumentsList: FC<DocumentsListProps> = ({
  documents,
  removeDocument,
  isLoading,
}) => {
  return (
    <Wrapper>
      {documents.map((document) => (
        <DocumentItem
          document={document}
          key={document.id}
          removeDocument={removeDocument}
        />
      ))}
      {isLoading && <DocumentItemLoader />}
    </Wrapper>
  );
};

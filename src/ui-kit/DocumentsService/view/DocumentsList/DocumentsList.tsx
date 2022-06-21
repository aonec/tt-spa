import React, { FC } from 'react';
import { DocumentItem } from './DocumentItem';
import { DocumentItemLoader } from './DocumentItem/DocumentItem.loader';
import { Wrapper } from './DocumentsList.styled';
import { DocumentsListProps } from './DocumentsList.types';

export const DocumentsList: FC<DocumentsListProps> = ({
  documnets,
  removeDocument,
  isLoading,
}) => {
  return (
    <Wrapper>
      {documnets.map((document) => (
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

import React, { FC } from 'react';
import { TaskDocumentsListProps } from './TaskDocumentsList.types';
import { TaskDocumentsListItem } from './TaskDocumentsListItem';
import { Title, Wrapper } from './TaskDocumentsList.styled';

export const TaskDocumentsList: FC<TaskDocumentsListProps> = ({
  documents,
  openDeleteDocumentModal,
}) => {
  const numberOfDocuments = documents.length;

  if (!numberOfDocuments) return null;

  const list = documents.map((document) => (
    <TaskDocumentsListItem
      document={document}
      handleDeleteDocument={openDeleteDocumentModal}
      key={document.id}
    />
  ));

  return (
    <Wrapper>
      <Title>Документы ({numberOfDocuments})</Title>
      {list}
    </Wrapper>
  );
};

import React, { FC, useMemo } from 'react';
import { Wrapper } from './TaskDocumentsList.styled';
import { TaskDocumentsListProps } from './TaskDocumentsList.types';
import { TaskDocumentsListItem } from './TaskDocumentsListItem';

export const TaskDocumentsList: FC<TaskDocumentsListProps> = ({
  documents,
  handleDeleteDocument
}) => {
  const list = useMemo(
    () =>
      documents.map((document) => (
        <TaskDocumentsListItem document={document} handleDeleteDocument={handleDeleteDocument}/>
      )),
    [documents]
  );

  return <>{list}</>;
};

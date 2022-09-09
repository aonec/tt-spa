import React, { FC, useMemo } from 'react';
import { Wrapper } from './TaskDocumentsList.styled';
import { TaskDocumentsListProps } from './TaskDocumentsList.types';
import { TaskDocumentsListItem } from './TaskDocumentsListItem';

export const TaskDocumentsList: FC<TaskDocumentsListProps> = ({
  documents,
}) => {
  const list = useMemo(
    () =>
      documents.map((document) => (
        <TaskDocumentsListItem document={document} />
      )),
    [documents]
  );

  return <>{list}</>;
};

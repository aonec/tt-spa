import React, { FC, useMemo } from 'react';
import { TaskDocumentsListProps } from './TaskDocumentsList.types';
import { TaskDocumentsListItem } from './TaskDocumentsListItem';

export const TaskDocumentsList: FC<TaskDocumentsListProps> = ({
  documents,
  handleDeleteDocument,
}) => {
  const list = documents.map((document) => (
    <TaskDocumentsListItem
      document={document}
      handleDeleteDocument={handleDeleteDocument}
    />
  ));

  return <>{list}</>;
};

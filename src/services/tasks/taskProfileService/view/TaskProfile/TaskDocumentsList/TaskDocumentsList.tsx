import React, { FC } from 'react';
import { Dialog } from 'ui-kit/shared_components/Dialog/Dialog';
import { TaskDocumentsListProps } from './TaskDocumentsList.types';
import { TaskDocumentsListItem } from './TaskDocumentsListItem';

export const TaskDocumentsList: FC<TaskDocumentsListProps> = ({
  documents,
  openDeleteDocumentModal,
}) => {
  const list = documents.map((document) => (
    <TaskDocumentsListItem
      document={document}
      handleDeleteDocument={openDeleteDocumentModal}
      key={document.id}
    />
  ));

  return <>{list}</>;
};

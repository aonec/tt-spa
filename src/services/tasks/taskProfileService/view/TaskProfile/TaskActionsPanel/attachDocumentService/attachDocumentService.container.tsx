import React, { FC, useCallback } from 'react';
import { ActionComponentProps } from '../TaskActionsPanel.types';
import { documentComponentDataDictionary } from './attachDocumentService.constants';
import { AttachDocument } from './view/AttachDocument';

export const AttachDocumentContainer: FC<ActionComponentProps> = ({
  handleChange,
  task,
}) => {
  const type = task.type;

  const handleDocumentsChange = useCallback(
    (documentsIds: number[]) => {
      handleChange({ documentsIds });
    },
    [handleChange],
  );

  const componentData =
    (type && documentComponentDataDictionary[type]) ||
    documentComponentDataDictionary['Default'];

  return (
    <AttachDocument
      handleDocumentsChange={handleDocumentsChange}
      componentData={componentData}
    />
  );
};

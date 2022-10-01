import React, { FC } from 'react';
import { ActionComponentProps } from '../TaskActionsPanel.types';
import { documentComponentDataDictionary } from './attachDocumentService.constants';
import { AttachDocument } from './view/AttachDocument';

export const AttachDocumentContainer: FC<ActionComponentProps> = ({
  handleChange,
  type,
}) => {
  function handleDocumentsChange(documentsIds: number[]) {
    handleChange({ documentsIds });
  }

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

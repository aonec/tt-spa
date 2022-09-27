import React, { FC } from 'react';
import { ActionComponentProps } from '../TaskActionsPanel.types';
import { AttachDocument } from './view/AttachDocument';
import { documentComponentDataDictionary } from './view/AttachDocument/AttachDocument.constants';

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

import React, { FC, useCallback } from 'react';
import { AttachPhoto } from './view/AttachPhoto';
import { ActionComponentProps } from '../TaskActionsPanel.types';

export const AttachPhotoContainer: FC<ActionComponentProps> = ({
  handleChange,
}) => {
  const handleDocumentsChange = useCallback(
    (documentsIds: number[]) => {
      handleChange((prev) => {
        return {
          ...prev,
          documentsIds: [...(prev.documentsIds || []), ...documentsIds],
        };
      });
    },
    [handleChange],
  );

  return <AttachPhoto handleDocumentsChange={handleDocumentsChange} />;
};

import { DragAndDrop } from '01/shared/ui/DragAndDrop';
import { Spaces } from '01/shared/ui/Layout/Space/Space';
import React from 'react';
import { FormHeader } from '../Header';

export const DocumentsStage = () => {
  return (
    <>
      <FormHeader>Документы</FormHeader>
      <Spaces>
        {[
          <DragAndDrop
            uniqId="create-individual-device-completed-works"
            text="Добавьте акт выполненных работ"
          />,
          <DragAndDrop
            uniqId="create-individual-device-passport"
            text="Добавьте паспорт прибора"
          />,
          <DragAndDrop
            uniqId="create-individual-device-check"
            text="Добавьте свидетельство о проверке прибора"
          />,
        ]}
      </Spaces>
    </>
  );
};

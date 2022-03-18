import React from 'react';
import { FilesUpload } from '../../../../../../../shared/ui/FilesUpload';
import { Space } from '../../../../../../../shared/ui/Layout/Space/Space';

export const FilesUploadForm = () => {
  return (
    <>
      <FilesUpload uniqId="one" text="Добавьте акт выполненных работ" max={1} />
      <FilesUpload uniqId="two" text="Добавьте паспорт прибора" max={1} />
      <FilesUpload
        uniqId="three"
        text="Добавьте свидетельство о поверке прибора"
        max={1}
      />
    </>
  );
};

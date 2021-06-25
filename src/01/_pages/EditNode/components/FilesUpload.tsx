import { useFilesUpload } from '01/hooks/useFilesUpload';
import React from 'react';

export const FilesUpload: React.FC = () => {
  const {} = useFilesUpload();

  return (
    <>
      {/* {list.items.length ? (
        <FilesList files={[]} removeFile={() => {}} />
      ) : (
        !button.loading && (
          <DragAndDrop
            accept="application/pdf"
            text="Добавьте акт-допуска"
            style={{ marginTop: '10px' }}
            uniqId="node-second-tab"
            fileHandler={addFile}
          />
        )
      )} */}
    </>
  );
};

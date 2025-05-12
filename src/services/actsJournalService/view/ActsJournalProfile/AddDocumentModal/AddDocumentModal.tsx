import { FC } from 'react';
import { Props } from './AddDocumentModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { DocumentPreload } from 'ui-kit/DocumentPreload';
import { Button } from 'ui-kit/Button';

const formId = 'Add-Document-Modal';
const accept = 'image/*';

export const AddDocumentModal: FC<Props> = ({
  isModalOpen,
  setModalOpen,
  file,
  setFile,
  handleUploadFile,
}) => {
  const handleSubmit = () => {
    if (file) handleUploadFile(file);
  };

  return (
    <FormModal
      title="Загрузить скан"
      visible={isModalOpen}
      onCancel={() => setModalOpen(false)}
      formId={formId}
      submitBtnText="Загрузить"
      customSubmit={
        <Button
          disabled={!file}
          onClick={handleSubmit}
          // isLoading={isFileLoading}
        >
          Загрузить график
        </Button>
      }
      form={
        <DocumentPreload
          label="Перетащите файл или загрузите его с компьютера"
          uniqId="temperature-file"
          file={file}
          setFile={setFile}
          accept={accept}
        />
      }
    />
  );
};

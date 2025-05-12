import { FC } from 'react';
import { Props } from './DocumentViewModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { Wrapper } from './DocumentViewModal.styled';

const formId = 'Document-View-Modal';

export const DocumentViewModal: FC<Props> = ({
  isViewModalOpen,
  setViewModalOpen,
  viewFile,
}) => {
  return (
    <FormModal
      title="Скан журнала актов"
      visible={isViewModalOpen}
      onCancel={() => setViewModalOpen(false)}
      formId={formId}
      customFooter={<></>}
      form={
        <Wrapper>
          {viewFile?.url && (
            <img style={{ width: '100%' }} src={viewFile.url} />
          )}
        </Wrapper>
      }
    />
  );
};

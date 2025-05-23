import { FC } from 'react';
import { Props } from './DocumentViewModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { Wrapper } from './DocumentViewModal.styled';

const formId = 'Document-View-Modal';

export const DocumentViewModal: FC<Props> = ({
  isViewModalOpen,
  setViewModalOpen,
  docUrl,
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
          <embed src={docUrl || undefined} width="100%" height="100%" />
          {/* 
          <iframe
            src={`https://mozilla.github.io/pdf.js/web/viewer.html?file=${docUrl}`}
            width="100%"
            height="600px"
          ></iframe> */}
        </Wrapper>
      }
    />
  );
};

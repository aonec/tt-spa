import { FC } from 'react';
import { Props } from './DocumentViewModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { TitleWrapper, Wrapper } from './DocumentViewModal.styled';
import { Button } from 'ui-kit/Button';
import { downloadURI } from 'utils/downloadByURL';

const formId = 'Document-View-Modal';

export const DocumentViewModal: FC<Props> = ({
  isViewModalOpen,
  setViewModalOpen,
  docUrl,
}) => {
  return (
    <FormModal
      title={
        <TitleWrapper>
          Скан журнала актов
          <Button onClick={() => docUrl && downloadURI(docUrl, '')}>
            Скачать
          </Button>
        </TitleWrapper>
      }
      visible={isViewModalOpen}
      onCancel={() => setViewModalOpen(false)}
      formId={formId}
      customFooter={<></>}
      form={
        <Wrapper>
          <embed src={docUrl || undefined} width="100%" height="100%" />
        </Wrapper>
      }
    />
  );
};

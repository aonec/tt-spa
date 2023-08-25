import React from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { ReadingsHistoryModalProps } from './ReadingsHistoryModal.types';
import { ReadingHistoryHeader } from './ReadingsHistoryHeader/ReadingsHistoryHeader';
import { ReadingsHistoryListContainer } from '../../readingsHistoryListService/readingsHistoryListService.container';
import { Wrapper } from './ReadingsHistory.styled';

export const ReadingHistoryModal: React.FC<ReadingsHistoryModalProps> = ({
  isModalOpen,
  readonly,
  closeReadingsHistoryModal,
  individualDevice,
  isModal,
  showDeviceInfo,
}) => {
  const content = (
    <Wrapper>
      {showDeviceInfo && (
        <ReadingHistoryHeader individualDevice={individualDevice} />
      )}
      <ReadingsHistoryListContainer readonly={readonly} isModal={isModal} />
    </Wrapper>
  );

  if (!isModal) return content;

  return (
    <FormModal
      formId="readings-history-modal"
      innerModalProps={{ width: 1080 }}
      visible={isModalOpen}
      title="История показаний"
      onCancel={closeReadingsHistoryModal}
      customFooter={<></>}
      form={content}
    />
  );
};

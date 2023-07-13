import React from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { ReadingsHistoryModalProps } from './ReadingsHistoryModal.types';
import { ReadingHistoryHeader } from './ReadingsHistoryHeader/ReadingsHistoryHeader';
import { ReadingsHistoryListContainer } from '../../readingsHistoryListService/readingsHistoryListService.container';

export const ReadingHistoryModal: React.FC<ReadingsHistoryModalProps> = ({
  isModalOpen,
  readonly,
  closeReadingsHistoryModal,
  individualDevice,
}) => {
  return (
    <FormModal
      formId="readings-history-modal"
      innerModalProps={{ width: 1080 }}
      visible={isModalOpen}
      title="История показаний"
      onCancel={closeReadingsHistoryModal}
      customFooter={<></>}
      form={
        <div style={{ width: '100%' }}>
          <ReadingHistoryHeader individualDevice={individualDevice} />
          <ReadingsHistoryListContainer readonly={readonly} />
        </div>
      }
    />
  );
};

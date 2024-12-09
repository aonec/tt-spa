import { FC } from 'react';
import { Props } from './ReadingHistoryModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { ReadingHistory } from './ReadingHistory/ReadingHistory';

export const ReadingHistoryModal: FC<Props> = ({
  preparedReadings,
  handleCloseHistory,
  isOpen,
}) => {
  return (
    <FormModal
      formId="accounting-nodes-readings-history-modal"
      innerModalProps={{ width: 880 }}
      visible={isOpen}
      title="История показаний"
      onCancel={handleCloseHistory}
      customFooter={<></>}
      form={<ReadingHistory preparedReadings={preparedReadings} />}
    />
  );
};

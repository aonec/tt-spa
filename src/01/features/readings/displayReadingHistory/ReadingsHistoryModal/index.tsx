import { useStore } from 'effector-react';
import React from 'react';
import { ReadingHistoryPage } from '..';
import {
  $isReadingsHstoryModalOpen,
  $readingsHistoryModalDeviceId,
  closeReadingsHistoryModal,
} from '../models';
import { FormModal } from 'ui-kit/Modals/FormModal';

interface Props {
  readonly?: boolean;
}

export const ReadingsHistoryModal: React.FC<Props> = ({ readonly }) => {
  const open = useStore($isReadingsHstoryModalOpen);
  const deviceId = useStore($readingsHistoryModalDeviceId);

  return (
    <FormModal
      formId="readings-history-modal"
      innerModalProps={{ width: '1080' }}
      visible={open}
      title="История показаний"
      onCancel={closeReadingsHistoryModal}
      centered
      customFooter={<></>}
      form={
        <>
          {deviceId && (
            <ReadingHistoryPage
              deviceId={deviceId}
              isModal
              readonly={readonly}
            />
          )}
        </>
      }
    />
  );
};

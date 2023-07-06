import React from 'react';
import { useParams } from 'react-router-dom';
import { ReadingHistoryHeader } from '../../components/Header';
import { ReadingsHistoryList } from '../../components/ReadingsHistoryList';
import { $isReadingsHstoryModalOpen, ReadingHistoryGate } from '../../models';
import { useStore } from 'effector-react';
import { displayIndividualDeviceAndNamesService } from 'services/devices/individualDevices/displayIndividualDeviceAndNamesService/displayIndividualDeviceAndNamesService.model';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { ReadingsHistoryModalProps } from './ReadingsHistoryModal.types';

const {
  gates: { IndividualDeviceGate },
} = displayIndividualDeviceAndNamesService;

export const ReadingHistoryModal: React.FC<ReadingsHistoryModalProps> = ({
  deviceId: deviceIdFromProps,
  isModal,
  readonly,
  isOpen,
  closeReadingsHistoryModal,
}) => {
  const { deviceId: deviceIdFromUrlParams } = useParams<{ deviceId: string }>();

  const deviceId = deviceIdFromProps || deviceIdFromUrlParams;

  const showModal = useStore($isReadingsHstoryModalOpen);

  const isNeedUseGate = isModal ? showModal : true;

  return (
    <FormModal
      formId="readings-history-modal"
      innerModalProps={{ width: 1080 }}
      visible={isOpen}
      title="История показаний"
      onCancel={closeReadingsHistoryModal}
      customFooter={<></>}
      form={
        <div style={{ width: '100%' }}>
          {deviceId && <IndividualDeviceGate id={Number(deviceId)} />}
          {isNeedUseGate && <ReadingHistoryGate deviceId={Number(deviceId)} />}
          <ReadingHistoryHeader isModal={isModal} />
          <ReadingsHistoryList readonly={readonly} isModal={isModal} />
        </div>
      }
    />
  );
};

import React from 'react';
import { useUnit } from 'effector-react';
import { ReadingHistoryModal } from './view/ReadingsHistoryModal';
import { ReadingsHistoryServiceProps } from './readingsHistoryService.types';
import { readingsHistoryService } from './readingsHistoryService.model';
import { useParams } from 'react-router-dom';

const {
  inputs,
  outputs,
  gates: { ReadingHistoryGate, IndividualDeviceGate },
} = readingsHistoryService;

export const ReadingsHistoryContainer: React.FC<
  ReadingsHistoryServiceProps
> = ({
  readonly,
  deviceId: deviceIdFromProps,
  isModal = true,
  showDeviceInfo = true,
}) => {
  const { deviceId: deviceIdFromUrlParams } = useParams<{ deviceId: string }>();

  const {
    isModalOpen,
    deviceIdFromStore,
    closeReadingsHistoryModal,
    individualDevice,
  } = useUnit({
    isModalOpen: outputs.$isReadingsHstoryModalOpen,
    deviceIdFromStore: outputs.$readingsHistoryModalDeviceId,
    individualDevice: outputs.$individualDevice,
    closeReadingsHistoryModal: inputs.closeReadingsHistoryModal,
  });

  const deviceId =
    deviceIdFromProps || deviceIdFromStore || deviceIdFromUrlParams;

  if (!deviceId) return null;

  return (
    <>
      <IndividualDeviceGate id={Number(deviceId)} />
      <ReadingHistoryGate deviceId={Number(deviceId)} />
      <ReadingHistoryModal
        closeReadingsHistoryModal={closeReadingsHistoryModal}
        isModalOpen={isModalOpen}
        readonly={readonly}
        individualDevice={individualDevice}
        isModal={isModal}
        showDeviceInfo={showDeviceInfo}
      />
    </>
  );
};

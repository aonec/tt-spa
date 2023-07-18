import React from 'react';
import { useParams } from 'react-router-dom';
import { ReadingHistoryHeader } from './components/Header';
import { ReadingsHistoryList } from './components/ReadingsHistoryList';
import { $isReadingsHstoryModalOpen, ReadingHistoryGate } from './models';
import { useStore } from 'effector-react';
import { displayIndividualDeviceAndNamesService } from 'services/devices/individualDevices/displayIndividualDeviceAndNamesService/displayIndividualDeviceAndNamesService.model';

interface Props {
  deviceId?: number;
  isModal?: boolean;
  readonly?: boolean;
}

const {
  gates: { IndividualDeviceGate },
} = displayIndividualDeviceAndNamesService;

export const ReadingHistoryPage: React.FC<Props> = ({
  deviceId: deviceIdFromProps,
  isModal,
  readonly,
}) => {
  const { deviceId: deviceIdFromUrlParams } = useParams<{ deviceId: string }>();

  const deviceId = deviceIdFromProps || deviceIdFromUrlParams;

  const showModal = useStore($isReadingsHstoryModalOpen);

  const isNeedUseGate = isModal ? showModal : true;

  return (
    <div style={{ width: '100%' }}>
      {deviceId && <IndividualDeviceGate id={Number(deviceId)} />}
      {isNeedUseGate && <ReadingHistoryGate deviceId={Number(deviceId)} />}
      <ReadingHistoryHeader isModal={isModal} />
      <ReadingsHistoryList readonly={readonly} isModal={isModal} />
    </div>
  );
};
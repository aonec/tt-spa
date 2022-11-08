import React, { FC } from 'react';
import { Skeleton } from 'antd';
import { ModalTT } from '01/shared/ui/ModalTT';
import { PipeNodeInfo } from '../PipeNodeInfo';
import { MeteringDeviceListItem } from './MeteringDeviceListItem';
import { DevicesListWrapper } from './MeteringDevicesListModal.styled';
import { MeteringDevicesListModalProps } from './MeteringDevicesListModal.types';

export const MeteringDevicesListModal: FC<MeteringDevicesListModalProps> = ({
  isLoading,
  isModalOpen,
  meterindDevicesList,
  closeDevicesListModel,
  pipeNode,
}) => {
  return (
    <ModalTT
      title="Приборы"
      visible={isModalOpen}
      footer={null}
      onCancel={closeDevicesListModel}
      centered
    >
      {pipeNode && <PipeNodeInfo pipeNode={pipeNode} />}
      {isLoading && <Skeleton active />}
      <DevicesListWrapper>
        {!isLoading &&
          meterindDevicesList?.length &&
          meterindDevicesList.map((device) => (
            <MeteringDeviceListItem device={device} />
          ))}
      </DevicesListWrapper>
    </ModalTT>
  );
};

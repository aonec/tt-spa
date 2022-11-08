import React, { FC, useEffect } from 'react';
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
  closeDevicesListModal,
  pipeNode,
}) => {
  return (
    <ModalTT
      title="Приборы"
      visible={isModalOpen}
      footer={null}
      onCancel={closeDevicesListModal}
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

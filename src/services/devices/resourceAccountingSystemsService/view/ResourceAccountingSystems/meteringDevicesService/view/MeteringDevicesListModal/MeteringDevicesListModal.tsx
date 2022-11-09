import React, { FC, useEffect } from 'react';
import { Empty, Skeleton } from 'antd';
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
          Boolean(meterindDevicesList?.length) &&
          meterindDevicesList?.map((device) => (
            <MeteringDeviceListItem device={device} />
          ))}
        {!isLoading && meterindDevicesList?.length === 0 && (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Нет подключённых приборов"
          />
        )}
      </DevicesListWrapper>
    </ModalTT>
  );
};

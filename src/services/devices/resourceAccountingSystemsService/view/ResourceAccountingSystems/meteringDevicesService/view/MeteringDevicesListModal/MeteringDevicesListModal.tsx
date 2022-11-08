import { ModalTT } from '01/shared/ui/ModalTT';
import { Skeleton } from 'antd';
import React, { FC } from 'react';
import { MeteringDeviceListItem } from './MeteringDeviceListItem';
import { Wrapper } from './MeteringDevicesListModal.styled';
import { MeteringDevicesListModalProps } from './MeteringDevicesListModal.types';

export const MeteringDevicesListModal: FC<MeteringDevicesListModalProps> = ({
  isLoading,
  isModalOpen,
  meterindDevicesList,
  closeDevicesListModel,
}) => {
  return (
    <ModalTT
      title="Приборы"
      visible={isModalOpen}
      footer={null}
      onCancel={closeDevicesListModel}
      centered
    >
      <div>
        {isLoading && <Skeleton active />}
        {!isLoading &&
          meterindDevicesList?.length &&
          meterindDevicesList.map((device) => (
            <MeteringDeviceListItem device={device} />
          ))}
      </div>
    </ModalTT>
  );
};

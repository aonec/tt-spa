import React, { FC } from 'react';
import { Empty, Skeleton } from 'antd';
import { PipeNodeInfo } from '../PipeNodeInfo';
import { MeteringDeviceListItem } from './MeteringDeviceListItem';
import { DevicesListWrapper } from './MeteringDevicesListModal.styled';
import { MeteringDevicesListModalProps } from './MeteringDevicesListModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';

export const MeteringDevicesListModal: FC<MeteringDevicesListModalProps> = ({
  isLoading,
  isModalOpen,
  meterindDevicesList,
  closeDevicesListModal,
  pipeNode,
}) => {
  return (
    <FormModal
      formId="metering-devices-list-modal"
      title="Приборы"
      visible={isModalOpen}
      customFooter={<></>}
      onCancel={closeDevicesListModal}
      form={
        <>
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
        </>
      }
    />
  );
};

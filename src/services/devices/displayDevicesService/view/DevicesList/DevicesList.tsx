import DevicesByAddress from '01/_pages/Devices/components/DevicesByAddress/DevicesByAddress';
import { groupDevicesByObjects } from '01/_pages/Devices/components/utils/groupDevicesByObjects';
import { Pagination } from 'antd';
import { Empty } from 'antd';
import React, { FC } from 'react';
import { DevicesListProps } from './DevicesList.types';

export const DevicesList: FC<DevicesListProps> = ({
  calculators,
  isLoading,
  total,
  pageNumber,
  pageSize,
  setPageNumber,
}) => {
  const devices = groupDevicesByObjects(calculators);
  const isDevicesListEmpty = !devices.length;
  const deviceArray = devices.map((addressDevicesGroup) => (
    <DevicesByAddress
      key={addressDevicesGroup.address?.mainAddress?.id}
      addressDevicesGroup={addressDevicesGroup}
    />
  ));
  return (
    <div>
      {isLoading ? (
        <div role="loader">ЗАГРУЗКА...</div>
      ) : (
        <>
          {deviceArray.length ? deviceArray : <Empty />}
          {!isDevicesListEmpty && (
            <Pagination
              total={total}
              showSizeChanger={false}
              current={Number(pageNumber)}
              pageSize={Number(pageSize)}
              onChange={setPageNumber}
            />
          )}
        </>
      )}
    </div>
  );
};

import { DevicesByAddress } from '01/_pages/Devices/components/DevicesByAddress/DevicesByAddress';
import { Pagination, Skeleton } from 'antd';
import { Empty } from 'antd';
import React, { FC } from 'react';
import { DevicesListProps } from './DevicesList.types';

export const DevicesList: FC<DevicesListProps> = ({
  devices,
  isLoading,
  total,
  pageNumber,
  pageSize,
  setPageNumber,
  setAddress,
  housingsByFilter,
}) => {
  const isDevicesListEmpty = !devices.length;
  const deviceArray = devices.map((addressDevicesGroup) => (
    <DevicesByAddress
      key={addressDevicesGroup.address?.mainAddress?.id}
      addressDevicesGroup={addressDevicesGroup}
      setAddress={setAddress}
      housingsByFilter={housingsByFilter.find(
        (housing) =>
          housing.current?.id === addressDevicesGroup.devices[0].address?.id
      )}
    />
  ));
  return (
    <div>
      {isLoading ? (
        <Skeleton active />
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
              hideOnSinglePage
            />
          )}
        </>
      )}
    </div>
  );
};

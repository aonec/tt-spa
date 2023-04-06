import { DevicesByAddress } from '01/_pages/Devices/components/DevicesByAddress/DevicesByAddress';
import { Pagination, Skeleton } from 'antd';
import { Empty } from 'antd';
import React, { FC } from 'react';
import { DevicesListProps } from './DevicesList.types';

export const DevicesList: FC<DevicesListProps> = ({
  housingStocksDevices,
  isLoading,
  total,
  pageNumber,
  pageSize,
  setPageNumber,
  setAddressBySwither,
  housingStocksAddressForSwitcher,
  mainFilterSearchType,
  setMainFilterSearchType,
}) => {
  const isDevicesListEmpty = !housingStocksDevices.length;
  console.log(mainFilterSearchType);

  const deviceArray = housingStocksDevices.map((housingStockDevices) => (
    <DevicesByAddress
      key={housingStockDevices.address?.mainAddress?.id}
      housingStockDevices={housingStockDevices}
      setAddressBySwither={setAddressBySwither}
      housingStocksAddressForSwitcher={housingStocksAddressForSwitcher.find(
        (housingStock) =>
          housingStock.current?.id ===
          housingStockDevices.devices[0].address?.id,
      )}
      mainFilterSearchType={mainFilterSearchType}
      setMainFilterSearchType={setMainFilterSearchType}
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

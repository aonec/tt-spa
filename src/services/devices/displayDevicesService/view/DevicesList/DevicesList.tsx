import { Pagination } from 'antd';
import { Empty } from 'antd';
import React, { FC } from 'react';
import { DevicesListProps } from './DevicesList.types';
import { HousingStockCalculators } from './HousingStockCalculators/HousingStockCalculators';
import { WithLoader } from 'ui-kit/shared/WithLoader';

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
  const isHousingStocksDevicesListEmpty = Boolean(!housingStocksDevices.length);

  const housingStocksDevicesList = housingStocksDevices.map(
    (housingStockDevices) => (
      <HousingStockCalculators
        key={housingStockDevices.building?.address?.mainAddress?.id}
        housingStockDevices={housingStockDevices}
        setAddressBySwither={setAddressBySwither}
        housingStocksAddressForSwitcher={housingStocksAddressForSwitcher.find(
          (housingStock) =>
            housingStock.current?.id ===
            housingStockDevices.devices[0][0].address?.id,
        )}
        mainFilterSearchType={mainFilterSearchType}
        setMainFilterSearchType={setMainFilterSearchType}
      />
    ),
  );
  return (
    <div>
      <WithLoader isLoading={isLoading}>
        <>
          {!isHousingStocksDevicesListEmpty && (
            <>
              {housingStocksDevicesList}
              <Pagination
                total={total}
                showSizeChanger={false}
                current={Number(pageNumber)}
                pageSize={Number(pageSize)}
                onChange={setPageNumber}
                hideOnSinglePage
              />
            </>
          )}
          {isHousingStocksDevicesListEmpty && <Empty />}
        </>
      </WithLoader>
    </div>
  );
};

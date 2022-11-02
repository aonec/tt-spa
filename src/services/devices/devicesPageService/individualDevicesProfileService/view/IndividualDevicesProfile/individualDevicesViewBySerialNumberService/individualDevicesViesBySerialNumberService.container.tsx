import { Skeleton } from 'antd';
import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { DEVICES_LIST_BY_SERIAL_NUMBER_SIZE } from './individualDevicesViesBySerialNumberService.constants';
import { individualDevicesViewBySerialNumberService } from './individualDevicesViesBySerialNumberService.model';
import { PaginationSC } from './individualDevicesViesBySerialNumberService.styled';
import { IndividualDeviceListBySerialNumber } from './view/IndividualDeviceListBySerialNumber';
import { IndividualDevicesViewBySerialNumberSearch } from './view/SerialNumberSearch';

const { inputs, outputs } = individualDevicesViewBySerialNumberService;

export const IndividualDevicesViewBySerialNumberContainer = () => {
  const filter = useStore(outputs.$searchPayload);
  const devices = useStore(outputs.$devices);
  const totalItems = useStore(outputs.$totalItems);
  const isLoading = useStore(outputs.$isLoading);

  const setFilter = useEvent(inputs.setFilter);
  const changePageNumber = useEvent(inputs.changePageNumber);

  return (
    <>
      <IndividualDevicesViewBySerialNumberSearch
        filter={filter}
        setFilter={setFilter}
      />
      {!isLoading && Boolean(devices.length) && (
        <>
          <div>
            <IndividualDeviceListBySerialNumber devices={devices}/>
          </div>
          <PaginationSC
            defaultCurrent={1}
            onChange={changePageNumber}
            pageSize={DEVICES_LIST_BY_SERIAL_NUMBER_SIZE}
            total={totalItems}
            current={filter?.PageNumber}
            showSizeChanger={false}
          />
        </>
      )}
      {isLoading && <Skeleton active />}
    </>
  );
};

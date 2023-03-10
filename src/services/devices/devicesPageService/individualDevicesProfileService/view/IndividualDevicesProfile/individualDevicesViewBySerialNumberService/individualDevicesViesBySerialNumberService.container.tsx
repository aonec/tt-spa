import { Skeleton } from 'antd';
import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { DEVICES_LIST_BY_SERIAL_NUMBER_SIZE } from './individualDevicesViesBySerialNumberService.constants';
import { individualDevicesViewBySerialNumberService } from './individualDevicesViesBySerialNumberService.model';
import {
  PaginationSC,
  Wrapper,
} from './individualDevicesViesBySerialNumberService.styled';
import { IndividualDeviceListBySerialNumber } from './view/IndividualDeviceListBySerialNumber';
import { IndividualDevicesViewBySerialNumberSearch } from './view/SerialNumberSearch';

const { inputs, outputs } = individualDevicesViewBySerialNumberService;

export const IndividualDevicesViewBySerialNumberContainer = () => {
  const filter = useStore(outputs.$searchPayload);
  const devices = useStore(outputs.$devices);
  const totalItems = useStore(outputs.$totalItems);
  const mountPlaces = useStore(outputs.$mountPlaces);
  const isLoading = useStore(outputs.$isLoading);

  const setFilter = useEvent(inputs.setFilter);
  const clearSearchPayload = useEvent(inputs.clearFilter);
  const changePageNumber = useEvent(inputs.changePageNumber);

  return (
    <>
      <IndividualDevicesViewBySerialNumberSearch
        clearSearchPayload={() => {
          clearSearchPayload();
        }}
        filter={filter}
        setFilter={setFilter}
        mountPlaces={mountPlaces}
      />
      {!isLoading && Boolean(devices.length) && (
        <Wrapper>
          <div>
            <IndividualDeviceListBySerialNumber devices={devices} />
          </div>
          <PaginationSC
            defaultCurrent={1}
            onChange={changePageNumber}
            pageSize={DEVICES_LIST_BY_SERIAL_NUMBER_SIZE}
            total={totalItems}
            current={filter?.PageNumber}
            showSizeChanger={false}
          />
        </Wrapper>
      )}
      {isLoading && <Skeleton active />}
    </>
  );
};

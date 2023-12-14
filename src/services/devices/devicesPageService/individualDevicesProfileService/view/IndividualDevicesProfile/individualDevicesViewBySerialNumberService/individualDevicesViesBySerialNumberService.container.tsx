import { Skeleton } from 'antd';
import { useUnit } from 'effector-react';
import React, { FC } from 'react';
import { DEVICES_LIST_BY_SERIAL_NUMBER_SIZE } from './individualDevicesViesBySerialNumberService.constants';
import { individualDevicesViewBySerialNumberService } from './individualDevicesViesBySerialNumberService.model';
import {
  PaginationSC,
  Wrapper,
} from './individualDevicesViesBySerialNumberService.styled';
import { IndividualDeviceListBySerialNumber } from './view/IndividualDeviceListBySerialNumber';
import { IndividualDevicesViewBySerialNumberSearch } from './view/SerialNumberSearch';
import { HeaderInject } from 'services/objects/objectsProfileService/view/ObjectsProfile/ObjectsProfile.types';

const { inputs, outputs } = individualDevicesViewBySerialNumberService;

export const IndividualDevicesViewBySerialNumberContainer: FC<HeaderInject> = ({
  Header,
}) => {
  const {
    changePageNumber,
    clearSearchPayload,
    devices,
    filter,
    isLoading,
    mountPlaces,
    setFilter,
    totalItems,
  } = useUnit({
    filter: outputs.$searchPayload,
    devices: outputs.$devices,
    totalItems: outputs.$totalItems,
    mountPlaces: outputs.$mountPlaces,
    isLoading: outputs.$isLoading,
    setFilter: inputs.setFilter,
    clearSearchPayload: inputs.clearFilter,
    changePageNumber: inputs.changePageNumber,
  });

  return (
    <>
      <Header>
        <IndividualDevicesViewBySerialNumberSearch
          clearSearchPayload={() => {
            clearSearchPayload();
          }}
          filter={filter}
          setFilter={setFilter}
          mountPlaces={mountPlaces}
        />
      </Header>
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

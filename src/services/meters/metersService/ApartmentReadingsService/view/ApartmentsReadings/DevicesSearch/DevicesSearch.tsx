import React, { FC, useState } from 'react';
import { DateRangeContainer, Device } from './DevicesSearch.styled';
import { DevicesSearchProps } from './DevicesSearch.types';
import { NavLink } from 'react-router-dom';
import { IndividualDeviceListItemResponse } from 'api/types';
import axios from 'api/axios';
import { DeviceDataString } from '01/features/individualDevices/switchIndividualDevice/components/DeviceDataString';
import { Flex } from '01/shared/ui/Layout/Flex';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { CancelTokenSource } from 'axios';
import { DeviceStatus } from 'ui-kit/shared_components/IndividualDeviceInfo/DeviceStatus';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
import { AutoComplete } from 'ui-kit/AutoComplete';
import { DateRange } from 'ui-kit/shared_components/DateRange';
import { individualDeviceMountPlacesService } from 'services/devices/individualDeviceMountPlacesService/individualDeviceMountPlacesService.model';

const { AllIndividualDeviceMountPlacesGate } =
  individualDeviceMountPlacesService.gates;

export const DevicesSearch: FC<DevicesSearchProps> = ({
  handleClickDevice,
  allIndividualDeviceMountPlaces,
}) => {
  const [serialNumber, setSerialNumber] = useState('');
  const [devices, setDevices] = useState<IndividualDeviceListItemResponse[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [cancelTokenSource, setCancelTokenSource] =
    useState<CancelTokenSource | null>(null);

  async function fetchDevices() {
    if (!serialNumber) return;

    if (cancelTokenSource) {
      cancelTokenSource.cancel();
      setCancelTokenSource(null);
    }

    setIsLoading(true);

    try {
      const newCancelToken = axios.CancelToken.source();
      setCancelTokenSource(newCancelToken);
      const res: {
        items: IndividualDeviceListItemResponse[];
      } = await axios.get('IndividualDevices', {
        params: {
          serialNumber,
          pageNumber: 1,
          pageSize: 25,
          orderRule: 'serialNumber',
        },
        cancelToken: newCancelToken?.token,
      });

      setDevices(res.items);
    } catch (error) {}
    setIsLoading(false);
  }

  const onKeyDownHandler = (e: any) => {
    if (e?.key === 'Enter') fetchDevices();
  };

  const renderDevice = (
    device: IndividualDeviceListItemResponse,
    index: number,
  ) => (
    <NavLink
      to={`/meters/apartments/${device.apartmentId}`}
      onClick={handleClickDevice}
      key={device.id}
    >
      <Device key={index}>
        <Flex>
          <DeviceDataString device={device} />
          <Space />
          <DeviceStatus
            isActive={device.closingDate === null}
            closingReason={device.closingReason}
          />
          <DateRangeContainer>
            <DateRange
              firstDate={device.lastCheckingDate}
              lastDate={device.futureCheckingDate}
              bold
            />
          </DateRangeContainer>
          <Space />
          <div>
            {allIndividualDeviceMountPlaces &&
              device.mountPlace &&
              allIndividualDeviceMountPlaces.find(
                (mountPlaceFromServer) =>
                  mountPlaceFromServer.name === device.mountPlace,
              )?.description}
          </div>
        </Flex>
      </Device>
    </NavLink>
  );

  return (
    <>
      <AllIndividualDeviceMountPlacesGate />
      <AutoComplete
        style={{ width: '100%' }}
        small
        value={serialNumber}
        onChange={setSerialNumber}
        placeholder="Серийный номер прибора"
        onKeyDown={onKeyDownHandler}
      />
      <WithLoader isLoading={isLoading}>
        {devices?.map(renderDevice)}
      </WithLoader>
    </>
  );
};

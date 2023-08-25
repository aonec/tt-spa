import React, { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CancelTokenSource } from 'axios';
import axios from 'api/axios';
import { IndividualDeviceListItemResponse } from 'api/types';
import { DateRangeContainer, Device } from './DevicesSearch.styled';
import { DevicesSearchProps } from './DevicesSearch.types';
import { DeviceStatus } from 'ui-kit/shared/IndividualDeviceInfo/DeviceStatus';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { AutoComplete } from 'ui-kit/AutoComplete';
import { DateRange } from 'ui-kit/shared/DateRange';
import { individualDeviceMountPlacesService } from 'services/devices/individualDeviceMountPlacesService/individualDeviceMountPlacesService.model';
import { DeviceDataString } from './DeviceDataString';

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
        <DeviceDataString device={device} />
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
        <div>
          {allIndividualDeviceMountPlaces &&
            device.mountPlace &&
            allIndividualDeviceMountPlaces.find(
              (mountPlaceFromServer) =>
                mountPlaceFromServer.name === device.mountPlace,
            )?.description}
        </div>
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

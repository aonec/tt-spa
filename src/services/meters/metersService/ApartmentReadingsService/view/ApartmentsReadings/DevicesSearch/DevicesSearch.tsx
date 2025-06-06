import React, { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CancelTokenSource } from 'axios';
import axios from 'api/axios';
import { IndividualDeviceListResponseFromDevicePage } from 'api/types';
import { DateRangeContainer, Device } from './DevicesSearch.styled';
import { DevicesSearchProps } from './DevicesSearch.types';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { AutoComplete } from 'ui-kit/AutoComplete';
import { individualDeviceMountPlacesService } from 'services/devices/individualDeviceMountPlacesService/individualDeviceMountPlacesService.model';
import { DeviceDataString } from './DeviceDataString';
import { DeviceStatus } from 'ui-kit/shared/IndividualDeviceInfo/DeviceStatus';
import { DateRange } from 'ui-kit/shared/DateRange';

const { AllIndividualDeviceMountPlacesGate } =
  individualDeviceMountPlacesService.gates;

export const DevicesSearch: FC<DevicesSearchProps> = ({
  handleClickDevice,
}) => {
  const [serialNumber, setSerialNumber] = useState('');
  const [devices, setDevices] =
    useState<IndividualDeviceListResponseFromDevicePage[]>();
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
        items: IndividualDeviceListResponseFromDevicePage[];
      } = await axios.get('Devices/Individual', {
        params: {
          serialNumber,
          pageNumber: 1,
          pageSize: 25,
          OrderRule: 'SerialNumber',
          IsAlsoClosing: true,
        },
        cancelToken: newCancelToken?.token,
      });

      setDevices(res.items);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e?.key === 'Enter') fetchDevices();
  };

  const renderDevice = (
    device: IndividualDeviceListResponseFromDevicePage,
    index: number,
  ) => (
    <NavLink
      to={`/meters/apartments/${device.apartmentId}`}
      onClick={handleClickDevice}
      key={device.id}
    >
      <Device key={index}>
        <DeviceDataString device={device} />
        {device.closingReason && (
          <DeviceStatus
            isActive={device.closingDate === null}
            closingReason={device.closingReason}
          />
        )}
        {device.lastCheckingDate && device.futureCheckingDate && (
          <DateRangeContainer>
            <DateRange
              firstDate={device.lastCheckingDate}
              lastDate={device.futureCheckingDate}
              bold
            />
          </DateRangeContainer>
        )}
        <div>{device.mountPlace}</div>
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
        onChange={(value) => setSerialNumber(String(value))}
        placeholder="Серийный номер прибора"
        onKeyDown={onKeyDownHandler}
      />
      <WithLoader isLoading={isLoading}>
        {devices?.map(renderDevice)}
      </WithLoader>
    </>
  );
};

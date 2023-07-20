import React, { FC } from 'react';
import {
  DateRangeContainer,
  Device,
  DeviceName,
  DeviceSerialNumber,
} from './IndividualDeviceItem.styled';
import { IndividualDeviceItemProps } from './IndividualDeviceItem.types';
import { Checkbox } from 'antd';
import { ResourceIconLookup } from 'ui-kit/sharedComponents/ResourceIconLookup';
import { DateRange } from 'ui-kit/sharedComponents/DateRange';
import { DeviceStatus } from 'ui-kit/sharedComponents/IndividualDeviceInfo/DeviceStatus';
import { useStore } from 'effector-react';
import { individualDeviceMountPlacesService } from 'services/devices/individualDeviceMountPlacesService';

const { outputs } = individualDeviceMountPlacesService;

export const IndividualDeviceItem: FC<IndividualDeviceItemProps> = ({
  device,
  isSelected,
  chooseDevice,
  isCheckable,
}) => {
  const allIndividualDeviceMountPlaces = useStore(
    outputs.$allIndividualDeviceMountPlaces,
  );

  return (
    <Device
      selected={isSelected}
      onClick={() => chooseDevice && chooseDevice(device.id)}
    >
      {isCheckable && <Checkbox checked={isSelected} />}
      <>
        {device?.resource && <ResourceIconLookup resource={device?.resource} />}
        {device.serialNumber && (
          <DeviceSerialNumber>{device.serialNumber}</DeviceSerialNumber>
        )}
        <DeviceName>{device.model}</DeviceName>
      </>

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
  );
};

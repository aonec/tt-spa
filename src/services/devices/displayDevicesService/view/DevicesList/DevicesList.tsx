import DevicesByAddress from '01/_pages/Devices/components/DevicesByAddress/DevicesByAddress';
import { groupDevicesByObjects } from '01/_pages/Devices/components/utils/groupDevicesByObjects';
import { uniqueId } from 'lodash';
import React, { FC } from 'react';
import { Wrapper } from './DevicesList.styled';
import { DevicesListProps } from './DevicesList.types';

export const DevicesList: FC<DevicesListProps> = ({
  calculators,
  isLoading,
}) => {
  const devices = groupDevicesByObjects(calculators)
  const deviceArray = devices.map((addressDevicesGroup) => (
    <DevicesByAddress
      key={addressDevicesGroup.address?.mainAddress?.id}
      addressDevicesGroup={addressDevicesGroup}
    />
  ));
  return (
    <Wrapper>
      {isLoading ? (
        <div role="loader">ЗАГРУЗКА...</div>
      ) : (
        <div>
          <div>
            {deviceArray}
          </div>
        </div>
      )}
    </Wrapper>
  );
};

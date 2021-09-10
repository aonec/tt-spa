import React from 'react';
import { IndividualDeviceResponse } from '../../../../myApi';
import { HeaderWrap } from '../../../tt-components';
import IsActive from '../../../tt-components/IsActive';
import { Breadcrumb } from '../../../tt-components/Breadcrumb';
import { Loader } from '01/_components/Loader';
import { Title, Subtitle } from '01/_components/Headers';
import { DeviceIcon } from '01/_pages/Devices/components/DeviceBlock/DeviceBlock';
import DeviceIcons from '01/_components/DeviceIcons';
import { Flex } from '01/shared/ui/Layout/Flex';
import { Space } from '01/shared/ui/Layout/Space/Space';

interface HeaderInterface {
  device: IndividualDeviceResponse;
}

export const Header = ({ device }: HeaderInterface) => {
  if (!device) {
    return null;
  }
  const loading = !device;
  const { address, model, serialNumber, resource, closingDate } = device;

  const { city, street, housingStockNumber, apartmentNumber, id, apartmentId } =
    address || {};

  return (
    <Loader show={loading} size="32">
      <Breadcrumb />
      <HeaderWrap>
        <div>
          <Title>
            <Flex>
              <div style={{ transform: 'translateY(-2px)' }}>
                <DeviceIcon icon={DeviceIcons[resource]?.icon} size="24" dark />
              </div>
              <Space w={9} />
              <div>{`${model} (${serialNumber}). Редактирование`}</div>
            </Flex>
          </Title>
          <div style={{ display: 'flex' }}>
            <Subtitle
              to={`/objects/${id}/apartments/${apartmentId}`}
            >{`${city}, ${street}, д. ${housingStockNumber}, кв. ${apartmentNumber}`}</Subtitle>
            <IsActive closingDate={closingDate} />
          </div>
        </div>
      </HeaderWrap>
    </Loader>
  );
};

export default Header;

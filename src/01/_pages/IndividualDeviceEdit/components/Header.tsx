import React from 'react';
import { IndividualDeviceResponse } from '../../../../myApi';
import { HeaderWrap } from '../../../tt-components';
import IsActive from '../../../tt-components/IsActive';
import { Loader } from '01/_components/Loader';
import { Title, Subtitle } from '01/_components/Headers';
import { StockIconTT } from '01/_pages/Devices/components/DeviceBlock/DeviceBlock';
import DeviceIcons from '01/_components/DeviceIcons';
import { Flex } from '01/shared/ui/Layout/Flex';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { getApartmentAddressString } from 'utils/getApartmentAddress';

interface HeaderInterface {
  device: IndividualDeviceResponse;
}

export const Header = ({ device }: HeaderInterface) => {
  if (!device) {
    return null;
  }
  const loading = !device;
  const { address, model, serialNumber, resource, closingDate } = device;
  const { id, apartmentId } = address || {};


  return (
    <Loader show={loading} size="32">
      <GoBack />
      <HeaderWrap>
        <div>
          <Title>
            <Flex>
              <div style={{ transform: 'translateY(-2px)' }}>
                <StockIconTT
                  icon={DeviceIcons[resource]?.icon}
                  size="24"
                  dark
                />
              </div>
              <Space w={9} />
              <div>{`${model} (${serialNumber}). Редактирование`}</div>
            </Flex>
          </Title>
          <div style={{ display: 'flex' }}>
            <Subtitle to={`/objects/${id}/apartments/${apartmentId}`}>
              {/* {getApartmentAddressString(address)} */}
            </Subtitle>
            <IsActive closingDate={closingDate} />
          </div>
        </div>
      </HeaderWrap>
    </Loader>
  );
};

export default Header;

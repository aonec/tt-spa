import React from 'react';
import { IndividualDeviceResponse } from '../../../../myApi';
import { HeaderWrap } from '../../../tt-components';
import IsActive from '../../../tt-components/IsActive';
import { Loader } from '01/_components/Loader';
import { Title, Subtitle } from '01/_components/Headers';
import DeviceIcons from '01/_components/DeviceIcons';
import { Flex } from '01/shared/ui/Layout/Flex';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { getApartmentFromFullAddress } from 'utils/getApartmentFromFullAddress';
import {
  StockIconWrapper,
  WrapperFlex,
} from './IndividualDeviceEditForm.styled';
import { StockIconTT } from '01/shared/ui/StockIconTT/StockIconTT';

interface HeaderInterface {
  device: IndividualDeviceResponse;
}

export const Header = ({ device }: HeaderInterface) => {
  if (!device) {
    return null;
  }
  const loading = !device;
  const { address, model, serialNumber, resource, closingDate } = device;
  const { apartmentId } = address || {};

  return (
    <Loader show={loading} size={32}>
      <GoBack />
      <HeaderWrap>
        <div>
          <Title>
            <Flex>
              <StockIconWrapper>
                <StockIconTT
                  icon={DeviceIcons[resource]?.icon}
                  size="24"
                  dark
                />
              </StockIconWrapper>
              <Space w={9} />
              <div>{`${model} (${serialNumber}). Редактирование`}</div>
            </Flex>
          </Title>
          <WrapperFlex>
            <Subtitle to={`/apartments/${apartmentId}`} >
              {getApartmentFromFullAddress(address, true)}
            </Subtitle>
            <IsActive closingDate={closingDate} />
          </WrapperFlex>
        </div>
      </HeaderWrap>
    </Loader>
  );
};

export default Header;

import React from 'react';
import { IconTT } from '../../../tt-components';
import { PipeHousingMeteringDeviceResponse } from '../../../../myApi';
import {
  DEFAULT_BUILDING,
  DEFAULT_DEVICE,
} from '../../../tt-components/localBases';
import { HeaderWrap, Title, Subtitle } from '../../../_components/Headers';
import { getHousingStockAddress } from 'utils/getHousingStockAddress';
import IsActive from '01/tt-components/IsActive';
import { Infowrapper } from './Header.styled';

interface HousingMeteringDeviceInterface {
  device: PipeHousingMeteringDeviceResponse;
}

export const Header = ({ device }: HousingMeteringDeviceInterface) => {
  const { address, model, serialNumber, resource, closingDate } =
    device || DEFAULT_DEVICE;
  const { id } = address || DEFAULT_BUILDING;
  return (
    <HeaderWrap
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <Title>
          <IconTT
            icon={resource?.toLowerCase()}
            size="24"
            style={{ marginRight: 8 }}
          />
          {`${model} (${serialNumber})`}
        </Title>
        <Infowrapper>
          <Subtitle to={`/objects/${id}`}>
            {getHousingStockAddress(address, true)}
          </Subtitle>
          <IsActive closingDate={closingDate} />
        </Infowrapper>
      </div>
      {/*<MenuButtonTT menuButtonArr={menuButtonArr} />*/}
    </HeaderWrap>
  );
};

export default Header;

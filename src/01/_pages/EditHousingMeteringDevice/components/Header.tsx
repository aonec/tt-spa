import React from 'react';
import { HeaderWrap, Title, Subtitle } from '01/_components';
import { IconTT } from '../../../tt-components';
import { HousingMeteringDeviceResponse } from '../../../../myApi';
import {
  DEFAULT_BUILDING,
  DEFAULT_DEVICE,
} from '../../../tt-components/localBases';

interface HousingMeteringDeviceInterface {
  device: HousingMeteringDeviceResponse;
}

export const Header = ({ device }: HousingMeteringDeviceInterface) => {
  const { address, model, serialNumber, resource } = device || DEFAULT_DEVICE;
  const { city, street, housingStockNumber, corpus, id } =
    address || DEFAULT_BUILDING;

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

        <Subtitle
          to={`/objects/${id}`}
        >{`${city}, ${street}, ${housingStockNumber}${
          corpus ? `, к.${corpus}` : ''
        }`}</Subtitle>
      </div>

      {/*<MenuButtonTT menuButtonArr={menuButtonArr} />*/}
    </HeaderWrap>
  );
};

export default Header;

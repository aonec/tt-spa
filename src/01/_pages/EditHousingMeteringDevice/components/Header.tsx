import React from 'react';
import { IconTT } from '../../../tt-components';
import { PipeHousingMeteringDeviceResponse } from '../../../../myApi';
import {
  DEFAULT_BUILDING,
  DEFAULT_DEVICE,
} from '../../../tt-components/localBases';
import { HeaderWrap, Title, Subtitle } from '../../../_components/Headers';

interface HousingMeteringDeviceInterface {
  device: PipeHousingMeteringDeviceResponse;
}

export const Header = ({ device }: HousingMeteringDeviceInterface) => {
  const { address, model, serialNumber, resource } = device || DEFAULT_DEVICE;
  const { city, street, number, corpus, id } =
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
        >{`${city}, ${street}, ${number}${
          corpus ? `, к.${corpus}` : ''
        }`}</Subtitle>
      </div>

      {/*<MenuButtonTT menuButtonArr={menuButtonArr} />*/}
    </HeaderWrap>
  );
};

export default Header;

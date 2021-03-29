import React from 'react';
import { Loader, HeaderWrap, Title, Subtitle } from '01/_components';

import { IndividualDeviceResponse } from '../../../../myApi';
import { IconTT } from '../../../tt-components';
import { DEFAULT_INDIVIDUAL_DEVICE } from '../../../tt-components/localBases';

interface HeaderInterface {
  device: IndividualDeviceResponse;
}

export const Header = ({ device }: HeaderInterface) => {
  if (!device) {
    return null;
  }
  const loading = !device;
  const { address, model, serialNumber, resource } =
    device || DEFAULT_INDIVIDUAL_DEVICE;

  const {
    city,
    street,
    housingStockNumber,
    apartmentNumber,
    id,
    apartmentId,
  } = address;

  return (
    <HeaderWrap>
      <Loader show={loading} size="32">
        <Title>
          <IconTT
            icon={resource.toLocaleLowerCase()}
            size="24"
            style={{ marginRight: 8 }}
          />
          {`${model} (${serialNumber})`}
        </Title>
        <Subtitle
          to={`/objects/${id}/apartments/${apartmentId}`}
        >{`${city}, ${street}, д. ${housingStockNumber}, кв. ${apartmentNumber}`}</Subtitle>
      </Loader>
    </HeaderWrap>
  );
};

export default Header;

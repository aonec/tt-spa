import React from 'react';
import { Loader, Title, Subtitle } from '01/_components';

import { IndividualDeviceResponse } from '../../../../myApi';
import { IconTT, HeaderWrap } from '../../../tt-components';
import IsActive from '../../../tt-components/IsActive';
import { useHistory } from 'react-router-dom';
import getAccessesList from '../../../_api/utils/getAccessesList';
import MenuButtonTT from '../../../tt-components/MenuButtonTT';
import { Breadcrumb } from '../../../tt-components/Breadcrumb';

interface HeaderInterface {
  device: IndividualDeviceResponse;
}

export const Header = ({ device }: HeaderInterface) => {
  const { push } = useHistory();
  const access = getAccessesList();
  const { show } = access;
  if (!device) {
    return null;
  }
  const loading = !device;
  const { address, model, serialNumber, resource, closingDate } = device;

  const {
    city,
    street,
    housingStockNumber,
    apartmentNumber,
    id,
    apartmentId,
  } = address;

  return (
    <Loader show={loading} size="32">
      <Breadcrumb path={`/objects/${id}/apartments/${apartmentId}/testimony`} />
      <HeaderWrap>
        <div>
          <Title>
            <IconTT
              icon={resource.toLocaleLowerCase()}
              size="24"
              style={{ marginRight: 8 }}
            />
            {`${model} (${serialNumber}). Редактирование`}
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

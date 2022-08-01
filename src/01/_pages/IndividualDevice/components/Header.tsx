import React from 'react';
import { IconTT, HeaderWrap } from '../../../tt-components';
import IsActive from '../../../tt-components/IsActive';
import { useHistory } from 'react-router-dom';
import getAccessesList from '../../../_api/utils/getAccessesList';
import MenuButtonTT from '../../../tt-components/MenuButtonTT';
import { IndividualDeviceResponse } from '../../../../api/types';
import { Loader } from '../../../_components/Loader';
import { GoBack } from '../../../../ui-kit/shared_components/GoBack';
import { Subtitle, Title } from '../../../_components/Headers';

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

  const { city, street, housingStockNumber, apartmentNumber, id, apartmentId } =
    address || {};

  const menuButtonArr = device
    ? [
        {
          title: 'Редактировать',
          cb: () => push(`/individualDevices/${device.id}/edit`),
          show: show('IndividualDeviceUpdate'),
          color: 'default',
        },
        {
          title: 'Открыть историю показаний',
          cb: () => {
            alert('Открыть историю показаний');
          },
          show: show('IndividualDeviceUpdate'),
          color: 'default',
        },
        {
          title: 'Поверить прибор',
          cb: () => {
            alert('Поверить прибор');
          },
          show: show('IndividualDeviceUpdate'),
          color: 'default',
        },
        {
          title: 'Закрыть прибор',
          cb: () => {
            alert('Закрыть прибор');
          },
          show: show('IndividualDeviceUpdate'),
          color: 'red',
        },
      ]
    : null;

  return (
    <Loader show={loading} size="32">
      <GoBack path={`/objects/${id}/apartments/${apartmentId}/testimony`} />
      <HeaderWrap>
        <div>
          <Title>
            <IconTT
              icon={resource.toLocaleLowerCase()}
              size="24"
              style={{ marginRight: 8 }}
            />
            {`${model} (${serialNumber})`}
          </Title>
          <div style={{ display: 'flex' }}>
            <Subtitle
              to={`/objects/${id}/apartments/${apartmentId}`}
            >{`${city}, ${street}, д. ${housingStockNumber}, кв. ${apartmentNumber}`}</Subtitle>
            <IsActive closingDate={closingDate} />
          </div>
        </div>

        <MenuButtonTT menuButtonArr={menuButtonArr} />
      </HeaderWrap>
    </Loader>
  );
};

export default Header;

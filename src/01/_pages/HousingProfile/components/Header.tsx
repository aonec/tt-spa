import React, { Dispatch, SetStateAction } from 'react';
import { useHistory } from 'react-router-dom';
import { IconTT, MenuButtonTT } from '../../../tt-components';
import getAccessesList from '../../../_api/utils/getAccessesList';
import { PipeHousingMeteringDeviceResponse } from '../../../../myApi';
import {
  DEFAULT_BUILDING,
  DEFAULT_DEVICE,
} from '../../../tt-components/localBases';
import { HeaderWrap, Title, Subtitle } from '01/_components/Headers';

interface HousingMeteringDeviceInterface {
  device: PipeHousingMeteringDeviceResponse;
  setDeregister: Dispatch<SetStateAction<boolean>>;
  setCheckVisible: Dispatch<SetStateAction<boolean>>;
}

export const Header = ({
  device,
  setDeregister,
  setCheckVisible,
}: HousingMeteringDeviceInterface) => {
  const { push } = useHistory();
  const access = getAccessesList();
  const { show } = access;

  if (!device) {
    return null;
  }

  const { address, model, serialNumber, resource } = device || DEFAULT_DEVICE;
  const { city, street, number, corpus, id } = address || DEFAULT_BUILDING;

  const menuButtonArr = [
    {
      title: 'Редактировать ОДПУ',
      cb: () => {
        push(`/housingMeteringDevices/${device.id}/edit_odpu`);
      },
      show: show('HousingMeteringDeviceUpdate'),
      color: 'default',
      clickable: true,
    },
    {
      title: 'Поверка ОДПУ',
      cb: () => {
        setCheckVisible(true);
      },
      show: show('HousingMeteringDeviceUpdate'),
      color: 'default',
      clickable: true,
    },
    {
      title: 'Закрыть ОДПУ',
      cb: () => {
        setDeregister(true);
      },
      show: show('HousingMeteringDeviceUpdate'),
      color: 'red',
      clickable: true,
    },
  ];

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

        <Subtitle to={`/objects/${id}`}>{`${city}, ${street}, ${number}${
          corpus ? `, к.${corpus}` : ''
        }`}</Subtitle>
      </div>

      <MenuButtonTT menuButtonArr={menuButtonArr} />
    </HeaderWrap>
  );
};

export default Header;

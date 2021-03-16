import React, { useContext } from 'react';
import {
  Icon, Loader, HeaderWrap, Title, Subtitle,
} from '01/_components';
import DeviceIcons from '01/_components/DeviceIcons';
import { useHistory } from 'react-router-dom';
import { DeviceContext } from '../CalculatorProfile';
import { DEFAULT_BUILDING, DEFAULT_DEVICE, DEFAULT_ICON } from './Templates';
import { MenuButtonTT } from '../../../tt-components';

export const Header = () => {
  const { push } = useHistory();

  const {
    device,
    building,
    calcModel,
    setReport,
    setDeregister,
    user,
  } = useContext(DeviceContext);

  if (!user) {
      return <Loader size="64" show />
  }

  const {
    city, street, housingStockNumber, corpus, id,
  } = building || DEFAULT_BUILDING;
  const { model, serialNumber, resource } = device || DEFAULT_DEVICE;
  const { icon, color } = DeviceIcons[resource] || DEFAULT_ICON;

  const menuButtonArr = [
    {
      title: 'Редактировать вычислитель',
      cb: () => {
        push(`/calculators/${device.id}/edit`);
      },
      color: 'default',
    },
    {
      title: 'Выгрузить отчет о общедомовом потреблении',
      cb: () => {
        setReport(true);
      },
      color: 'default',
    },
    {
      title: 'Добавить Узел',
      cb: () => {
        push(`/objects/${device.address.id}/add_node`);
      },
      color: 'default',
    },
    {
      title: 'Закрыть вычислитель',
      cb: () => {
        setDeregister(true);
      },
      color: 'red',
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
          <Icon
            icon={icon}
            color={color}
            size="24"
            style={{ marginRight: '8px' }}
          />
          {`${model || 'Вычислитель'} (${serialNumber})`}
        </Title>
        {/* <ButtonTT onClick={buttonHandler}>TEST</ButtonTT> */}
        <Subtitle to={`/objects/${id}`}>
          {`${city}, ${street}, ${housingStockNumber}${
            corpus ? `, к.${corpus}` : ''
          }`}
        </Subtitle>
      </div>
      <div style={{ position: 'relative' }}>
        <MenuButtonTT menuButtonArr={menuButtonArr} />
      </div>
    </HeaderWrap>
  );
};

export default Header;

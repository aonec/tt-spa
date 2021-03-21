import React, { useContext } from 'react';
import {
  Icon, Loader, HeaderWrap, Title, Subtitle,
} from '01/_components';
import DeviceIcons from '01/_components/DeviceIcons';
import { useHistory } from 'react-router-dom';
import { DeviceContext } from '../CalculatorProfile';
import { DEFAULT_BUILDING, DEFAULT_DEVICE, DEFAULT_ICON } from './Templates';
import { MenuButtonTT } from '../../../tt-components';
import isWatcher from "../../../_api/utils/isWatcher";

export const Header = () => {
  const { push } = useHistory();

  const {
    device,
    building,
    calcModel,
    setReport,
    setDeregister,
  } = useContext(DeviceContext);





  const {
    city, street, housingStockNumber, corpus, id,
  } = building || DEFAULT_BUILDING;
  const { model, serialNumber, resource } = device || DEFAULT_DEVICE;
  const { icon, color } = DeviceIcons[resource] || DEFAULT_ICON;


  const menuButtonArr = [
    {
      title: 'Редактировать вычислитель',
      cb: () => !isWatcher ? alert('Вы не имеете права редактирования!') : push(`/calculators/${device.id}/edit`),
      show: !isWatcher,
      color: !isWatcher ? 'disabled' : 'default',
      clickable: !isWatcher
    },
    {
      title: 'Выгрузить отчет о общедомовом потреблении',
      cb: () => {
        setReport(true);
      },
      show: true,
      color: 'default',
    },
    {
      title: 'Добавить Узел',
      cb: () => {
        push(`/objects/${device.address.id}/add_node`);
      },
      show: !isWatcher,
      color: 'default',
    },
    {
      title: 'Закрыть вычислитель',
      cb: () => {
        setDeregister(true);
      },
      show: !isWatcher,
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

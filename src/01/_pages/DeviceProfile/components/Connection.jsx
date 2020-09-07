import React, { useContext } from 'react';
import { Loader } from '01/components';
import { ListWrap, ListItem, Title } from '01/_components/List';
import { DeviceContext } from '../DeviceProfile';

export const Connection = () => {
  const { device } = useContext(DeviceContext);
  const buttonHandler = () => {
    console.log('buttonHandler');
  };

  if (device) {
    return (
      <ListWrap>
        <Title>Настройки</Title>
        <ListItem>
          <span>IP адрес вычислителя</span>
          <span>{device.ipV4 || 'X'}</span>
        </ListItem>
        <ListItem>
          <span>Порт</span>
          <span>{device.port || 'X'}</span>
        </ListItem>
        <ListItem>
          <span>Адрес прибора</span>
          <span>{device.deviceAddress || 'X'}</span>
        </ListItem>
      </ListWrap>
    );
  }
  // пока не получили данные - показываем Loader
  return <Loader show size="32" />;
};

export default Connection;

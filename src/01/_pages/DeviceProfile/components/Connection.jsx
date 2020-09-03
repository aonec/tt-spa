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
    console.log(device);

    return (
      <ListWrap>
        <Title>Настройки</Title>
        <ListItem>
          <span>IP адрес вычислителя</span>
          <span>{device.ipV4}</span>
        </ListItem>
        <ListItem>
          <span>Порт</span>
          <span>по умолчанию: 1234</span>
        </ListItem>
        <ListItem>
          <span>Адрес прибора</span>
          <span>по умолчанию: 1234</span>
        </ListItem>
      </ListWrap>
    );
  }
  // пока не получили данные - показываем Loader
  return <Loader show size="32" />;
};

export default Connection;

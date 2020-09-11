import React, { useContext } from 'react';
import { Loader } from '01/components';
import _ from 'lodash';
import { ListWrap, ListItem, Title } from '01/_components/List';
import { DeviceContext } from '../DeviceProfile';

export const Connection = () => {
  const { device, loadings } = useContext(DeviceContext);
  // const loadingDevice = _.get(loadings, 'device', true);
  const loading = _.get(loadings, 'device', true);

  const buttonHandler = () => {
    console.log('buttonHandler');
  };

  return (
    <ListWrap>
      <Title>Настройки</Title>
      <Loader show={loading} size="32">
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
      </Loader>
    </ListWrap>
  );
};

export default Connection;

import React, { useContext } from 'react';
import { Loader } from '../../../components';
import _ from 'lodash';
import { ListWrap, ListItem, Title } from '../../../_components/List';
import { DeviceContext } from '../DeviceProfile';

export const Connection = () => {
  const { device, loadings } = useContext(DeviceContext);
  const {connection: {ipV4, port, deviceAddress }} = device;
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
          <span>{ipV4 || 'X'}</span>
        </ListItem>
        <ListItem>
          <span>Порт</span>
          <span>{port || 'X'}</span>
        </ListItem>
        <ListItem>
          <span>Адрес прибора</span>
          <span>{deviceAddress || 'X'}</span>
        </ListItem>
      </Loader>
    </ListWrap>
  );
};

export default Connection;

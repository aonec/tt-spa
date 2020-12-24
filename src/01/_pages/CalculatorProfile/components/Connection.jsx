import React, { useContext } from 'react';
import _ from 'lodash';
import { Loader } from '../../../components';
import { ListWrap, ListItem, Title } from '../../../_components/List';
import { DeviceContext } from '../CalculatorProfile';
import styles from '../calculator.module.css';
import { NotConnectedIcon } from '../../../components/NotConnectedIcon/NotConnectedIcon';

export const Connection = () => {
  const { device, loadings } = useContext(DeviceContext);
  const { connection, isConnected } = device;
  const {
     ipV4, port, deviceAddress,
  } = connection || {
    ipV4: '',
    port: null,
    deviceAddress: null,
  };
  const loading = _.get(loadings, 'device', true);

  const NoConnection = () => {
    console.log('NoConnection');
    return (
      <div className={styles.warning}>
        <NotConnectedIcon is={"calculator"} />
        <span>Вычислитель без оборудования связи</span>
      </div>
    );
  };

  return (
    <div>
      {!isConnected ? <NoConnection /> : null }
      <ListWrap style={{ opacity: !isConnected ? '0.5' : null }}>
        <Loader show={loading} size="32">
          <Title>Настройки</Title>
          <ListItem>
            <span>IP адрес вычислителя</span>
            <span>{ipV4}</span>
          </ListItem>
          <ListItem>
            <span>Порт</span>
            <span>{port}</span>
          </ListItem>
          <ListItem>
            <span>Адрес прибора</span>
            <span>{deviceAddress}</span>
          </ListItem>
        </Loader>
      </ListWrap>
    </div>

  );
};

export default Connection;

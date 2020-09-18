import React, {useContext} from 'react';
import './page2.scss';
import { ConfigProvider, DatePicker } from 'antd';
import ruRu from 'antd/es/locale/ru_RU';
import { AddDeviceContext } from '../../index'

export const Page2 = () => {
  const { serialNumberRandom, deviceAddressRandom, onInputChange } = useContext(AddDeviceContext)
  console.log('Page2');
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="tt-labelandinput">
        <label htmlFor="#resource" className="tt-label">
          IP адрес вычислителя
        </label>
        <input
          className="tt-input"
          id="ipV4"
          type="text"
          required
          placeholder="192.168.0.1"
          defaultValue="192.168.0.1"
          onChange={(event) => onInputChange(event)}
        />
      </div>

      <div className="tt-labelandinput">
        <label htmlFor="#resource" className="tt-label">
          Порт
        </label>
        <input
          className="tt-input"
          id="port"
          type="number"
          required
          placeholder="1234"
          defaultValue="1234"
          onChange={(event) => onInputChange(event)}
        />
      </div>

      <div className="tt-warning">
        Подключение к новому прибору может занять до 30 минут.
      </div>
    </div>
  );
};

export default Page2;

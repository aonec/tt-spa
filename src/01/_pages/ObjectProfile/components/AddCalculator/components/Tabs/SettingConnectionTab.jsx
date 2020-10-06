import React, { useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import {
  Wrap,
} from '01/tt-components';
import { Input, Form } from 'antd';
import { onChangeFormValueByPath } from '../../../store/actions';

const SettingConnectionTab = () => {
  const {
    connection,
  } = useSelector((state) => state.calculatorPage);
  const { port, ipV4, deviceAddress } = connection;
  const dispatch = useDispatch();
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>

      <Form>
        <Form.Item name="text" label="Серийный номер устройства">
          <Input
            placeholder="Серийный номер..."
            onChange={(event) => {
              const path = ['serialNumber'];
              dispatch(onChangeFormValueByPath(path, event.target.value));
            }}
          />
        </Form.Item>

        <Form.Item name="text" label="IP адрес вычислителя">
          <Input
            id="ipV4"
            type="text"
            value={ipV4}
            placeholder="Укажите IP-адрес устройства, например 192.168.0.1"
            onChange={(event) => {
              const { value } = event.target;
              const path = ['connection', 'ipV4'];
              dispatch(onChangeFormValueByPath(path, value));
            }}
          />
        </Form.Item>

        <Form.Item name="text" label="IP адрес вычислителя">
          <Input
            id="port"
            type="number"
            required
            placeholder="Укажите порт устройства (например, 1234)"
            value={port}
            onChange={(event) => {
              const { value } = event.target;
              const path = ['connection', 'port'];
              dispatch(onChangeFormValueByPath(path, Number(value)));
            }}
          />
        </Form.Item>
      </Form>
      <Wrap
        style={{
          background: ' rgba(255, 140, 104, 0.16)',
          marginTop: '24px',
          padding: '24px',
        }}
      >
        Подключение к новому прибору может занять до 30 минут.
      </Wrap>
    </div>
  );
};

export default connect()(SettingConnectionTab);

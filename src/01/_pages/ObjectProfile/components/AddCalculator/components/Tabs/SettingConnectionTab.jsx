import React from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Input, Form } from 'antd';
import { Wrap } from '../../../../../../tt-components';
import { onChangeFormValueByPath } from '../../../../../../Redux/actions/actions';

const SettingConnectionTab = () => {
  const {
    connection: { port, ipV4 },
  } = useSelector((state) => state.calculatorPage);
  const dispatch = useDispatch();

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Form.Item name="text" label="IP адрес вычислителя">
        <Input
          type="text"
          value={ipV4}
          placeholder="Укажите IP-адрес устройства, например 192.168.0.1"
          onChange={(event) => {
            const path = ['connection', 'ipV4'];
            dispatch(onChangeFormValueByPath(path, event.target.value));
          }}
        />
      </Form.Item>

      <Form.Item name="text" label="IP адрес вычислителя">
        <Input
          type="number"
          placeholder="Укажите порт устройства (например, 1234)"
          value={port}
          onChange={(event) => {
            const path = ['connection', 'port'];
            dispatch(onChangeFormValueByPath(path, Number(event.target.value)));
          }}
        />
      </Form.Item>

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

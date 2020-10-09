import React, { useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Input, Form, Select } from 'antd';
import moment from 'moment';
import { onChangeDeviceFormValueByPath } from '../../../store/actions';
import { magistrals } from '../DeviceJSON';

const SettingConnectionTab = () => {
  const {
    connection: { port, ipV4 },
    pipe: { magistral },
  } = useSelector((state) => state.deviceReducer);
  const dispatch = useDispatch();

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Form.Item
        name="text"
        label="Выберите вычислитель, к которому подключен прибор"
      >
        <Input
          id="calculatorId"
          type="number"
          placeholder="Начните вводить ID прибора"
          onChange={(event) => {
            const { value } = event.target;
            const path = ['calculatorId'];
            dispatch(onChangeDeviceFormValueByPath(path, Number(value)));
          }}
        />
      </Form.Item>

      <Form.Item name="text" label="Номер ввода">
        <Input
          id="hubNumber"
          type="number"
          placeholder="1"
          onChange={(event) => {
            const { value } = event.target;
            const path = ['pipe', 'entryNumber'];
            dispatch(onChangeDeviceFormValueByPath(path, Number(value)));
          }}
        />
      </Form.Item>

      <Form.Item name="text" label="Номер узла">
        <Input
          id="pipeNumber"
          type="number"
          placeholder="1"
          onChange={(event) => {
            const { value } = event.target;
            const path = ['pipe', 'hubNumber'];
            dispatch(onChangeDeviceFormValueByPath(path, Number(value)));
          }}
        />
      </Form.Item>

      <Form.Item name="text" label="Номер трубы">
        <Input
          id="pipeNumber"
          type="number"
          placeholder="1"
          onChange={(event) => {
            const { value } = event.target;
            const path = ['pipe', 'pipeNumber'];
            dispatch(onChangeDeviceFormValueByPath(path, Number(value)));
          }}
        />
      </Form.Item>

      <Form.Item name="text" label="Номер трубы">

        <Select
          placeholder="Выберите тип устройства"
          id="magistral"
          options={magistrals}
          defaultValue={magistrals[0].value}
          onChange={(event) => {
            const value = event;
            const path = ['pipe', 'magistral'];
            dispatch(onChangeDeviceFormValueByPath(path, value));
          }}
        />

      </Form.Item>
    </div>
  );
};

export default connect()(SettingConnectionTab);

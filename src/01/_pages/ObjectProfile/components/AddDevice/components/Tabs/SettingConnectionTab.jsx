import React, { useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { InputTT, Label, Wrap } from '01/tt-components';
import { Input, Form } from 'antd';
import { onChangeFormValueByPath } from '../../../store/actions';

const SettingConnectionTab = () => {
  const {
    connection: { port, ipV4 },
  } = useSelector((state) => state.calculatorPage);
  const dispatch = useDispatch();

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Form.Item name="text" label="Выберите вычислитель, к которому подключен прибор">
        <Input
          id="calculatorId"
          type="number"
          placeholder="Начните вводить ID прибора"
          onChange={(event) => {
            const { value } = event.target;
            const path = ['calculatorId'];
            dispatch(onChangeFormValueByPath(path, Number(value)));
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
            const path = ['calculatorId'];
            dispatch(onChangeFormValueByPath(path, Number(value)));
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
            const path = ['calculatorId'];
            dispatch(onChangeFormValueByPath(path, Number(value)));
          }}
        />
      </Form.Item>

      <Form.Item name="text" label="Номер трубы">
        <Input
          id="magistral"
          type="number"
          placeholder="1"
          onChange={(event) => {
            const { value } = event.target;
            const path = ['calculatorId'];
            dispatch(onChangeFormValueByPath(path, Number(value)));
          }}
        />
      </Form.Item>

    </div>
  );
};

export default connect()(SettingConnectionTab);

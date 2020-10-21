import React  from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Form } from 'antd';
import { onChangeDeviceFormValueByPath } from '../../../../../../Redux/actions/actions';
import {  SelectTT, InputTT } from '../../../../../../tt-components'
import { magistrals } from '../../DeviceJSON';

const SettingConnectionTab = () => {

  const {
    pipe: {entryNumber, hubNumber, pipeNumber, magistral}
  } = useSelector((state) => state.deviceReducer);
  const dispatch = useDispatch();

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Form.Item
        label="Выберите вычислитель, к которому подключен прибор"
      >
        <InputTT
          name="calculatorId"
          type="number"
          placeholder="Начните вводить ID прибора"
          onChange={(event) => {
            const { value } = event.target;
            const path = ['calculatorId'];
            dispatch(onChangeDeviceFormValueByPath(path, Number(value)));
          }}
        />
      </Form.Item>

      <Form.Item label="Номер ввода">
        <InputTT
          name="entryNumber"
          type="number"
          placeholder="1"
          value={entryNumber}
          onChange={(event) => {
            const { value } = event.target;
            const path = ['pipe', 'entryNumber'];
            dispatch(onChangeDeviceFormValueByPath(path, Number(value)));
          }}
        />
      </Form.Item>

      <Form.Item label="Номер узла">
        <InputTT
          name="hubNumber"
          type="number"
          placeholder="1"
          value={hubNumber}
          onChange={(event) => {
            const { value } = event.target;
            const path = ['pipe', 'hubNumber'];
            dispatch(onChangeDeviceFormValueByPath(path, Number(value)));
          }}
        />
      </Form.Item>

      <Form.Item label="Номер трубы">
        <InputTT
          name="pipeNumber"
          type="number"
          placeholder="1"
          value={pipeNumber}
          onChange={(event) => {
            const { value } = event.target;
            const path = ['pipe', 'pipeNumber'];
            dispatch(onChangeDeviceFormValueByPath(path, Number(value)));
          }}
        />
      </Form.Item>

      <Form.Item name="text" label="Номер трубы">

        <SelectTT
          placeholder="Выберите тип устройства"
          name="magistral"
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

export default SettingConnectionTab;

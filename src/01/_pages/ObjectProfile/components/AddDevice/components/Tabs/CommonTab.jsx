import React from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import {
   DatePicker, Select, Input, Form,
} from 'antd';
import moment from 'moment';
import { serviceLife, resources, types } from '../DeviceJSON';
import { onChangeDeviceFormValueByPath } from '../../../../../../Redux/actions/actions';
import { Header, SelectTT, InputTT, ButtonTT, DatePickerTT } from '../../../../../../tt-components'

const CommonTab = () => {
  const {
    serialNumber,
    checkingDate,
    lastCommercialAccountingDate,
    futureCommercialAccountingDate,
    infoId,
    futureCheckingDate,
  } = useSelector((state) => state.deviceReducer);
  const dispatch = useDispatch();

  return (

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Form.Item name="select" label="Выберите тип прибора">
          <SelectTT
            id="housingMeteringDeviceType"
            onChange={(event) => {
              const value = event;
              const path = ['housingMeteringDeviceType'];
              dispatch(onChangeDeviceFormValueByPath(path, value));
            }}
            options={types}
            defaultValue={types[0].value}
          />
        </Form.Item>

        <Form.Item name="select" label="Выберите тип ресурса">
          <SelectTT
            id="housingMeteringDeviceType"
            id="resource"
            onChange={(event) => {
              const value = event;
              const path = ['resource'];
              dispatch(onChangeDeviceFormValueByPath(path, value));
            }}
            options={resources}
            defaultValue={resources[0].value}
          />
        </Form.Item>

        <Form.Item name="text" label="Выберите модель прибора">
          <InputTT
            id="model"
            type="text"
            onChange={(event) => {
              const { value } = event.target;
              const path = ['model'];
              dispatch(onChangeDeviceFormValueByPath(path, value));
            }}
          />
        </Form.Item>

        <Form.Item name="text" label="Серийный номер">
          <InputTT
            id="serialNumber"
            type="text"
            onChange={(event) => {
              const { value } = event.target;
              const path = ['serialNumber'];
              dispatch(onChangeDeviceFormValueByPath(path, value));
            }}
          />
        </Form.Item>

        <Form.Item label="Дата выпуска прибора">
          <DatePickerTT
            name="lastCommercialAccountingDate"
            placeholder="Укажите дату..."
            onChange={(date) => {
              const path = ['checkingDate'];
              const value = date.toISOString();
              dispatch(onChangeDeviceFormValueByPath(path, value));
            }}
            value={moment(checkingDate)}
          />
        </Form.Item>

        <Form.Item label="Дата ввода в эксплуатацию">
          <DatePickerTT
            value={moment(futureCheckingDate)}
            placeholder="Укажите дату..."
            onChange={(date) => {
              const path = ['lastCommercialAccountingDate'];
              const value = date.toISOString();
              dispatch(onChangeDeviceFormValueByPath(path, value));
            }}
            name="futureCheckingDate"
          />
        </Form.Item>

        <Form.Item label="Срок эксплуатации по нормативу">
          <SelectTT
            id="futureCommercialAccountingDate"
            onChange={(event) => {
              const value = moment()
                .add(event, 'year')
                .toISOString();
              const path = ['futureCommercialAccountingDate'];
              dispatch(onChangeDeviceFormValueByPath(path, value));
            }}
            name="futureCommercialAccountingDate"
            placeholder="Укажите оперид эксплуатации"
            options={serviceLife}
            defaultValue={serviceLife[0].value}
          />
        </Form.Item>
      </div>
  );
};

export default connect()(CommonTab);

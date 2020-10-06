import React from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import {
  ConfigProvider, DatePicker, Select, Input, Form,
} from 'antd';
import ruRu from 'antd/es/locale/ru_RU';
import moment from 'moment';
import { serviceLife } from '../CalculatorJSON';
import { onChangeFormValueByPath } from '../../../store/actions';
import { resources, types } from "../../../AddDevice/components/CalculatorJSON";


const CommonTab = () => {
  const {
    serialNumber,
    checkingDate,
    lastCommercialAccountingDate,
    futureCommercialAccountingDate,
    infoId,
    futureCheckingDate,
  } = useSelector((state) => state.calculatorPage);
  const dispatch = useDispatch();

  return (
    <ConfigProvider locale={ruRu}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Form.Item name="select" label="Выберите тип прибора">
          <Select
            id="housingMeteringDeviceType"
            onChange={(event) => {
              const value = event;
              const path = ['housingMeteringDeviceType'];
              dispatch(onChangeFormValueByPath(path, value));

              // onChangeFormValueByPath(path, value);
            }}
            options={types}
            defaultValue={types[0].value}
          />
        </Form.Item>

        <Form.Item name="select" label="Выберите тип ресурса">
          <Select
            id="housingMeteringDeviceType"
            id="resource"
            onChange={(event) => {
              const value = event;
              const path = ['resource'];
              dispatch(onChangeFormValueByPath(path, value));
            }}
            options={resources}
            defaultValue={resources[0].value}
          />
        </Form.Item>


        <Form.Item name="text" label="Выберите модель прибора">
          <Input
            id="model"
            type="text"
            onChange={(event) => {
              const { value } = event.target;
              const path = ['model'];
              dispatch(onChangeFormValueByPath(path, value));
            }}
          />
        </Form.Item>

        <Form.Item name="text" label="Серийный номер">
          <Input
            id="serialNumber"
            type="text"
            onChange={(event) => {
              const { value } = event.target;
              const path = ['serialNumber'];
              dispatch(onChangeFormValueByPath(path, value));
            }}
          />
        </Form.Item>


        <Form.Item label="Дата выпуска прибора">
          <DatePicker
            name="lastCommercialAccountingDate"
            placeholder="Укажите дату..."
            onChange={(date) => {
              const path = ['checkingDate'];
              const value = date.toISOString();
              dispatch(onChangeFormValueByPath(path, value));
            }}
            value={moment(checkingDate)}
          />
        </Form.Item>

        <Form.Item label="Дата ввода в эксплуатацию">
          <DatePicker
            value={moment(futureCheckingDate)}
            placeholder="Укажите дату..."
            onChange={(date) => {
              const path = ['lastCommercialAccountingDate'];
              const value = date.toISOString();
              dispatch(onChangeFormValueByPath(path, value));
            }}
            name="futureCheckingDate"
          />
        </Form.Item>

        <Form.Item label="Срок эксплуатации по нормативу">
          <Select
            id="futureCommercialAccountingDate"
            onChange={(event) => {
              const value = moment()
                .add(event, 'year')
                .toISOString();
              const path = ['futureCommercialAccountingDate'];
              dispatch(onChangeFormValueByPath(path, value));
            }}
            name="futureCommercialAccountingDate"
            placeholder="Укажите оперид эксплуатации"
            options={serviceLife}
            defaultValue={serviceLife[0].value}
          />
        </Form.Item>
      </div>
    </ConfigProvider>
  );
};

export default connect()(CommonTab);

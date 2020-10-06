import React from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import {
  ConfigProvider, DatePicker, Select, Input, Form,
} from 'antd';
import ruRu from 'antd/es/locale/ru_RU';
import moment from 'moment';
import { items, serviceLife } from '../CalculatorJSON';
import { onChangeFormValueByPath } from '../../../store/actions';

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
        <Form.Item name="text" label="Серийный номер устройства">
          <Input
            value={serialNumber}
            placeholder="Серийный номер..."
            onChange={(event) => {
              const path = ['serialNumber'];
              dispatch(onChangeFormValueByPath(path, event.target.value));
            }}
          />
        </Form.Item>

        <Form.Item name="select" label="Тип вычислителя">
          <Select
            placeholder="Выберите тип устройства"
            id="infoId"
            options={items}
            defaultValue={items[0].value}
            onChange={(event) => {
              const value = event;
              const path = 'infoId';
              dispatch(onChangeFormValueByPath(path, Number(value)));
            }}
          />
        </Form.Item>

        <Form.Item label="Дата ввода в эксплуатацию">
          <DatePicker
            id="lastCommercialAccountingDate"
            value={moment(lastCommercialAccountingDate)}
            placeholder="Укажите дату..."
            name="lastCommercialAccountingDate"
            onChange={(date) => {
              const path = ['lastCommercialAccountingDate'];
              const value = date.toISOString();
              dispatch(onChangeFormValueByPath(path, value));
            }}
          />
        </Form.Item>

        <Form.Item label="Дата Поверки">
          <DatePicker
            name="checkingDate"
            placeholder="Укажите дату..."
            onChange={(date) => {
              const path = ['checkingDate'];
              const value = date.toISOString();
              dispatch(onChangeFormValueByPath(path, value));
            }}
            value={moment(checkingDate)}
          />
        </Form.Item>

        <Form.Item label="Дата Следующей поверки">
          <DatePicker
            value={moment(futureCheckingDate)}
            placeholder="Укажите дату..."
            onChange={(date) => {
              const path = ['futureCheckingDate'];
              const value = date.toISOString();
              dispatch(onChangeFormValueByPath(path, value));
            }}
            name="futureCheckingDate"
          />
        </Form.Item>

        <Form.Item label="Дата Следующей поверки">
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

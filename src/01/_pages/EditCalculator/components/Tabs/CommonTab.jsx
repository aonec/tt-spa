import React from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import {
  DatePicker, Select, Input, Form,
} from 'antd';
import moment from 'moment';
import { items, serviceLife } from '../CalculatorJSON';
import { onChangeFormValueByPath } from '../../../../Redux/actions/actions';

const CommonTab = () => {
  const {
    serialNumber,
    checkingDate,
    lastCommercialAccountingDate,
    infoId,
    futureCheckingDate,
  } = useSelector((state) => state.calculatorPage);
  const dispatch = useDispatch();

  return (

    <div style={{ display: 'flex', flexDirection: 'column' }}>

      <Form.Item label="Серийный номер устройства">
        <Input
          value={serialNumber}
          placeholder="Серийный номер..."
          onChange={(event) => {
            const path = ['serialNumber'];
            dispatch(onChangeFormValueByPath(path, event.target.value));
          }}
        />
      </Form.Item>

      <Form.Item label="Тип вычислителя">
        <Select
          placeholder="Выберите тип устройства"
          options={items}
          value={infoId.toString()}
          onChange={(event, target) => {
            const path = ['infoId'];
            dispatch(onChangeFormValueByPath(path, Number(target.value)));
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
          onChange={(event) => {
            const value = moment().add(event, 'year').toISOString();
            const path = ['futureCommercialAccountingDate'];
            dispatch(onChangeFormValueByPath(path, value));
          }}
          placeholder="Укажите период эксплуатации"
          options={serviceLife}
          defaultValue={serviceLife[0].value}
        />
      </Form.Item>
    </div>
  );
};

export default connect()(CommonTab);

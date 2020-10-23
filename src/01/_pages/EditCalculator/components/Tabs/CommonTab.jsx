import React from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import {
  DatePicker, Select, Input, Form,
} from 'antd';
import moment from 'moment';
import { items, serviceLife } from '../CalculatorJSON';
import { onChangeFormValueByPath } from '../../../../Redux/actions/actions';
import { Header, SelectTT, InputTT, ButtonTT, DatePickerTT } from '../../../../tt-components'

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
        <InputTT
          value={serialNumber}
          placeholder="Серийный номер..."
          onChange={(event) => {
            const path = ['serialNumber'];
            dispatch(onChangeFormValueByPath(path, event.target.value));
          }}
        />
      </Form.Item>

      <Form.Item label="Тип вычислителя">
        <SelectTT
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
        <DatePickerTT
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
        <DatePickerTT
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
        <DatePickerTT
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
        <SelectTT
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

export default CommonTab;

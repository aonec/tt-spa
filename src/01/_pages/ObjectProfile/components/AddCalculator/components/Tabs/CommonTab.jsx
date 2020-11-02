import React from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Form } from 'antd';
import moment from 'moment';
import { SelectTT, InputTT, DatePickerTT } from '../../../../../../tt-components';
import { items, serviceLife } from '../CalculatorJSON';
import { onChangeFormValueByPath } from '../../../../../../Redux/actions/actions';

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

  const buttonHandler = () => {
    console.log('buttonHandler');
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/* <button onClick={buttonHandler}>test</button> */}
        <Form.Item label="Серийный номер устройства">
          <InputTT
            name="serialNumber"
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
            name="infoId"
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
            format="DD.MM.YYYY"
            name="lastCommercialAccountingDate"
            value={moment(lastCommercialAccountingDate)}
            placeholder="Укажите дату..."
            onChange={(date) => {
              const path = ['lastCommercialAccountingDate'];
              const value = date.toISOString();
              dispatch(onChangeFormValueByPath(path, value));
            }}
          />
        </Form.Item>

        <Form.Item label="Дата Поверки">
          <DatePickerTT
            format="DD.MM.YYYY"
            name="checkingDate"
            placeholder="Укажите дату..."
            value={moment(checkingDate)}
            onChange={(date) => {
              const path = ['checkingDate'];
              const value = date.toISOString();
              dispatch(onChangeFormValueByPath(path, value));
            }}
          />
        </Form.Item>

        <Form.Item label="Дата Следующей поверки">
          <DatePickerTT
            format="DD.MM.YYYY"
            name="futureCheckingDate"
            value={moment(futureCheckingDate)}
            placeholder="Укажите дату..."
            onChange={(date) => {
              const path = ['futureCheckingDate'];
              const value = date.toISOString();
              dispatch(onChangeFormValueByPath(path, value));
            }}
          />
        </Form.Item>

        <Form.Item label="Дата Следующей поверки">
          <SelectTT
            name="futureCommercialAccountingDate"
            placeholder="Укажите оперид эксплуатации"
            options={serviceLife}
            value={serviceLife[0].value}
            onChange={(event) => {
              const value = moment().add(event, 'year').toISOString();
              const path = ['futureCommercialAccountingDate'];
              dispatch(onChangeFormValueByPath(path, value));
            }}
          />
        </Form.Item>
      </div>
    </>
  );
};

export default CommonTab;

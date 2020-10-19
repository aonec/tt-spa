import React from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { DatePicker, Select, Input, Form} from 'antd';
import { Header, SelectTT, InputTT, ButtonTT, DatePickerTT } from '../../../../../../tt-components'
import moment from 'moment';
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
        {/*<button onClick={buttonHandler}>test</button>*/}
        <Form.Item name="text" label="Серийный номер устройства">
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
            onChange={(date) => {
              const path = ['lastCommercialAccountingDate'];
              const value = date.toISOString();
              dispatch(onChangeFormValueByPath(path, value));
            }}
          />
        </Form.Item>

        <Form.Item label="Дата Поверки">
          <DatePickerTT
            id="checkingDate"
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
            id="futureCheckingDate"
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

export default connect()(CommonTab);

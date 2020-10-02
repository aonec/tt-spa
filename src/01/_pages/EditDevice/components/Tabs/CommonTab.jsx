import React, { useContext } from 'react';
import { connect, useSelector } from 'react-redux';
import _ from 'lodash';
import { ConfigProvider, DatePicker, Select } from 'antd';
import ruRu from 'antd/es/locale/ru_RU';
import moment from 'moment';
import {
  Label, InputTT, Wrap, InputWrap,
} from '01/tt-components';

import { items, serviceLife } from '../CalculatorJSON';

const CommonTab = (props) => {
  const { onChangeFormValueByPath3, calculator } = props;

  const TEMPLATE = {
    address: {
      city: 'Нижнекамск',
      street: '50 лет Октября',
      housingStockNumber: '19',
      corpus: null,
    },
    closingDate: null,
    deviceAddress: 190,
    futureCheckingDate: '2020-09-29T17:07:14.469',
    futureCommercialAccountingDate: '2020-09-29T17:07:14.469',
    hubs: null,
    id: 1554454,
    ipV4: '192.168.0.1',
    isConnected: true,
    lastCheckingDate: '2020-09-29T17:07:14.469',
    lastCommercialAccountingDate: '2020-09-29T17:07:14.469',
    model: 'ТЭМ-106',
    port: 1234,
    serialNumber: '12345678qwerty7',
    underTransaction: false,
  };

  const serialNumber = useSelector(
    (state) => _.get(state, ['reducerEditDevice', 'serialNumber']),
    '',
  );

  const lastCommercialAccountingDate = useSelector(
    (state) => _.get(state, ['reducerEditDevice', 'lastCommercialAccountingDate']),
    '',
  );

  console.log('CommonTab', props);

  const someFunc = () => {
    console.log(serialNumber, lastCommercialAccountingDate);

    console.log(lastCommercialAccountingDate);

    const date1 = new Date(lastCommercialAccountingDate);

    alert(lastCommercialAccountingDate.split('T')[0]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <button onClick={someFunc}>vvv</button>
      <InputWrap>
        <Label color="grey" htmlFor="#resource">
          Серийный номер
        </Label>
        <InputTT
          id="serialNumber"
          required
          placeholder="Serial number..."
          defaultValue={serialNumber}
          // value={serialNumber}
          onChange={(event) => {
            const { value } = event.target;
            const path = ['serialNumber'];
            onChangeFormValueByPath3(path, value);
          }}
        />
      </InputWrap>

      <InputWrap>
        <Label color="grey" htmlFor="#type">
          Тип вычислителя
        </Label>

        <Select
          placeholder="Выберите тип устройства"
          id="infoId"
          onChange={(event) => {
            const value = event;
            const path = ['infoId'];
            onChangeFormValueByPath3(path, Number(value));
          }}
          options={items}
          defaultValue={items[0].value}
        />
      </InputWrap>

      <InputWrap>
        <Label color="grey" htmlFor="#resource">
          Дата ввода в эксплуатацию
        </Label>
        <ConfigProvider locale={ruRu}>
          <DatePicker
            id="lastCommercialAccountingDate"
            onChange={(date) => {
              const path = ['lastCommercialAccountingDate'];
              const value = date.toISOString();
              onChangeFormValueByPath3(path, value);
            }}
            value={moment(lastCommercialAccountingDate.split('T')[0])}
          />
        </ConfigProvider>
      </InputWrap>

      <InputWrap>
        <Label color="grey" htmlFor="#resource">
          Дата Поверки
        </Label>
        <ConfigProvider locale={ruRu}>
          <DatePicker
            defaultValue={moment()}
            onChange={(date) => {
              const path = ['checkingDate'];
              const value = date.toISOString();
              onChangeFormValueByPath3(path, value);
            }}
          />
        </ConfigProvider>
      </InputWrap>

      <InputWrap>
        <Label color="grey" htmlFor="#resource">
          Дата Следующей поверки
        </Label>
        <ConfigProvider locale={ruRu}>
          <DatePicker
            defaultValue={moment()}
            onChange={(date) => {
              const path = ['futureCheckingDate'];
              const value = date.toISOString();
              onChangeFormValueByPath3(path, value);
            }}
          />
        </ConfigProvider>
      </InputWrap>

      <InputWrap>
        <Label color="grey" htmlFor="#resource" className="tt-label">
          Срок эксплуатации по нормативу
        </Label>
        <Select
          id="futureCommercialAccountingDate"
          onChange={(value, target) => {
            // addPeriod(value, 'futureCommercialAccountingDate');
          }}
          onChange={(event) => {
            const value = moment()
              .add(event, 'year')
              .toISOString();
            const path = ['futureCommercialAccountingDate'];
            onChangeFormValueByPath3(path, value);
          }}
          placeholder="Укажите период"
          options={serviceLife}
          defaultValue={serviceLife[0].value}
        />
      </InputWrap>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onChangeFormValueByPath3: (path, value) => {
    dispatch({
      type: 'CALC_UPDATE_FORM_VALUE_BY_PATH3',
      payload: { path, value },
    });
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(CommonTab);

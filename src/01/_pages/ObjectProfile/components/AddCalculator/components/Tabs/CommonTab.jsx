import React, { useContext } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { ConfigProvider, DatePicker, Select } from 'antd';
import ruRu from 'antd/es/locale/ru_RU';
import moment from 'moment';
import {
  Label, InputTT, Wrap, InputWrap,
} from '01/tt-components';
import { AddDeviceContext } from '../../index';
import { items, serviceLife } from '../CalculatorJSON';
import { onChangeFormValueByPath } from '../../store/actions';

const CommonTab = () => {
  const {
    serialNumber,
    checkingDate,
    lastCommercialAccountingDate,
    futureCommercialAccountingDate,
    infoId,
    futureCheckingDate,
  } = useSelector((state) => state.calc);

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    dispatch(onChangeFormValueByPath(e.target.name, e.target.value));
  };

  const handleSelectChange = (value, option, name) => {
    dispatch(onChangeFormValueByPath(name, option));
  };

  const handleDateChange = (date, dateString, name) => {
    dispatch(onChangeFormValueByPath(name, dateString));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <InputWrap>
        <Label color="grey" htmlFor="#resource">
          Серийный номер
        </Label>
        <InputTT
          id="serialNumber"
          required
          placeholder="Serial number..."
          value={serialNumber}
          name="serialNumber"
          onChange={(event) => {
            const path = 'serialNumber';
            dispatch(onChangeFormValueByPath(path, event.target.value));
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
          options={items}
          defaultValue={items[0].value}
          onChange={(event) => {
            const value = event;
            const path = ['infoId'];
            dispatch(onChangeFormValueByPath(path, Number(value)));
          }}
        />
      </InputWrap>

      <InputWrap>
        <Label color="grey" htmlFor="#resource">
          Дата ввода в эксплуатацию
        </Label>
        <ConfigProvider locale={ruRu}>
          <DatePicker
            id="lastCommercialAccountingDate"
            defaultValue={moment(lastCommercialAccountingDate)}
            name="lastCommercialAccountingDate"
            onChange={(date) => {
              const path = 'lastCommercialAccountingDate';
              const value = date.toISOString();
              dispatch(onChangeFormValueByPath(path, value));
            }}
          />
        </ConfigProvider>
      </InputWrap>

      <InputWrap>
        <Label color="grey" htmlFor="#resource">
          Дата Поверки
        </Label>
        <ConfigProvider locale={ruRu}>
          <DatePicker
            defaultValue={moment(checkingDate)}
            name="checkingDate"
            onChange={(date) => {
              const path = 'checkingDate';
              const value = date.toISOString();
              dispatch(onChangeFormValueByPath(path, value));
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
            defaultValue={moment(futureCheckingDate)}
            onChange={(date) => {
              const path = 'futureCheckingDate';
              const value = date.toISOString();
              dispatch(onChangeFormValueByPath(path, value));
            }}
            name="futureCheckingDate"
          />
        </ConfigProvider>
      </InputWrap>

      <InputWrap>
        <Label color="grey" htmlFor="#resource" className="tt-label">
          Срок эксплуатации по нормативу
        </Label>
        <Select
          id="futureCommercialAccountingDate"
          onChange={(event) => {
            const value = moment()
              .add(lastCommercialAccountingDate, 'year')
              .toISOString();
            const path = ['futureCommercialAccountingDate'];
            dispatch(onChangeFormValueByPath(path, value));
          }}
          name="futureCommercialAccountingDate"
          placeholder="Укажите период"
          options={serviceLife}
          defaultValue={futureCommercialAccountingDate.value}
        />
      </InputWrap>
    </div>
  );
};

export default CommonTab;

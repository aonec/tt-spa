import React, { useContext } from 'react';
import { connect, useSelector } from 'react-redux';
import _ from 'lodash';
import { ConfigProvider, DatePicker, Select } from 'antd';
import ruRu from 'antd/es/locale/ru_RU';
import moment from 'moment';
import {
  Label, InputTT, Wrap, InputWrap,
} from '01/tt-components';
import { AddDeviceContext } from '../../index';
import { items, serviceLife } from '../CalculatorJSON';

const CommonTab = ({ onChangeFormValueByPath }) => {
  const {
    form,
    onInputChange,
    datetoISOString,
    addPeriod,
    onSelectChange,
  } = useContext(AddDeviceContext);
  const serialNumber = useSelector((state) => _.get(state, ['reducerCalc', 'serialNumber']), '');
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
          onChange={(event) => {
            const { value } = event.target;
            const path = ['serialNumber'];
            onChangeFormValueByPath(path, value);
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
          onChange={onSelectChange}
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
            defaultValue={moment()}
            onChange={(date, dateString) => {
              datetoISOString(date, dateString, 'lastCommercialAccountingDate');
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
            defaultValue={moment()}
            onChange={(date, dateString) => {
              datetoISOString(date, dateString, 'checkingDate');
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
            onChange={(date, dateString) => {
              datetoISOString(date, dateString, 'futureCheckingDate');
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
            addPeriod(value, 'futureCommercialAccountingDate');
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
  onChangeFormValueByPath: (path, value) => {
    dispatch({
      type: 'CALC_UPDATE_FORM_VALUE_BY_PATH',
      payload: { path, value },
    });
  },
});

export default connect(null, mapDispatchToProps)(CommonTab);

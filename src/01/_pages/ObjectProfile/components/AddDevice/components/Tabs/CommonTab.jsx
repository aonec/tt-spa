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
import { items, serviceLife, types, resources } from '../CalculatorJSON';

const CommonTab = ({ onChangeFormValueByPath2 }) => {
  const { addPeriod } = useContext(AddDeviceContext);
  const serialNumber = useSelector(
    (state) => _.get(state, ['reducerDev', 'serialNumber']),
    '',
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>

      <InputWrap>
        <Label color="grey" htmlFor="#type">
          Выберите тип прибора
        </Label>
        <Select
          id="housingMeteringDeviceType"
          onChange={(event) => {
            const value = event;
            console.log(event)
            const path = ['housingMeteringDeviceType'];
            onChangeFormValueByPath2(path, value);
          }}
          options={types}
          defaultValue={types[0].value}
        />
      </InputWrap>


      <InputWrap>
        <Label color="grey" htmlFor="#resource">
          Выберите тип ресурса
        </Label>

        <Select
          id="resource"
          onChange={(event) => {
            const value = event;
            const path = ['resource'];
            onChangeFormValueByPath2(path, value);
          }}
          options={resources}
          defaultValue={resources[0].value}
        />
      </InputWrap>


      <InputWrap>
        <Label color="grey" htmlFor="#model">
          Выберите модель прибора
        </Label>
        <InputTT
          id="model"
          type="text"
          onChange={(event) => {
            const { value } = event.target;
            const path = ['model'];
            onChangeFormValueByPath2(path, value);
          }}
        />
      </InputWrap>


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
            onChangeFormValueByPath2(path, value);
          }}
        />
      </InputWrap>


      <InputWrap>
        <Label color="grey" htmlFor="#lastCommercialAccountingDate">
          Дата выпуска прибора
        </Label>
        <ConfigProvider locale={ruRu}>
          <DatePicker
            id="lastCommercialAccountingDate"
            defaultValue={moment()}
            onChange={(date) => {
              const path = ['lastCommercialAccountingDate'];
              const value = date.toISOString();
              onChangeFormValueByPath2(path, value);
            }}
          />
        </ConfigProvider>
      </InputWrap>


      <InputWrap>
        <Label color="grey" htmlFor="#resource">
          Дата ввода в эксплуатацию
        </Label>
        <ConfigProvider locale={ruRu}>
          <DatePicker
            id="lastCommercialAccountingDate"
            defaultValue={moment()}
            onChange={(date) => {
              const path = ['lastCommercialAccountingDate'];
              const value = date.toISOString();
              onChangeFormValueByPath2(path, value);
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
            onChange={(date) => {
              const path = ['checkingDate'];
              const value = date.toISOString();
              onChangeFormValueByPath2(path, value);
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
          onChange={(event) => {
            const value = moment()
              .add(event, 'year')
              .toISOString();
            const path = ['futureCommercialAccountingDate'];
            onChangeFormValueByPath2(path, value);
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
  onChangeFormValueByPath2: (path, value) => {
    dispatch({
      type: 'CALC_UPDATE_FORM_VALUE_BY_PATH2',
      payload: { path, value },
    });
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(CommonTab);

import { InputTT, InputWrap, Label } from '01/tt-components';
import { ConfigProvider, DatePicker, Select } from 'antd';
import ruRu from 'antd/es/locale/ru_RU';
import _ from 'lodash';
import moment from 'moment';
import React, { useContext } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { AddDeviceContext } from '../../index';
import { resources, serviceLife, types } from '../CalculatorJSON';

import { housingMeteringDeviceTypeAC } from '../../store/reducerCalc';

const CommonTab = () => {
  const { addPeriod } = useContext(AddDeviceContext);

  const dispatch = useDispatch();
  const calc = useSelector((state) => state.calc);
  const { serialNumber, infoId, housingStockId } = calc;

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
            const path = ['housingMeteringDeviceType'];
            dispatch(housingMeteringDeviceTypeAC());

            // onChangeFormValueByPath(path, value);
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
            // onChangeFormValueByPath(path, value);
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
            // onChangeFormValueByPath(path, value);
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
            const path = 'serialNumber';
            // onChangeFormValueByPath(path, value);
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
              // onChangeFormValueByPath(path, value);
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
              // onChangeFormValueByPath(path, value);
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
              // onChangeFormValueByPath(path, value);
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
            // onChangeFormValueByPath(path, value);
          }}
          placeholder="Укажите период"
          options={serviceLife}
          defaultValue={serviceLife[0].value}
        />
      </InputWrap>
    </div>
  );
};

// const mapDispatchToProps = (dispatch) => ({
//   onChangeFormValueByPath: (path, value) => {
//     dispatch({
//       type: 'CALC_UPDATE_FORM_VALUE_BY_PATH',
//       payload: { path, value },
//     });
//   },
// });

// export default connect(
//   null,
//   mapDispatchToProps,
// )(CommonTab);

export default connect()(CommonTab);

import React, { useContext } from 'react';
import { ConfigProvider, DatePicker, Select } from 'antd';
import ruRu from 'antd/es/locale/ru_RU';
import moment from 'moment';
import {
  Label, InputTT, Wrap, InputWrap,
} from '01/tt-components';
import { AddDeviceContext } from '../../index';

export const Page1 = () => {
  console.log('Page1');

  const {
    serialNumberRandom,
    onInputChange,
    lastCommercialAccountingDate,
    datetoISOString,
    lastCheckingDate,
    futureCheckingDate,
    futureCommercialAccountingDate,
    addPeriod,
    onSelectChange,
  } = useContext(AddDeviceContext);

  const items = [
    { value: '1', label: 'ТЭМ-106', id: 1 },
    { value: '2', label: 'ТЭМ-104', id: 2 },
    { value: '3', label: 'ТЭМ-104', id: 3 },
    { value: '4', label: 'ВКТ-7', id: 4 },
    { value: '5', label: 'ВИСТ', id: 5 },
  ];

  const serviceLife = [
    { value: '4', label: '4 года', id: 1 },
    { value: '6', label: '6 лет', id: 2 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <InputWrap>
        <Label color="grey" htmlFor="#resource">
          Серийный номер
        </Label>
        <InputTT
          id="serialNumber"
          type="number"
          required
          defaultValue={serialNumberRandom}
          onChange={(event) => onInputChange(event)}
        />
      </InputWrap>

      <InputWrap>
        <Label color="grey" htmlFor="#type">
          Тип вычислителя
        </Label>

        <Select
          placeholder="Выберите тип устройства"
          id="infoId"
          onChange={(value, target) => {
            onSelectChange(value, target);
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
            defaultValue={moment()}
            onChange={(date, dateString) => {
              datetoISOString(date, dateString, lastCommercialAccountingDate);
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
              datetoISOString(date, dateString, lastCheckingDate);
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
              datetoISOString(date, dateString, futureCheckingDate);
            }}
          />
        </ConfigProvider>
      </InputWrap>

      <div className="tt-labelandinput">
        <Label color="grey" htmlFor="#resource" className="tt-label">
          Срок эксплуатации по нормативу
        </Label>
        <Select
          id="resource"
          onChange={(value, target) => {
            addPeriod(value, futureCommercialAccountingDate);
          }}
          placeholder="Укажите период"
          options={serviceLife}
          defaultValue={serviceLife[0].value}
        />
      </div>
    </div>
  );
};
export default Page1;

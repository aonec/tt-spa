import React, { useContext } from 'react';
import { ConfigProvider, DatePicker, Select } from 'antd';
import ruRu from 'antd/es/locale/ru_RU';
import moment from 'moment';
import {
  Label, InputTT, Wrap, InputWrap,
} from '01/tt-components';
import { AddODPUDeviceContext } from '../../index';

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
  } = useContext(AddODPUDeviceContext);

  const items = [
    {
      value: '1',
      label: 'ТЭМ-106',
      id: 1,
      parent: 'infoId',
    },
    {
      value: '2',
      label: 'ТЭМ-104',
      id: 2,
      parent: 'infoId',
    },
    {
      value: '3',
      label: 'ТЭМ-104',
      id: 3,
      parent: 'infoId',
    },
    {
      value: '4',
      label: 'ВКТ-7',
      id: 4,
      parent: 'infoId',
    },
    {
      value: '5',
      label: 'ВИСТ',
      id: 5,
      parent: 'infoId',
    },
  ];

  const serviceLife = [
    { value: '4', label: '4 года', id: 1 },
    { value: '6', label: '6 лет', id: 2 },
  ];

  const types = [
    {
      value: 'FlowMeter',
      label: 'Расходомер',
      id: 1,
      parent: 'type',
    },
    {
      value: 'TemperatureSensor',
      label: 'Термодатчик',
      id: 2,
      parent: 'type',
    },
  ];

  const resources = [
    {
      value: 'HotWaterSupply',
      label: 'Горячая вода',
      id: 1,
      parent: 'resource',
    },
    {
      value: 'ColdWaterSupply',
      label: 'Холодная вода',
      id: 2,
      parent: 'resource',
    },
    {
      value: 'Heat',
      label: 'Отопление',
      id: 3,
      parent: 'resource',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>

      <InputWrap>
        <Label color="grey" htmlFor="#type">
          Выберите тип прибора
        </Label>
        <Select
          id="type"
          onChange={onSelectChange}
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
          onChange={onSelectChange}
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
          onChange={onInputChange}
        />
      </InputWrap>
      <InputWrap>
        <Label color="grey" htmlFor="#serialNumber">
          Серийный номер
        </Label>
        <InputTT
          id="serialNumber"
          type="text"
          required
          defaultValue={serialNumberRandom}
          onChange={onInputChange}
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
            onChange={(date, dateString) => {
              datetoISOString(date, dateString, lastCommercialAccountingDate);
            }}
          />
        </ConfigProvider>
      </InputWrap>
      <InputWrap>
        <Label color="grey" htmlFor="#lastCommercialAccountingDate">
          Дата ввода в эксплуатацию
        </Label>
        <ConfigProvider locale={ruRu}>
          <DatePicker
            id="lastCommercialAccountingDate"
            defaultValue={moment()}
            onChange={(date, dateString) => {
              datetoISOString(date, dateString, lastCommercialAccountingDate);
            }}
          />
        </ConfigProvider>
      </InputWrap>
      <InputWrap>
        <Label color="grey" htmlFor="#futureCommercialAccountingDate">
          Срок эксплуатации по нормативу
        </Label>
        <Select
          id="futureCommercialAccountingDate"
          onChange={(value, target) => {
            addPeriod(value, futureCommercialAccountingDate);
          }}
          placeholder="Укажите период"
          options={serviceLife}
          defaultValue={serviceLife[0].value}
        />
      </InputWrap>
    </div>
  );
};
export default Page1;

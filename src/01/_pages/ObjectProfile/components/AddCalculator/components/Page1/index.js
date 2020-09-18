import React, { useContext } from 'react';
import styled from 'styled-components';
import './page1.scss';
import { ConfigProvider, DatePicker, Space } from 'antd';
import ruRu from 'antd/es/locale/ru_RU';
import moment from "moment";
import { AddDeviceContext } from '../../index'

export const Page1 = () => {
  console.log('Page1');

  const { serialNumberRandom, deviceAddressRandom, onInputChange } = useContext(AddDeviceContext)

  const items = [
    {
      "id": 1,
      "model": "ТЭМ-106"
    },
    {
      "id": 2,
      "model": "ТЭМ-104"
    },
    {
      "id": 3,
      "model": "ВКТ-7"
    },
    {
      "id": 4,
      "model": "ТВ-7"
    },
    {
      "id": 5,
      "model": "ВИСТ"
    }
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>

      <div className="tt-labelandinput">
        <label htmlFor="#resource" className="tt-label">Серийный номер</label>
        <input id="serialNumber" className="tt-input" type="number" required defaultValue={serialNumberRandom}
               onChange={(event) => onInputChange(event)}/>
      </div>

      <div className="tt-labelandinput">
        <label htmlFor="#type" className="tt-label">Тип вычислителя</label>
        <select id="infoId" className="tt-select" onChange={(event) => onInputChange(event)}>
          <option className="tt-option" id="1">ТЭМ-106</option>
          <option className="tt-option" id="2">ТЭМ-104</option>
          <option className="tt-option" id="3">ВКТ-7</option>
          <option className="tt-option" id="4">ТВ-7</option>
          <option className="tt-option" id="5">ВИСТ</option>

        </select>
      </div>

      <div className="tt-labelandinput">
        <label htmlFor="#resource" className="tt-label">Дата выпуска прибора</label>
        <ConfigProvider locale={ruRu}>
          <DatePicker defaultValue={moment()}/>
        </ConfigProvider>
      </div>

      <div className="tt-labelandinput">
        <label htmlFor="#resource" className="tt-label">Дата ввода в эксплуатацию</label>
        <ConfigProvider locale={ruRu}>
          <DatePicker defaultValue={moment()}/>
        </ConfigProvider>
      </div>

      <div className="tt-labelandinput">
        <label htmlFor="#resource" className="tt-label">Срок эксплуатации по нормативу</label>
        <select id="resource" className="tt-select">
          <option className="tt-option">3 года</option>
          <option className="tt-option">5 лет</option>
          <option className="tt-option">10 лет</option>
        </select>
      </div>

    </div>
  );
};
export default Page1;

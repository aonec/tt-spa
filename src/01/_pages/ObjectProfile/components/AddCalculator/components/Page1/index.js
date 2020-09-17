import React from 'react';
import styled from 'styled-components';
import './page1.scss';
import { ConfigProvider, DatePicker, Space } from 'antd';
import ruRu from 'antd/es/locale/ru_RU';

export const Page1 = () => {
  console.log('Page1');
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>

      <div className="tt-labelandinput">
        <label htmlFor="#resource" className="tt-label">Серийный номер</label>
        <input className="tt-input" type="number" required placeholder={1234567890} />
      </div>

      <div className="tt-labelandinput">
        <label htmlFor="#type" className="tt-label">Тип вычислителя</label>
        <select id="type" className="tt-select">
          <option className="tt-option">ВКТ-7</option>
          <option className="tt-option">ВКТ-8</option>
        </select>
      </div>

      <div className="tt-labelandinput">
        <label htmlFor="#resource" className="tt-label">Дата выпуска прибора</label>
        <ConfigProvider locale={ruRu}>
          <DatePicker required />
        </ConfigProvider>
      </div>

      <div className="tt-labelandinput">
        <label htmlFor="#resource" className="tt-label">Дата ввода в эксплуатацию</label>
        <ConfigProvider locale={ruRu}>
          <DatePicker />
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

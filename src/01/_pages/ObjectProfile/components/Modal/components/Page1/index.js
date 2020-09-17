import React from "react";
import styled from "styled-components";
import './page1.scss'
import { ConfigProvider, DatePicker, Space } from 'antd';
import ruRu from "antd/es/locale/ru_RU";

export const Page1 = () => {
  console.log('Page1')
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>

      <div className={"tt-labelandinput"}>
        <label htmlFor="#type" className={'tt-label'}>Выберите тип прибора</label>
        <select id="type" className={'tt-select'}>
          <option className={'tt-option'}>Расходомер</option>
          <option className={'tt-option'}>Lorem</option>
        </select>
      </div>

      <div className={'tt-labelandinput'}>
        <label htmlFor="#resource" className={'tt-label'}>Выберите тип ресурса</label>
        <select id="resource" className={'tt-select'}>
          <option className={'tt-option'}>Холодная вода</option>
          <option className={'tt-option'}>Горячая вода</option>
          <option className={'tt-option'}>Отопление</option>
        </select>
      </div>

      <div className={'tt-labelandinput'}>
        <label htmlFor="#resource" className={'tt-label'}>Выберите модель прибора</label>
        <select id="resource" className={'tt-select'}>
          <option className={'tt-option'}>МПР-380</option>
          <option className={'tt-option'}>МПР-381</option>
          <option className={'tt-option'}>МПР-382</option>
        </select>
      </div>

      <div className={'tt-labelandinput'}>
        <label htmlFor="#resource" className={'tt-label'}>Серийный номер</label>
        <input className={'tt-input'} type='number' required/>
      </div>

      <div className={'tt-labelandinput'}>
        <label htmlFor="#resource" className={'tt-label'}>Дата выпуска прибора</label>
        <ConfigProvider locale={ruRu}>
          <DatePicker required/>
        </ConfigProvider>
      </div>

      <div className={'tt-labelandinput'}>
        <label htmlFor="#resource" className={'tt-label'}>Дата ввода в эксплуатацию</label>
        <ConfigProvider locale={ruRu}>
          <DatePicker/>
        </ConfigProvider>
      </div>

      <div className={'tt-labelandinput'}>
        <label htmlFor="#resource" className={'tt-label'}>Срок эксплуатации по нормативу</label>
        <select id="resource" className={'tt-select'}>
          <option className={'tt-option'}>3 года</option>
          <option className={'tt-option'}>5 лет</option>
          <option className={'tt-option'}>10 лет</option>
        </select>
      </div>




    </div>
  )
}
export default Page1;
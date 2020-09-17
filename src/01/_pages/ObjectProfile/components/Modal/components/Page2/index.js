import React from "react";
import './page2.scss';
import { ConfigProvider, DatePicker } from "antd";
import ruRu from "antd/es/locale/ru_RU";

export const Page2 = () => {
  console.log("Page2")
  return (
    <div style={{ display: 'flex', flexDirection: 'column',  }}>

      <div className={"tt-labelandinput"}>
        <label htmlFor="#type" className={'tt-label'}>Подключение к вычислителю</label>
        <select id="type" className={'tt-select'}>
          <option className={'tt-option'}>Есть</option>
          <option className={'tt-option'}>Отсутствует</option>
        </select>
      </div>

      <div className={'tt-labelandinput'}>
        <label htmlFor="#resource" className={'tt-label'}>Выберите вычислитель, к которому подключен прибор</label>
        <input className={'tt-input'} type='text' placeholder={'Начните вводить серийный номер или IP адрес прибора'} required/>
      </div>

      <div className={'tt-labelandinput'}>
        <label htmlFor="#resource" className={'tt-label'}>Номер ввода</label>
        <input className={'tt-input'} type='number' required/>
      </div>

      <div className={'tt-labelandinput'}>
        <label htmlFor="#resource" className={'tt-label'}>Номер узла</label>
        <input className={'tt-input'} type='number' required/>
      </div>

      <div className={'tt-labelandinput'}>
        <label htmlFor="#resource" className={'tt-label'}>Номер трубы</label>
        <input className={'tt-input'} type='number' required/>
      </div>


    </div>
  )
}

export default Page2;
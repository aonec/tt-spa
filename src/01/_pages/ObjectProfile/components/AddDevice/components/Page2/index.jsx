import React, { useContext } from 'react';
import {
  Label, InputTT, Wrap, InputWrap,
} from '01/tt-components';
import { ConfigProvider, DatePicker, Select } from 'antd';
import { AddODPUDeviceContext } from '../../index';

export const Page2 = () => {
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

  const yesNo = [
    { value: '1', label: 'Есть', id: 1 },
    { value: '2', label: 'Отсутствует', id: 2 },
  ];

  const magistrals = [
    {
      value: 'FeedFlow',
      label: 'Прямая',
      id: 1,
      parent: 'magistral',
    },
    {
      value: 'FeedBackFlow',
      label: 'Обратная',
      id: 2,
      parent: 'magistral',
    },
  ];

  console.log('Page2');
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <InputWrap>
        <Label color="grey" htmlFor="#resource">
          Подключение к вычислителю
        </Label>
        <Select
          id="futureCommercialAccountingDate"
          onChange={(value, target) => {
            addPeriod(value, futureCommercialAccountingDate);
          }}
          placeholder="Укажите период"
          options={yesNo}
          defaultValue={yesNo[0].value}
        />
      </InputWrap>
      <InputWrap>
        <Label color="grey" htmlFor="#resource">
          Выберите вычислитель, к которому подключен прибор
        </Label>
        <InputTT
          id="calculatorSerial"
          type="number"
          placeholder="Начните вводить серийный номер или IP адрес прибора"
          onChange={(event) => onInputChange(event)}
        />
      </InputWrap>
      {/*
      const entryNumber = useRef(1);
  const hubNumber = useRef(1);
  const pipeNumber = useRef(1);
   */}
      <InputWrap>
        <Label color="grey" htmlFor="#resource">
          Номер ввода
        </Label>
        <InputTT
          id="entryNumber"
          type="number"
          required
          defaultValue={1}
          onChange={(event) => onInputChange(event)}
        />
      </InputWrap>
      <InputWrap>
        <Label color="grey" htmlFor="#resource">
          Номер узла
        </Label>
        <InputTT
          id="hubNumber"
          type="number"
          required
          defaultValue={1}
          onChange={(event) => onInputChange(event)}
        />
      </InputWrap>
      <InputWrap>
        <Label color="grey" htmlFor="#resource">
          Номер трубы
        </Label>
        <InputTT
          id="pipeNumber"
          type="number"
          required
          defaultValue={1}
          onChange={(event) => onInputChange(event)}
        />
      </InputWrap>
      <InputWrap>
        <Label color="grey" htmlFor="#resource">
          Выберите тип ресурса
        </Label>

        <Select
          id="magistral"
          onChange={onSelectChange}
          options={magistrals}
          defaultValue={magistrals[0].value}
        />
      </InputWrap>
    </div>
  );
};

export default Page2;

import React, { useContext } from 'react';
import { Form } from 'antd';
import { DevicesListDiv } from './Tabs';
import { ReportContext } from '../index';
import { SelectTT } from '../../../../../../tt-components';


export const Uzel = () => {
  console.log('Uzel');
  const {
    street,
    housingStockNumber,
    SelectReport,
    type,
    selectOptions,
    handleChange,
  } = useContext(ReportContext);

  console.log('selectOptions', selectOptions);
  console.log("type", type)

  const modifiedSelectOptions = selectOptions.filter(option => option.value == type);
  console.log("modifiedSelectOptions",modifiedSelectOptions)

  {
    return (
      <div>
        <div>
          <label className="modal__label" htmlFor="#input">
            Название отчета
          </label>
          <input
            className="modal__input"
            id="input"
            value={`${street}_${housingStockNumber}.exls`}
            disabled
          />
        </div>
        <Form.Item label="Выбор узла">
          <SelectTT
            options={modifiedSelectOptions}
            placeholder="Выберите узел"
            onChange={handleChange}
          />
        </Form.Item>
      </div>
    );
  }
};

export const Top = () => {
  console.log('Top');
  return (
    <>
      <DevicesListDiv />
      <Uzel />
    </>
  );
};

export default Top;

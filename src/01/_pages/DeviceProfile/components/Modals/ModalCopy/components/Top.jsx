import React, { useContext } from 'react';
import { Form } from 'antd';
import { DevicesListDiv } from './Tabs';
import { ReportContext } from '../index';
import { SelectTT } from '../../../../../../tt-components';

export const Uzel = () => {
  const {
    street,
    housingStockNumber,
    SelectReport,
    type,
    selectOptions,
    handleChange,
  } = useContext(ReportContext);


  const modifiedSelectOptions = selectOptions.filter(
    (option) => option.value == type
  );

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
  return (
    <>
      <DevicesListDiv />
      <Uzel />
    </>
  );
};

export default Top;

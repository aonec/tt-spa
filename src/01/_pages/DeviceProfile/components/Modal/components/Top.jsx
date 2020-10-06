import React, { useContext } from 'react';
import { DevicesListDiv } from './Tabs';
import { ReportContext } from '..';

export const Uzel = () => {
  console.log('Uzel');
  const {
    street,
    number,
    SelectReport,
    type,
    selectOptions,
    handleChange,
  } = useContext(ReportContext);
  console.log('selectOptions', selectOptions);
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
            // value={`${model}_${street}_${number}.exls`}
            value={`${street}_${number}.exls`}
            disabled
          />
        </div>
        <div className="div">
          <label className="modal__label" htmlFor="#select">
            Выбор узла
          </label>
          <SelectReport
            id="select"
            type={type}
            selectOptions={selectOptions}
            defaultValue="Выберите узел"
            handleChange={handleChange}
          />
        </div>
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

import React from 'react';
import { InputTT } from '../../../../../tt-components/InputTT';
import { ButtonTT } from '../../../../../tt-components/ButtonTT';
import {Form} from "antd";

const SearchOrAdd = (props) => {
  const { updateSeriaNumber, DevicesList, serialNumber, showEmpty, showAdd, showEdit } = props;
  console.log('SearchOrAdd');
  return (
    <div>
      <Form.Item label={'Поиск'} style={{position:'relative'}}>
      <InputTT
        style={{ width: '460px', marginRight: '32px' }}
        onChange={(event) => {
          updateSeriaNumber(event.target.value);
        }}
        value={serialNumber}
      />
        <DevicesList />
      </Form.Item>

      <ButtonTT color='blue' style={{marginRight: '32px'}} onClick={showAdd}>Добавить ОДПУ</ButtonTT>
      <ButtonTT color='red' style={{marginRight: '32px'}} onClick={showEmpty}>Сбросить</ButtonTT>
      <ButtonTT color='white' onClick={showEdit}>Редактировать</ButtonTT>
    </div>
  );
};

export default SearchOrAdd;

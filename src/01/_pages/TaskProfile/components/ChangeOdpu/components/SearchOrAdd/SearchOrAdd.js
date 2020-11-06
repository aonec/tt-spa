import React, { useContext } from 'react';
import { InputTT } from '../../../../../../tt-components/InputTT';
import { ButtonTT } from '../../../../../../tt-components/ButtonTT';
import {Form} from "antd";
import { ChangeOdpuContext } from "../../index";

const SearchOrAdd = (props) => {
  const { updateSeriaNumber,  handleChangeTab,
    newDevice,
    currentTabKey,
    setTab, DevicesList, serialNumber, showEmpty, showAdd, showEdit } = useContext(ChangeOdpuContext);


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

      <ButtonTT color='blue' disabled style={{marginRight: '32px'}} onClick={showAdd}>Добавить ОДПУ</ButtonTT>
      <ButtonTT color='red' style={{marginRight: '32px'}} onClick={showEmpty}>Сбросить</ButtonTT>
      <ButtonTT color='white' disabled onClick={showEdit}>Редактировать</ButtonTT>
    </div>
  );
};

export default SearchOrAdd;

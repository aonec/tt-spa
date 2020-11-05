import React, { useState } from 'react';
import { Form } from 'antd';
import InputTT from '../../../../tt-components/InputTT';
import ButtonTT from '../../../../tt-components/ButtonTT';
import Header from '../../../../tt-components/Header';
import { SelectTT } from "../../../../tt-components/Select";

const ChangeOpdu = () => {

  const [addform, setAddForm] = useState(false);

  const SearchOrAddOdpu = () => {
    console.log('SearchOrAddOdpu');
    const Search = () => {
      console.log('Search');
      return (
        <InputTT
          style={{ width: '460px', marginRight: '32px' }}
          placeholder="Поиск устройства по серийному номеру"
        />
      );
    };
    const Add = () => {
      console.log('Add');
      const addformHandler = () =>{
        setAddForm(true)
      }
      return (
        <ButtonTT color="blue" onClick={addformHandler}>Добавить ОДПУ</ButtonTT>
      );
    };
    return (
      <div style={{ display: 'flex' }}>
        <Search />
        <Add />
      </div>
    );
  };
  const ChangeOdpuEmpty = () => {
    console.log('ChangeOdpuEmpty');
    return (
      <Form style={{display: 'flex',width:'100%', flexWrap:'wrap', justifyContent:'space-between'}}>
        <Form.Item label="Серийный номер" style={{width:'49%'}}>
          <InputTT disabled />
        </Form.Item>
        <Form.Item label="Тип прибора" style={{width:'49%'}}>
          <InputTT disabled />
        </Form.Item>
        <Form.Item label="Тип ресурса" style={{width:'49%'}}>
          <InputTT disabled />
        </Form.Item>
        <Form.Item label="Модель прибора" style={{width:'49%'}}>
          <InputTT disabled />
        </Form.Item>
        <Form.Item label="Дата поверки пробора" style={{width:'49%'}}>
          <InputTT disabled />
        </Form.Item>
        <Form.Item label="Дата следующей поверки пробора" style={{width:'49%'}}>
          <InputTT disabled />
        </Form.Item>
        ChangeOdpuEmpty
      </Form>
    );
  };
  const FormHeader = () => {
    console.log('Header');
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <Form.Item label="Выберите дальнейшее действие" style={{ width: '48%' }}>
          <SelectTT
            placeholder="Замена прибора"
            disabled
          />
        </Form.Item>

        <Form.Item label="Исполнитель" style={{ width: '48%' }}>
          <SelectTT
            placeholder="Константинопольский К.К."
            disabled
          />
        </Form.Item>
      </div>
    );
  };
  const ChangeOdpuRes = () => {
    console.log('ChangeOdpuRes');
    return (
      <ChangeOdpuEmpty />
    );
  };

  const AddOpduForm = () =>{
    console.log("AddOpduForm");
    if (setAddForm ===true) {
      return (
        <div>AddOpduForm</div>
      )
    }
  }

  console.log('ChangeOpdu');
  return (
    <div>
      <Header>Замена расходомера/термодатчика</Header>
      <FormHeader />
      <SearchOrAddOdpu />
      <ChangeOdpuRes style={{padding:'32px'}}/>
    </div>
  );
};

export default ChangeOpdu;

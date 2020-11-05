import React from 'react';
import { Form } from 'antd';
import InputTT from '../../../../tt-components/InputTT';
import ButtonTT from '../../../../tt-components/ButtonTT';
import Header from '../../../../tt-components/Header';

const ChangeOpdu = () => {
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
      return (
        <ButtonTT color="blue">Добавить ОДПУ</ButtonTT>
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

  const ChangeOdpuRes = () => {
    console.log('ChangeOdpuRes');
    return (
      <ChangeOdpuEmpty />
    );
  };

  console.log('ChangeOpdu');
  return (
    <div>
      <Header>Замена расходомера/термодатчика</Header>
      <SearchOrAddOdpu />
      <ChangeOdpuRes />
    </div>
  );
};

export default ChangeOpdu;

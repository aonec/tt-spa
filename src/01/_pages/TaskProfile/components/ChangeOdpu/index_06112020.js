import React, { useRef, useState } from 'react';
import { Form, List } from 'antd';
import InputTT from '../../../../tt-components/InputTT';
import ButtonTT from '../../../../tt-components/ButtonTT';
import Header from '../../../../tt-components/Header';
import { SelectTT } from '../../../../tt-components/Select';
import axios from '../../../../axios';

const ChangeOpdu = (props) => {
  console.log('props', props);
  const { type, id } = props;
  const [addform, setAddForm] = useState(false);
  const [serial, setSerial] = useState('');
  const [newId, setNewId] = useState();
  const [list, setList] = useState([]);
  const [newDevice, setNewDevice] = useState();
  const [inputs, setInputs] = useState();

  // "id": 1887696,
  //   "type": "Housing",
  //   "isConnected": false,
  //   "model": "Отопление",
  //   "serialNumber": "051120201458",
  //   "ipV4": null,
  //   "port": null,
  //   "deviceAddress": null,
  //   "resource": "Heat"
  


  async function getClosedDevices(serialNumber = '') {
    const typeRes = type === 'Calculator' ? 'Calculator' : 'Housing';
    try {
      const res = await axios.get(`MeteringDevices/search?DeviceType=${typeRes}&Status=Closed&Question=${serialNumber}`);
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      throw {
        resource: 'device',
        message: 'Произошла ошибка запроса устройств',
      };
    }
  }
  const searchOdpu = (event) => {
    const input = event.target.value;

    if (input.length > 2) {
      getClosedDevices(input).then((res) => {
        const devicesList = res.map((item) => {
          const { model, serialNumber, id } = item;
          return { value: serialNumber, label: `${model} (${serialNumber})`, id };
        });
        setList(devicesList);
      });
    }
  };
  const SearchOrAddOdpu = () => {
    console.log('SearchOrAddOdpu');
    const Search = () => {
      console.log('Search');
      return (
        <InputTT
          key="dddd"
          style={{ width: '460px', marginRight: '32px' }}
          placeholder="Поиск устройства по серийному номеру"
          onChange={(event) => {
            searchOdpu(event);
            setSerial(event.target.value);
          }}
          value={serial}
        />
      );
    };
    const Add = () => {
      console.log('Add');
      const addformHandler = () => {
        setAddForm(true);
      };
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
      <Form style={{
        display: 'flex', width: '100%', flexWrap: 'wrap', justifyContent: 'space-between',
      }}
      >
        <Form.Item label="Серийный номер" style={{ width: '49%' }}>
          <InputTT disabled />
        </Form.Item>
        <Form.Item label="Тип прибора" style={{ width: '49%' }}>
          <InputTT disabled />
        </Form.Item>
        <Form.Item label="Тип ресурса" style={{ width: '49%' }}>
          <InputTT disabled />
        </Form.Item>
        <Form.Item label="Модель прибора" style={{ width: '49%' }}>
          <InputTT disabled />
        </Form.Item>
        <Form.Item label="Дата поверки пробора" style={{ width: '49%' }}>
          <InputTT disabled />
        </Form.Item>
        <Form.Item label="Дата следующей поверки пробора" style={{ width: '49%' }}>
          <InputTT disabled />
        </Form.Item>
        ChangeOdpuEmpty
      </Form>
    );
  };

  const ChangeOdpuEdit = () => {
    console.log('ChangeOdpuEdit');
    return (
      <Form style={{
        display: 'flex', width: '100%', flexWrap: 'wrap', justifyContent: 'space-between',
      }}
      >
        <Form.Item label="Серийный номер" style={{ width: '49%' }}>
          <InputTT disabled />
        </Form.Item>
        <Form.Item label="Тип прибора" style={{ width: '49%' }}>
          <InputTT disabled />
        </Form.Item>
        <Form.Item label="Тип ресурса" style={{ width: '49%' }}>
          <InputTT disabled />
        </Form.Item>
        <Form.Item label="Модель прибора" style={{ width: '49%' }}>
          <InputTT disabled />
        </Form.Item>
        <Form.Item label="Дата поверки пробора" style={{ width: '49%' }}>
          <InputTT disabled />
        </Form.Item>
        <Form.Item label="Дата следующей поверки пробора" style={{ width: '49%' }}>
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

  const AddOpduForm = () => {
    console.log('AddOpduForm');
    if (setAddForm === true) {
      return (
        <div>AddOpduForm</div>
      );
    }
  };

  async function getHousingMeteringDevice(HousingMeteringDeviceId = '') {
    try {
      const res = await axios.get(`HousingMeteringDevices/${HousingMeteringDeviceId}`);
      console.log(res);
      setNewDevice(res);
      setInputs(res);
      return res;
    } catch (error) {
      console.log(error);
      throw {
        resource: 'device',
        message: 'Произошла ошибка запроса устройства',
      };
    }
  }


  const DevicesList = () => {
    console.log('List');
    return (
      <div style={{ position: 'absolute' }}>
        {list.length > 0 && (
          <List
            size="large"
            style={{
              zIndex: '2',
              backgroundColor: 'white',
            }}
            bordered
            dataSource={list}
            renderItem={(item) => (
              <List.Item onClick={() => {
                console.log(item.value);
                // setFieldValue('serialNumber', item.value);

                getHousingMeteringDevice(item.id);
                console.log(item.id);

                // showModalChangeOdpu();
                setList([]);
              }}
              >
                {item.label}
              </List.Item>
            )}
          />
        )}

      </div>
    );
  };

  console.log('ChangeOpdu');
  return (
    <div>
       <Header>Замена расходомера/термодатчика</Header>
       <FormHeader />
       <div>
         <InputTT
           style={{ width: '460px', marginRight: '32px', position:'relative' }}
           placeholder="Поиск устройства по серийному номеру"
           onChange={(event) => {
             searchOdpu(event);
             setSerial(event.target.value);
           }}
           value={serial}
         />
         <DevicesList />

       </div>

      {/* <ChangeOdpuRes style={{ padding: '32px' }} /> */}


    </div>
  );
};

export default ChangeOpdu;

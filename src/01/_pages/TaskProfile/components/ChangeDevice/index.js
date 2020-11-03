import React, { useState } from 'react';
import {
  Form, List, Typography, Divider,
} from 'antd';
import 'moment/locale/ru';
import { useDispatch } from 'react-redux';
import { red } from '@material-ui/core/colors';
import { setModalChangeODPUVisible } from '../../../../Redux/actions/actions';
import {
  SelectTT, ButtonTT, InputTT, DatePickerTT, Header,
} from '../../../../tt-components';
import axios from '../../../../axios';
import { housingMeteringDeviceTypes } from "../../../EditODPU/constants";

const ChangeDevice = ({ getData = () => { }, id, type }) => {
  console.log('id', id);
  console.log('type', type);

  const [device, setDevice] = useState({});
  const [serialNumber, setSerialNumber] = useState('');
  const [list, setList] = useState([]);
  const [newDevice, setNewDevice] = useState();


  async function getClosedDevices(serialNumber = '') {
    let typeRes;
    // const typeRes = type === 'Calculator' ? 'Calculator' : 'Housing';
    if (type === 'Calculator') {
      console.log('Calculator');
      typeRes = 'Calculator';
    } else {
      console.log('NotCalculator');
      typeRes = 'Housing';
    }
    console.log(typeRes);
    try {
      const res = await axios.get(`MeteringDevices/search?DeviceType=${typeRes}&Status=Closed&Question=${serialNumber}`);
      // setDevice(res[0]);
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

  function onChange(date) {
    getData({ calculatorSwitch: date.toISOString() ?? null });
  }

  const showModalChangeOdpu = () => {

    getData({
      calculatorSwitch: {
        deviceId: device,
        newDeviceId: newDevice,
      } ?? null,
    });

  };

  const buttonHandler = () => {
    console.log(list);
  };

  const serialHandler = (event) => {
    console.log('serialHandler');
    console.log(event.target.value);
    const input = event.target.value;
    setSerialNumber(input);
    if (serialNumber.length > 2) {
      getClosedDevices(input).then((res) => {
        const test = res.map((item) => {
          const { model, serialNumber } = item;
          console.log(item);
          return { value: serialNumber, label: `${model} (${serialNumber})` };
          // const {serialNumber, model} = item
          // data.push({value: serialNumber, label: model})
        });

        setList(test);
        console.log(test);
      });
    }
  };



  return (
    <div>
      <Form style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <Header>Замена расходомера/термодатчика</Header>

        <ButtonTT color={red} onClick={buttonHandler}>BUTTON</ButtonTT>
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

        <Form.Item label="Серийный номер" style={{ width: '48%', position: 'relative' }}>
          <InputTT
            placeholder="Серийный номер"
            onChange={serialHandler}
            value={serialNumber}
          />
          <div style={{ position: 'absolute' }}>
            {list.length>0 && (
              <List
                size="large"
                style={{
                  zIndex: '2',
                  backgroundColor: 'white',
                }}
                bordered
                dataSource={list}
                renderItem={(item) => <List.Item onClick={() => { console.log(item.value);
                setSerialNumber(item.value);
                setNewDevice[item.value];
                  showModalChangeOdpu();
                setList([])
                }}>{item.label}</List.Item>}
              />
            )}



          </div>
        </Form.Item>

        <Form.Item label="Тип прибора" style={{ width: '48%' }}>
          <SelectTT
            disabled
          />
        </Form.Item>

        <Form.Item label="Тип ресурса" style={{ width: '48%' }}>
          <SelectTT
            disabled
          />
        </Form.Item>

        <Form.Item label="Модель прибора" style={{ width: '48%' }}>
          <SelectTT
            disabled
          />
        </Form.Item>

        <Form.Item label="Дата поверки пробора" style={{ width: '48%' }}>
          <DatePickerTT
            disabled
          />
        </Form.Item>

        <Form.Item label="Дата следующей поверки пробора" style={{ width: '48%' }}>
          <DatePickerTT
            disabled
          />
        </Form.Item>

        <Form.Item label="Срок эксплуатации по нормативу" style={{ width: '100%' }}>
          <SelectTT
            disabled
          />
        </Form.Item>

      </Form>
    </div>

  );
};

export default ChangeDevice;

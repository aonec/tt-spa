import React from 'react';
import {  Form } from 'antd';
import 'moment/locale/ru';
import { useDispatch } from 'react-redux';
import { setModalChangeODPUVisible } from '../../../../Redux/actions/actions';
import {SelectTT, ButtonTT, InputTT, DatePickerTT , Header} from '../../../../tt-components';
import axios from "../../../../axios";
import { red } from "@material-ui/core/colors";
import { button } from "../../../../r_comp";


async function getClosedDevices(url = '') {
  try {
    const res = await axios.get(`/MeteringDevices/search?Status=Closed`);
    console.log(res)
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'device',
      message: 'Произошла ошибка запроса устройств',
    };
  }
}

const ChangeDevice = ({ getData = () => { } }) => {
  function onChange(date) {
    getData({ calculatorSwitch: date.toISOString() ?? null });
  }

  const dispatch = useDispatch();
  const showModalChangeOdpu = () => {
    console.log('showModalChangeOdpu');
    const test = {
      calculatorSwitch: {
        deviceId: 1214,
        newDeviceId: 1553977,
      },
    };

    getData({
      calculatorSwitch: {
        deviceId: 1214,
        newDeviceId: 1553977,
      } ?? null,
    });
    dispatch(setModalChangeODPUVisible(true));
  };

  const buttonHandler = () =>{
    console.log("buttonHandler")
    getClosedDevices()
  }

  return (
    <div >
      <Form style={{ display: 'flex', flexWrap:'wrap', justifyContent:"space-between" }}>
        <Header>Замена расходомера/термодатчика</Header>

        <ButtonTT color={red} onClick={buttonHandler}>BUTTON</ButtonTT>
        <Form.Item label="Выберите дальнейшее действие" style={{width:'48%'}}>
          <SelectTT
            placeholder="Замена прибора"
            disabled
          />
        </Form.Item>


        <Form.Item label="Исполнитель" style={{width:'48%'}}>
          <SelectTT
            placeholder="Константинопольский К.К."
            disabled
          />
        </Form.Item>

        <Form.Item label="Серийный номер" style={{width:'48%'}}>
          <InputTT
            placeholder="Серийный номер"
          />
        </Form.Item>

        <Form.Item label="Тип прибора" style={{width:'48%'}}>
          <SelectTT
            disabled
          />
        </Form.Item>

        <Form.Item label="Тип ресурса" style={{width:'48%'}}>
          <SelectTT
            disabled
          />
        </Form.Item>

        <Form.Item label="Модель прибора" style={{width:'48%'}}>
          <SelectTT
            disabled
          />
        </Form.Item>

        <Form.Item label="Дата поверки пробора" style={{width:'48%'}}>
          <DatePickerTT
            disabled
          />
        </Form.Item>

        <Form.Item label="Дата следующей поверки пробора" style={{width:'48%'}}>
          <DatePickerTT
            disabled
          />
        </Form.Item>

        <Form.Item label="Срок эксплуатации по нормативу" style={{width:'100%'}}>
          <SelectTT
            disabled
          />
        </Form.Item>

      </Form>
    </div>

  );
};

export default ChangeDevice;

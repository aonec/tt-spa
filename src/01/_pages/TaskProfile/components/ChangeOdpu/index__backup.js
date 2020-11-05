import React, { useState } from 'react';
import { Form, List } from 'antd';
import moment from 'moment';
import { red } from '@material-ui/core/colors';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  SelectTT, ButtonTT, InputTT, DatePickerTT, Header,
} from '../../../../tt-components';
import axios from '../../../../axios';
import { housingMeteringDeviceTypes, resources } from './constants';
import TabsComponent from './components/Tabs';
import { isConnectedValue } from '../../../EditODPU/constants';

const ChangeOdpu = ({
  getData = () => {
  }, id, type,
}) => {
  const [disable, setDisable] = useState(true);
  const [prevDevice, setPrevDevice] = useState(id)
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

  const FirstTab = () => {
    console.log('FirstTab');
    return (
      <div
        hidden={!(currentTabKey == '1')}
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}
      >
        <Form.Item label="Серийный номер" style={{ width: '48%', position: 'relative' }}>
          <InputTT
            name="serialNumber"
            placeholder="Серийный номер"
            onChange={(event) => {
              serialHandler(event);
              setFieldValue('serialNumber', event.target.value);
            }}
            value={values.serialNumber}
          />
          <DevicesList />
        </Form.Item>
        <Form.Item label="Тип прибора" style={{ width: '48%' }}>
          <SelectTT
            name="housingMeteringDeviceType"
            options={housingMeteringDeviceTypes}
            value={values.housingMeteringDeviceType}
            disabled={disable}
          />
        </Form.Item>
        <Form.Item label="Тип ресурса" style={{ width: '48%' }}>
          <SelectTT
            name="resource"
            options={resources}
            value={values.resource}
            disabled={disable}
          />
        </Form.Item>
        <Form.Item label="Модель прибора" style={{ width: '48%' }}>
          <InputTT
            name="model"
            value={values.model}
            disabled={disable}
          />
        </Form.Item>
        <Form.Item label="Дата поверки пробора" style={{ width: '48%' }}>
          <DatePickerTT
            format="DD.MM.YYYY"
            name="lastCheckingDate"
            value={moment(values.lastCheckingDate)}
            disabled={disable}
          />
        </Form.Item>
        <Form.Item label="Дата следующей поверки пробора" style={{ width: '48%' }}>
          <DatePickerTT
            format="DD.MM.YYYY"
            name="futureCheckingDate"
            value={moment(values.futureCheckingDate)}
            disabled={disable}
          />
        </Form.Item>
        <Form.Item label="Срок эксплуатации по нормативу" style={{ width: '100%' }}>
          <SelectTT
            disabled={disable}
          />
        </Form.Item>
      </div>
    );
  };

  const SecondTab = () => {
    console.log('SecondTab');
    return (
      <div
        hidden={!(currentTabKey == '2')}
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}
      >
        <Form.Item label="Подключение к вычислителю" style={{ width: '48%' }}>
          <SelectTT
            name="isConnected"
            onChange={(item) => {
              // (item === false) ? setDisable(true) : setDisable(false);
              setFieldValue('isConnected', item);
            }}
            placeholder="Подключение к вычислителю"
            options={isConnectedValue}
            value={values.isConnected}
            disabled={disable}
          />
        </Form.Item>
        <Form.Item
          style={{ width: '48%' }}
          label="Выберите вычислитель, к которому подключен прибор"
        >
          <SelectTT
            name="calculatorId"
            placeholder="Начните вводить серийный номер или IP адрес прибора"
            onChange={(value) => {
              // if (value !== values.calculatorId) {
              //   setFieldValue('calculatorId', value);
              // }
            }}
            // value={values.hubConnection.calculatorId}
            disabled={disable}
          />
          {/* <Alert name="calculatorId" /> */}
        </Form.Item>
        <Form.Item label="Номер ввода" style={{ width: '48%' }}>
          <InputTT
            name="entryNumber"
            type="number"
            placeholder="Номер ввода"
            onChange={handleChange}
            disabled={disable}
          />
        </Form.Item>
        <Form.Item label="Номер узла" className="hubNumber" style={{ width: '48%' }}>
          <InputTT
            name="hubNumber"
            type="number"
            placeholder="Номер узла"
            onChange={handleChange}
            disabled={disable}
          />
        </Form.Item>
        <Form.Item label="Номер трубы" style={{ width: '100%' }}>
          <InputTT
            name="pipeNumber"
            type="number"
            placeholder="Номер трубы"
            onChange={handleChange}

            disabled={disable}
          />
        </Form.Item>
      </div>
    );
  };
  const Buttons = () => {
    console.log('Buttons');
    const Next = () => {
      console.log('Next');
      setTab(String(Number(currentTabKey) + 1));
    };

    const Done = () => {
      console.log(id);
      console.log(values.id);
      getData({
        calculatorSwitch: {
          deviceId: id,
          newDeviceId: values.id,
        } ?? null,
      });
    };

    if (Number(currentTabKey) === 3) {
      return (
        <ButtonTT color="blue" onClick={Done}>Завершить</ButtonTT>
      );
    }
    return (
      <ButtonTT color="blue" onClick={Next}>Далее</ButtonTT>
    );
  };
  const ThirdTab = () => {
    console.log('SecondTab');
    return (
      <div
        hidden={!(currentTabKey == '3')}
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}
      >
        Компонент в разработке
      </div>
    );
  };

  function handleChangeTab(value) {
    setTab(value);
  }

  const [currentTabKey, setTab] = useState('1');
  const [newDeviceId, setNewDeviceId] = useState();
  const [newDevice, setNewDevice] = useState({});
  const [list, setList] = useState([]);

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

  const setInputs = (device) => {
    console.log(device);
    const {id: bla} = device;
    console.log(bla)
    setValues({ ...values, ...device });
    console.log(values);
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

  const {
    handleSubmit,
    handleChange, values,
    touched,
    errors,
    handleBlur,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues: {
      model: '',
      resource: '',
      housingMeteringDeviceType: '',
      serialNumber: '',
      lastCommercialAccountingDate: moment().toISOString(),
      futureCommercialAccountingDate: moment().toISOString(),
      lastCheckingDate: moment().toISOString(),
      futureCheckingDate: moment().toISOString(),
      closingDate: moment().toISOString(),
      hubConnection: {
        calculatorConnection: null,
        calculatorId: null,
        calculatorModel: '',
        calculatorSerialNumber: '',
        hub: {
          entryNumber: null,
          hubNumber: null,
          magistral: '',
          pipeNumber: null,
        },
      },
    },
    validationSchema: Yup.object({
      // resource: Yup.string().required('Введите данные'),

    }),
    onSubmit: () => {

    },
  });

  const showModalChangeOdpu = () => {
    getData({
      calculatorSwitch: {
        deviceId: id,
        newDeviceId,
      } ?? null,
    });
  };

  const buttonHandler = () => {
    console.log('buttonHandler');
  };

  const serialHandler = (event) => {
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
                setFieldValue('serialNumber', item.value);

                getHousingMeteringDevice(item.id);
                console.log(item.id);

                showModalChangeOdpu();
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

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      <Form style={{ width: '100%' }}>
        <Header>Замена расходомера/термодатчика</Header>
        <ButtonTT color={red} onClick={buttonHandler}>BUTTON</ButtonTT>
        <FormHeader />
        <TabsComponent
          currentTabKey={currentTabKey}
          handleChangeTab={handleChangeTab}
        />
        {/* <FirstTab /> */}
        <div
          hidden={!(currentTabKey == '1')}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}
        >
          <Form.Item label="Серийный номер" style={{ width: '48%', position: 'relative' }}>
            <InputTT
              name="serialNumber"
              placeholder="Серийный номер"
              onChange={(event) => {
                serialHandler(event);
                setFieldValue('serialNumber', event.target.value);
              }}
              value={values.serialNumber}
            />
            <DevicesList />
          </Form.Item>
          <Form.Item label="Тип прибора" style={{ width: '48%' }}>
            <SelectTT
              name="housingMeteringDeviceType"
              options={housingMeteringDeviceTypes}
              value={values.housingMeteringDeviceType}
              disabled
            />
          </Form.Item>
          <Form.Item label="Тип ресурса" style={{ width: '48%' }}>
            <SelectTT
              name="resource"
              options={resources}
              value={values.resource}
              disabled
            />
          </Form.Item>
          <Form.Item label="Модель прибора" style={{ width: '48%' }}>
            <InputTT
              name="model"
              value={values.model}
              disabled
            />
          </Form.Item>
          <Form.Item label="Дата поверки пробора" style={{ width: '48%' }}>
            <DatePickerTT
              format="DD.MM.YYYY"
              name="lastCheckingDate"
              value={moment(values.lastCheckingDate)}
              disabled
            />
          </Form.Item>
          <Form.Item label="Дата следующей поверки пробора" style={{ width: '48%' }}>
            <DatePickerTT
              format="DD.MM.YYYY"
              name="futureCheckingDate"
              value={moment(values.futureCheckingDate)}
              disabled
            />
          </Form.Item>
          <Form.Item label="Срок эксплуатации по нормативу" style={{ width: '100%' }}>
            <SelectTT
              disabled
            />
          </Form.Item>
        </div>
        <SecondTab />
        <ThirdTab />
        <Buttons />
      </Form>
    </div>

  );
};

export default ChangeOdpu;

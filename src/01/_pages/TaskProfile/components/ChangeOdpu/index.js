import React, { useEffect, useState } from 'react';
import { Form, List } from 'antd';
import moment from "moment";
import { red } from '@material-ui/core/colors';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  SelectTT, ButtonTT, InputTT, DatePickerTT, Header,
} from '../../../../tt-components';
import axios from '../../../../axios';
import {housingMeteringDeviceTypes, resources} from "./constants";
import _ from "lodash";


const visibleValuesByTab1 = ['housingMeteringDeviceType', 'resource', 'model',
  'serialNumber',
  'lastCommercialAccountingDate',
  'futureCheckingDate',
  'futureCommercialAccountingDate',
  'city',
  'street',
  'housingStockNumber',
  'corpus'];
const visibleValuesByTab2 = ['isConnected',
  'calculatorId',
  'entryNumber',
  'hubNumber',
  'pipeNumber',
  'magistral'];
const visibleValuesByTab3 = ['documents'];

const visibleValuesByTab = [
  {
    key: 1,
    value: visibleValuesByTab1,
  },
  {
    key: 2,
    value: visibleValuesByTab2,
  },
  { key: 3, value: visibleValuesByTab3 },
];

const isVisible = (name) => _.find(visibleValuesByTab, { key: Number(currentTabKey) }).value.includes(name);


const ChangeOdpu = ({ getData = () => { }, id, type }) => {
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
    setValues({ ...values, ...device });
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

        {isVisible('resource')
        && (
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
        )}

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
            format={'DD.MM.YYYY'}
            name="lastCheckingDate"
            value={moment(values.lastCheckingDate)}
            disabled
          />
        </Form.Item>

        <Form.Item label="Дата следующей поверки пробора" style={{ width: '48%' }}>
          <DatePickerTT
            format={'DD.MM.YYYY'}
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

      </Form>
    </div>

  );
};

export default ChangeOdpu;

// const {
//   model,
//   resource,
//   housingMeteringDeviceType,
//   serialNumber,
//   lastCommercialAccountingDate,
//   futureCommercialAccountingDate,
//   lastCheckingDate,
//   futureCheckingDate,
//   closingDate,
// } = device;

// setValues({...values,      model,
//   resource,
//   housingMeteringDeviceType,
//   serialNumber,
//   lastCommercialAccountingDate,
//   futureCommercialAccountingDate,
//   lastCheckingDate,
//   futureCheckingDate,
//   closingDate, });

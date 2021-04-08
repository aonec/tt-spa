import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Form } from 'antd';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import {
  magistrals,
  housingMeteringDeviceTypes,
  isConnected,
} from '../../../../../tt-components/localBases';

import Tabs from '../../../../../tt-components/Tabs';
import {
  Title,
  SelectTT,
  InputTT,
  DatePickerTT,
  StyledModalBody,
  ButtonTT,
  StyledFooter,
  StyledFormPage,
  styles,
} from '../../../../../tt-components';
import { handleTabsBeforeFormSubmit } from '../../../../../utils/handleTabsBeforeFormSubmit';
import {
  validationSchemaFlowMeter,
  validationSchemaTemperatureSensor,
} from './validationSchemas';
import { AddNodeContext } from '../../../AddNodeContext';
import {
  AlertInterface,
  TabsItemInterface,
} from '../../../../../tt-components/interfaces';
import Warning from '../../../../../tt-components/Warning';

interface AddDeviceFormInterface {
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const AddDeviceForm = ({ setVisible }: AddDeviceFormInterface) => {
  const { node, communicationPipes, setCommunicationPipes } = useContext(
    AddNodeContext
  );

  const tabItems: Array<TabsItemInterface> = [
    {
      title: 'Шаг 1. Общие данные',
      key: '1',
      cb: () => setTab('1'),
    },
    {
      title: 'Шаг 2. Документы',
      key: '2',
      cb: () => setTab('2'),
    },
  ];

  const { resource, entryNumber, calculatorId } = node;

  const [currentTabKey, setTab] = useState('1');
  const [coldAndThermo, setcoldAndThermo] = useState(false);
  const [disable, setDisable] = useState(false);
  const [validationSchema, setValidationSchema] = useState(Yup.object({}));

  const Alert = ({ name }: AlertInterface) => {
    const touch = _.get(touched, `${name}`);
    const error = _.get(errors, `${name}`);
    if (touch && error) {
      return <div>{error}</div>;
    }
    return null;
  };

  function handleNext() {
    setTab(String(Number(currentTabKey) + 1));
  }

  function handleSubmitForm() {
    const { hasError, errorTab } = handleTabsBeforeFormSubmit(
      tabErrors,
      errors
    );
    if (hasError) {
      setTab(errorTab);
    }
  }

  const tabErrors = [
    {
      key: '1',
      value: [
        'model',
        'serialNumber',
        'diameter',
        'entryNumber',
        'pipeNumber',
        'calculatorId',
        'isAllowed',
      ],
    },
  ];

  const initialValues = {
    isConnected: isConnected[0].value,
    isAllowed: true,
    serialNumber: '',
    lastCheckingDate: moment(),
    futureCheckingDate: moment().add(3, 'years'),
    lastCommercialAccountingDate: moment(),
    futureCommercialAccountingDate: moment(),
    documentsIds: [],
    ipV4: '',
    deviceAddress: null,
    port: null,
    housingMeteringDeviceType: housingMeteringDeviceTypes[0].value,
    resource,
    model: '',
    diameter: null,
    calculatorId,
    entryNumber,
    pipeNumber: null,
    magistral: magistrals[0].value,
  };

  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    handleBlur,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues,
    validationSchema,

    onSubmit: async () => {
      const device = {
        serialNumber: values.serialNumber,
        lastCheckingDate: values.lastCheckingDate.toISOString(),
        futureCheckingDate: values.futureCheckingDate.toISOString(),
        lastCommercialAccountingDate: values.lastCommercialAccountingDate.toISOString(),
        futureCommercialAccountingDate: values.futureCommercialAccountingDate.toISOString(),
        documentsIds: [],
        housingMeteringDeviceType: values.housingMeteringDeviceType,
        resource,
        model: values.model,
        diameter: values.diameter,
        pipe: {
          calculatorId: Number(values.calculatorId),
          entryNumber: Number(values.entryNumber),
          pipeNumber: Number(values.pipeNumber),
          magistral: values.magistral,
        },
      };

      const pipeNumbers = _.map(communicationPipes, 'number');

      if (pipeNumbers.includes(values.pipeNumber)) {
        const newCommunicationPipes = communicationPipes.map(
          (communicationPipe: any) => {
            const { number, devices } = communicationPipe;
            if (number === values.pipeNumber) {
              devices.push(device);
            }
            return communicationPipe;
          }
        );

        return setCommunicationPipes(newCommunicationPipes);
      }
      const communicationPipe = {
        number: values.pipeNumber,
        entryNumber: values.entryNumber,
        magistral: values.magistral,
        devices: [device],
      };

      setCommunicationPipes((prevState: any) => [
        ...prevState,
        communicationPipe,
      ]);

      setValues(initialValues);
      setTab('1');
    },
  });

  useEffect(() => {
    setValidationSchema(validationSchemaFlowMeter);
  }, []);

  useEffect(() => {
    const pipeNumbers = _.map(communicationPipes, 'number');

    if (pipeNumbers.includes(values.pipeNumber)) {
      const getDevices = _.find(communicationPipes, {
        number: values.pipeNumber,
      });
      const isSameType = _.find(getDevices.devices, {
        housingMeteringDeviceType: values.housingMeteringDeviceType,
      });
      setFieldValue('isAllowed', !isSameType);
      return;
    }
    setFieldValue('isAllowed', true);
  }, [values.pipeNumber, values.housingMeteringDeviceType]);

  useEffect(() => {
    const isTrue =
      values.resource === 'ColdWaterSupply' &&
      values.housingMeteringDeviceType === 'TemperatureSensor';
    setcoldAndThermo(!isTrue);
  }, [values.resource, values.housingMeteringDeviceType]);

  useEffect(() => {
    if (values.housingMeteringDeviceType === 'FlowMeter') {
      setValidationSchema(validationSchemaFlowMeter);
    }
    if (values.housingMeteringDeviceType === 'TemperatureSensor') {
      setValidationSchema(validationSchemaTemperatureSensor);
      setFieldValue('diameter', null);
    }
  }, [values.housingMeteringDeviceType]);

  return (
    <form onSubmit={handleSubmit}>
      <StyledModalBody>
        <Title size="middle" color="black">
          Добавление нового ОДПУ
        </Title>
        <Tabs tabItems={tabItems} tabsType={'tabs'} />
        <Warning
          hidden={!coldAndThermo}
          title="Для данного узла не предусмотрено наличие термодатчика. Проверьте выбранный ресурс."
        />
        <Warning
          hidden={values.isAllowed}
          title="На данной трубе уже есть такой тип устройства"
        />
        <StyledFormPage hidden={Number(currentTabKey) !== 1}>
          <Form.Item label="Выберите тип прибора" style={styles.w100}>
            <SelectTT
              name="housingMeteringDeviceType"
              onChange={(value) => {
                setFieldValue('housingMeteringDeviceType', value);
              }}
              options={housingMeteringDeviceTypes}
              value={values.housingMeteringDeviceType}
            />
            <Alert name="housingMeteringDeviceType" />
          </Form.Item>

          <Form.Item label="Выберите модель прибора" style={styles.w49}>
            <InputTT
              name="model"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.model}
            />
            <Alert name="model" />
          </Form.Item>

          <Form.Item label="Серийный номер" style={styles.w49}>
            <InputTT
              name="serialNumber"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.serialNumber}
            />
            <Alert name="serialNumber" />
          </Form.Item>

          {values.housingMeteringDeviceType === 'FlowMeter' ? (
            <Form.Item label="Диаметр трубы (мм)" style={styles.w100}>
              <InputTT
                name="diameter"
                placeholder="Укажите диаметр трубы в мм"
                type="number"
                onChange={handleChange}
                value={values.diameter}
                onBlur={handleBlur}
              />
              <Alert name="diameter" />
            </Form.Item>
          ) : null}

          <Form.Item label="Дата поверки" style={styles.w49}>
            <DatePickerTT
              format="DD.MM.YYYY"
              name="lastCheckingDate"
              placeholder="Укажите дату..."
              allowClear={false}
              onChange={(date) => {
                setFieldValue('lastCheckingDate', date);
              }}
              value={moment(values.lastCheckingDate)}
            />
          </Form.Item>

          <Form.Item label="Дата следующей поверки" style={styles.w49}>
            <DatePickerTT
              format="DD.MM.YYYY"
              name="futureCheckingDate"
              placeholder="Укажите дату..."
              allowClear={false}
              onChange={(date) => {
                setFieldValue('futureCheckingDate', date);
              }}
              value={moment(values.futureCheckingDate)}
            />
          </Form.Item>

          <Form.Item label="Номер трубы" style={styles.w49}>
            <InputTT
              name="pipeNumber"
              type="number"
              min="0"
              step="1"
              placeholder="Номер трубы"
              value={values.pipeNumber}
              onBlur={handleBlur}
              onChange={handleChange}
              disabled={disable}
            />
            <Alert name="pipeNumber" />
          </Form.Item>

          <Form.Item name="text" label="Магистраль" style={styles.w49}>
            <SelectTT
              placeholder="Выберите направление магистрали"
              name="magistral"
              options={magistrals}
              onChange={(value) => {
                setFieldValue('magistral', value);
              }}
              value={values.magistral}
            />
            <Alert name="magistral" />
          </Form.Item>
        </StyledFormPage>

        <StyledFormPage hidden={Number(currentTabKey) !== 2}>
          <Title color="black">Компонент в разработке</Title>
        </StyledFormPage>
      </StyledModalBody>
      <StyledFooter>
        <ButtonTT
          color="blue"
          onClick={handleNext}
          big
          hidden={currentTabKey === '2'}
          disabled={coldAndThermo}
          style={{ marginLeft: '16px' }}
          type="button"
        >
          Далее
        </ButtonTT>

        <ButtonTT
          color="blue"
          type="submit"
          hidden={currentTabKey !== '2'}
          style={{ marginLeft: 16 }}
          big
          disabled={coldAndThermo}
          onClick={handleSubmitForm}
        >
          Добавить
        </ButtonTT>
        <ButtonTT
          type="button"
          color="white"
          onClick={() => {
            setVisible(false);
          }}
          style={{ marginLeft: '16px' }}
        >
          Отмена
        </ButtonTT>
      </StyledFooter>
    </form>
  );
};

export default AddDeviceForm;

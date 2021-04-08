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
import _ from 'lodash';
import {
  magistrals,
  housingMeteringDeviceTypes,
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
import { AddNodeContext } from '../../../AddNodeContext';
import {
  AlertInterface,
  TabsItemInterface,
} from '../../../../../tt-components/interfaces';
import Warning from '../../../../../tt-components/Warning';
import {
  validationSchemaFlowMeter,
  validationSchemaTemperatureSensor,
} from '../../../../../tt-components/validationSchemas';

const AddDeviceForm = () => {
  const {
    calculatorForm,
    nodeForm,
    communicationPipes,
    setCommunicationPipes,
    setAddHousingVisible,
  } = useContext(AddNodeContext);

  const [currentTabKey, setTab] = useState('1');
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

  const { entryNumber, calculatorId } = calculatorForm;
  const { resource } = nodeForm;
  const [temperatureSensorAllowed, setTemperatureSensorAllowed] = useState(
    false
  );
  const [disable, setDisable] = useState(false);
  const [validationSchema, setValidationSchema] = useState<any>(
    validationSchemaFlowMeter
  );

  const Alert = ({ name }: AlertInterface) => {
    const touch = _.get(touched, `${name}`);
    const error = _.get(errors, `${name}`);
    if (touch && error) {
      return <div style={{ color: 'red' }}>{error}</div>;
    }
    return null;
  };

  function handleNext() {
    setTab(String(Number(currentTabKey) + 1));
  }

  const handleAddDeviceSubmitForm = (e: any) => {
    e.preventDefault();
    const { hasError, errorTab } = handleTabsBeforeFormSubmit(
      tabErrors,
      errors
    );

    if (hasError) {
      return setTab(errorTab);
    }
    handleSubmit();
  };

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
    isAllowed: true,
    serialNumber: 'serialNumber',
    lastCheckingDate: moment(),
    futureCheckingDate: moment().add(3, 'years'),
    lastCommercialAccountingDate: moment(),
    futureCommercialAccountingDate: moment().add(3, 'years'),
    documentsIds: [],
    housingMeteringDeviceType: housingMeteringDeviceTypes[0].value,
    resource,
    model: 'model',
    diameter: 1,
    calculatorId,
    entryNumber,
    pipeNumber: 1,
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
      const device: any = {
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

        console.log('newCommunicationPipes', newCommunicationPipes);
        setCommunicationPipes(newCommunicationPipes);
      } else {
        const communicationPipe = {
          number: values.pipeNumber,
          entryNumber: values.entryNumber,
          magistral: values.magistral,
          devices: [device],
        };

        const res = [...communicationPipes, communicationPipe];
        console.log('res', res);
        setCommunicationPipes(res);
      }

      setValues(initialValues);
      setTab('1');
    },
  });

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
    setTemperatureSensorAllowed(isTrue);

    if (values.housingMeteringDeviceType === 'FlowMeter') {
      setValidationSchema(validationSchemaFlowMeter);
      return;
    }
    if (values.housingMeteringDeviceType === 'TemperatureSensor') {
      setValidationSchema(validationSchemaTemperatureSensor);
      setFieldValue('diameter', null);
      return;
    }
  }, [values.resource, values.housingMeteringDeviceType]);

  return (
    <form onSubmit={handleAddDeviceSubmitForm} id={'addHousingMeteringDevice'}>
      <StyledModalBody>
        <Title size="middle" color="black">
          Добавление нового ОДПУ
        </Title>
        <Tabs tabItems={tabItems} tabsType={'tabs'} activeKey={currentTabKey} />
        <Warning
          hidden={!temperatureSensorAllowed}
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
          disabled={temperatureSensorAllowed}
          style={{ marginLeft: '16px' }}
          type="button"
        >
          Далее
        </ButtonTT>

        <ButtonTT
          color="blue"
          type="button"
          form={'addHousingMeteringDevice'}
          onClick={(e: any) => handleAddDeviceSubmitForm(e)}
          hidden={currentTabKey !== '2'}
          style={{ marginLeft: 16 }}
          big
          disabled={temperatureSensorAllowed}
        >
          Добавить
        </ButtonTT>
        <ButtonTT
          type="button"
          color="white"
          onClick={() => {
            setAddHousingVisible(false);
          }}
          style={{ marginLeft: 16 }}
        >
          Отмена
        </ButtonTT>
      </StyledFooter>
    </form>
  );
};

export default AddDeviceForm;

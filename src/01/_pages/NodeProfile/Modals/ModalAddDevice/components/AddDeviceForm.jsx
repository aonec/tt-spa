import React, { useContext, useEffect, useState } from 'react';
import { Divider, Form } from 'antd';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import styled from 'styled-components';
import {
  magistrals,
  housingMeteringDeviceTypes,
  isConnectedOptions,
  resources,
  nodeStatusList,
} from '../../../../../tt-components/localBases';
import {
  Title,
  SelectTT,
  InputTT,
  DatePickerTT,
  StyledModalBody,
  ButtonTT,
  StyledFooter,
  Icon,
  Warning,
  StyledFormPage,
  styles,
} from '../../../../../tt-components';
import TabsComponent from './TabsComponent';
import { handleTabsBeforeFormSubmit } from '../../../../../utils/handleTabsBeforeFormSubmit';
import { NodeContext } from '../../../index';
import {
  validationSchemaFlowMeter,
  validationSchemaTemperatureSensor,
} from './validationSchemas';
import { addOdpu } from '../apiAddOdpu';
import { CalculatorResponse, NodeResponse } from '../../../../../../myApi';

const AddDeviceForm = (props) => {
  const { handleCancel } = props;
  const { node, calculator } = useContext(NodeContext);
  const { address } = calculator;

  const { city, corpus, housingStockNumber, id, street } = address;
  const {
    resource,
    calculatorId,
    communicationPipes,
    number,
    futureCommercialAccountingDate,
    lastCommercialAccountingDate,
    nodeStatus,
    serviceZone,
  } = node;

  console.log('node', node);

  const entryNumber = 1;

  // const communicationPipeIds = _.map(communicationPipes, ['id', 'number']);

  const [currentTabKey, setTab] = useState('1');
  const [coldAndThermo, setColdAndThermo] = useState(false);
  const [disable, setDisable] = useState(false);
  const [validationSchema, setValidationSchema] = useState(Yup.object({}));

  const tabErrors = [
    {
      key: '2',
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

  const calculatorIdOptions = [
    {
      value: calculatorId,
      label: calculatorId,
    },
  ];

  const initialValues = {
    number,
    isConnected: isConnectedOptions[0].value,
    isAllowed: true,
    serialNumber: '010320211230',
    lastCheckingDate: moment().toISOString(),
    futureCheckingDate: moment().add(3, 'years').toISOString(),
    lastCommercialAccountingDate: moment().toISOString(),
    futureCommercialAccountingDate: moment().add(3, 'years').toISOString(),
    documentsIds: [],
    ipV4: '',
    deviceAddress: null,
    port: null,
    housingMeteringDeviceType: housingMeteringDeviceTypes[0].value,
    resource,
    model: 'Test',
    pipeId: null,
    diameter: null,
    calculatorId,
    entryNumber,
    pipeNumber: null,
    magistral: magistrals[0].value,
    nodeStatus,
  };

  const communicationPipeIds = communicationPipes.map((item) => {
    const { number, id } = item;
    return { value: number, label: number, pipeId: id };
  });
  console.log('communicationPipeIds', communicationPipeIds);
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
        lastCheckingDate: values.lastCheckingDate,
        futureCheckingDate: values.futureCheckingDate,
        lastCommercialAccountingDate: values.lastCommercialAccountingDate,
        futureCommercialAccountingDate: values.futureCommercialAccountingDate,
        documentsIds: [],
        housingMeteringDeviceType: values.housingMeteringDeviceType,
        resource,
        model: values.model,
        diameter: values.diameter,
        // pipeId: values.pipeId,
        pipe: {
          calculatorId: values.calculatorId,
          entryNumber: values.entryNumber,
          pipeNumber: values.pipeNumber,
          magistral: values.magistral,
        },
      };
      console.log('SUBMIT', device);
      console.log('SUBMIT', JSON.stringify(device));

      addOdpu(device).then((res) => {
        console.log(res);
      });
    },
  });

  useEffect(() => {
    setValidationSchema(validationSchemaFlowMeter);
  }, []);

  useEffect(() => {
    if (
      values.resource === 'ColdWaterSupply' &&
      values.housingMeteringDeviceType === 'TemperatureSensor'
    ) {
      setColdAndThermo(true);
    } else setColdAndThermo(false);
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

  useEffect(() => {
    const pipeNumbers = _.map(communicationPipes, 'number');
    console.log('pipeNumbers', pipeNumbers);
    console.log('values.pipeNumber', values.pipeNumber);

    if (pipeNumbers.includes(values.pipeNumber)) {
      const getDevices = _.find(communicationPipes, {
        number: values.pipeNumber,
      });
      const isSameType = _.find(getDevices.devices, {
        housingMeteringDeviceType: values.housingMeteringDeviceType,
      });
      console.log('isSameType', isSameType);
      isSameType
        ? console.log('на трубе уже есть утстройство такого типа')
        : console.log('на трубе НЕТ утстройство такого типа');
      isSameType
        ? setFieldValue('isAllowed', false)
        : setFieldValue('isAllowed', true);
    } else {
      setFieldValue('isAllowed', true);
    }

    console.log(
      'values.pipeNumber, values.housingMeteringDeviceType',
      values.pipeNumber,
      values.housingMeteringDeviceType
    );
  }, [values.pipeNumber, values.housingMeteringDeviceType]);

  const Alert = ({ name = '' }) => {
    const touch = _.get(touched, `${name}`);
    const error = _.get(errors, `${name}`);
    if (touch && error) {
      return <div>{error}</div>;
    }
    return null;
  };

  const handleChangeTab = (value) => {
    setTab(value);
  };

  function handleNext() {
    setTab(String(Number(currentTabKey) + 1));
  }

  function handleSubmitForm() {
    const { hasError, errorTab } = handleTabsBeforeFormSubmit(
      tabErrors,
      errors
    );
    if (hasError === true) {
      setTab(errorTab);
    }
  }

  const disabledFields = [
    'resource',
    'isConnected',
    'calculatorId',
    'entryNumber',
    'number',
    'nodeStatus',
    'futureCommercialAccountingDate',
    'lastCommercialAccountingDate',
    'housingMeteringDeviceType',
  ];

  const addressString = `${city}, ${street}, ${housingStockNumber}`;

  const isDisabled = (value) => _.includes(disabledFields, value);

  return (
    <form onSubmit={handleSubmit}>
      <StyledModalBody>
        <Title size="middle" color="black">
          Добавление нового ОДПУ
        </Title>
        <StyledAddress>{addressString}</StyledAddress>
        {/* {JSON.stringify(errors)} */}
        <Warning
          hidden={!coldAndThermo}
          title="Для данного узла не предусмотрено наличие термодатчика. Проверьте выбранный ресурс."
        />
        <TabsComponent
          currentTabKey={currentTabKey}
          handleChangeTab={handleChangeTab}
        />
        <StyledFormPage hidden={Number(currentTabKey) !== 1}>
          <Form.Item label="Тип ресурса" style={styles.w49}>
            <SelectTT
              name="resource"
              onChange={(value) => {
                setFieldValue('resource', value);
              }}
              options={resources}
              value={values.resource}
              disabled={isDisabled('resource')}
            />
            <Alert name="resource" />
          </Form.Item>

          <Form.Item label="Тип прибора" style={styles.w49}>
            <SelectTT
              name="housingMeteringDeviceType"
              onChange={(value) => {
                setFieldValue('housingMeteringDeviceType', value);
              }}
              options={housingMeteringDeviceTypes}
              value={values.housingMeteringDeviceType}
              disabled={false}
            />
            <Alert name="housingMeteringDeviceType" />
          </Form.Item>

          <Divider style={{ margin: 0 }} />

          {/* <NodeInfo/> */}

          <StyledFormSubHeader style={styles.w100}>Узел</StyledFormSubHeader>

          <Form.Item label="Подключение к вычислителю" style={styles.w49}>
            <SelectTT
              name="isConnected"
              onChange={(value) => {
                setFieldValue('isConnected', value);
              }}
              options={isConnectedOptions}
              value={values.isConnected}
              disabled={isDisabled('isConnected')}
            />
            <Alert name="isConnected" />
          </Form.Item>

          <Form.Item
            label="Вычислитель, к которому подключен прибор"
            style={styles.w49}
          >
            <SelectTT
              name="calculatorId"
              onChange={(value) => {
                setFieldValue('calculatorId', value);
              }}
              options={calculatorIdOptions}
              value={values.calculatorId}
              disabled={isDisabled('calculatorId')}
            />
            <Alert name="calculatorId" />
          </Form.Item>

          <Form.Item label="Номер ввода" style={styles.w100}>
            <InputTT
              name="entryNumber"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.entryNumber}
              disabled={isDisabled('entryNumber')}
            />
            <Alert name="entryNumber" />
          </Form.Item>

          <Form.Item label="Номер узла" style={styles.w49}>
            <InputTT
              name="number"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.number}
              disabled={isDisabled('number')}
            />
            <Alert name="number" />
          </Form.Item>

          <Form.Item label="Статус узла" style={styles.w49}>
            <SelectTT
              name="nodeStatus"
              onChange={(value) => {
                setFieldValue('nodeStatus', value);
              }}
              options={nodeStatusList}
              value={values.nodeStatus}
              disabled={isDisabled('nodeStatus')}
            />
            <Alert name="nodeStatus" />
          </Form.Item>

          <Form.Item label="Дата поверки" style={styles.w49}>
            <DatePickerTT
              format="DD.MM.YYYY"
              name="lastCommercialAccountingDate"
              allowClear={false}
              onChange={(date) => {
                setFieldValue(
                  'lastCommercialAccountingDate',
                  date.toISOString()
                );
              }}
              value={moment(values.lastCommercialAccountingDate)}
              disabled={isDisabled('lastCommercialAccountingDate')}
            />
            <StyledDateHint>
              Только для приборов коммерческого учета
            </StyledDateHint>
            <Alert name="lastCommercialAccountingDate" />
          </Form.Item>

          <Form.Item label="Дата следующей поверки" style={styles.w49}>
            <DatePickerTT
              format="DD.MM.YYYY"
              name="futureCommercialAccountingDate"
              allowClear={false}
              onChange={(date) => {
                setFieldValue('', date.toISOString());
                setFieldValue('', date.toISOString());
              }}
              value={moment(values.futureCommercialAccountingDate)}
              disabled={isDisabled('futureCommercialAccountingDate')}
            />
            <StyledDateHint>
              Только для приборов коммерческого учета
            </StyledDateHint>
            <Alert name="futureCommercialAccountingDate" />
          </Form.Item>
        </StyledFormPage>

        <StyledFormPage hidden={Number(currentTabKey) !== 2}>
          {/* <Device /> */}

          <Warning
            hidden={values.isAllowed}
            title="На данной трубе уже есть такой тип устройства"
          />
          <Form.Item label="Тип прибора" style={styles.w100}>
            <SelectTT
              name="housingMeteringDeviceType"
              onChange={(value) => {
                setFieldValue('housingMeteringDeviceType', value);
              }}
              options={housingMeteringDeviceTypes}
              value={values.housingMeteringDeviceType}
              disabled={isDisabled('housingMeteringDeviceType')}
            />
            <Alert name="housingMeteringDeviceType" />
          </Form.Item>

          <Form.Item label="Модель прибора" style={styles.w49}>
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
              type="text"
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
                setFieldValue('lastCheckingDate', date.toISOString());
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
                setFieldValue('futureCheckingDate', date.toISOString());
              }}
              value={moment(values.futureCheckingDate)}
            />
          </Form.Item>

          {/*communicationPipeIds*/}

          <Form.Item label="Номер трубы" style={styles.w49}>
            <SelectTT
              name="pipeNumber"
              value={values.pipeNumber}
              options={communicationPipeIds}
              onBlur={handleBlur}
              onChange={(value) => {
                setFieldValue('pipeNumber', value);
                const pipeId = _.find(communicationPipeIds, {
                  value: value,
                });
                console.log('pipeId', pipeId);
                setFieldValue('pipeId', pipeId.pipeId);
              }}
              disabled={disable}
            />
            <Alert name="pipeNumber" />
          </Form.Item>

          {/*<Form.Item label="Номер трубы" style={styles.w49}>*/}
          {/*  <InputTT*/}
          {/*    name="pipeNumber"*/}
          {/*    type="number"*/}
          {/*    min="0"*/}
          {/*    step="1"*/}
          {/*    placeholder="Номер трубы"*/}
          {/*    value={values.pipeNumber}*/}
          {/*    onBlur={handleBlur}*/}
          {/*    onChange={handleChange}*/}
          {/*    disabled={disable}*/}
          {/*  />*/}
          {/*  <Alert name="pipeNumber" />*/}
          {/*</Form.Item>*/}

          <Form.Item label="Магистраль" style={styles.w49}>
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

        <StyledFormPage hidden={Number(currentTabKey) !== 3}>
          <Title color="black">Компонент в разработке</Title>
        </StyledFormPage>
      </StyledModalBody>
      <StyledFooter>
        <ButtonTT
          type="button"
          color="white"
          onClick={handleCancel}
          style={{ marginLeft: '16px' }}
        >
          Отмена
        </ButtonTT>
        <ButtonTT
          color="blue"
          onClick={handleNext}
          big
          hidden={currentTabKey === '3'}
          disabled={coldAndThermo}
          type="button"
          style={{ marginLeft: '16px' }}
        >
          Далее
        </ButtonTT>

        <ButtonTT
          color="blue"
          type="submit"
          hidden={currentTabKey !== '3'}
          big
          disabled={coldAndThermo}
          onClick={handleSubmitForm}
          style={{ marginLeft: '16px' }}
        >
          Добавить
        </ButtonTT>
      </StyledFooter>
    </form>
  );
};

export default AddDeviceForm;

const StyledAddress = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: var(--main-90);
`;

const StyledFormSubHeader = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 32px;
  color: var(--main-100);
`;
const StyledDateHint = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: var(--main-90);
`;

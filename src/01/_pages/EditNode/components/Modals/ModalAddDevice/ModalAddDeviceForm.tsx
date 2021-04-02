import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Divider } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import * as Yup from 'yup';
import styled from 'styled-components';
import { InputNumber } from 'formik-antd';
import {
  ButtonTT,
  DatePickerTT,
  Header,
  InputTT,
  SelectTT,
  StyledFooter,
  StyledModalBody,
  Title,
  StyledFormPage,
  styles,
} from '../../../../../tt-components';
import {
  DEFAULT_CALCULATOR,
  DEFAULT_NODE,
  housingMeteringDeviceTypes,
  isConnectedOptions,
  magistrals,
  nodeStatusList,
  resources,
} from '../../../../../tt-components/localBases';
import Tabs from '../../../../../tt-components/Tabs';
import {
  validationSchemaFlowMeter,
  validationSchemaTemperatureSensor,
} from './validationSchemas';
import {
  CalculatorResponse,
  CreateHousingMeteringDeviceRequest,
  NodeResponse,
} from '../../../../../../myApi';
import {
  TabErrorsInterface,
  TabsItemInterface,
} from '../../../../../tt-components/interfaces';
import { Formik } from 'formik';
import { Form } from 'formik-antd';
import {
  DatePickerFormik,
  InputFormik,
  InputNumberFormik,
  SelectFormik,
} from './template';
import { handleTabsBeforeFormSubmit } from '../../../../../utils/handleTabsBeforeFormSubmit';
import { addHousingMeteringDevice } from './apiModalAddDevice';

interface ModalAddDeviceFormInterface {
  handleCancel: any;
  node: NodeResponse;
  calculator: CalculatorResponse;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const ModalAddDeviceForm = ({
  node,
  calculator,
  handleCancel,
  setVisible,
}: ModalAddDeviceFormInterface) => {
  const [currentTabKey, setTab] = useState('1');
  const [validationSchema, setValidationSchema] = useState<any>(
    validationSchemaFlowMeter
  );

  const tabItems: Array<TabsItemInterface> = [
    {
      title: 'Шаг 1. Общие данные',
      key: '1',
      cb: () => setTab('1'),
    },
    {
      title: 'Шаг 2. Прибор',
      key: '2',
      cb: () => setTab('2'),
    },
    {
      title: 'Шаг 3. Документы',
      key: '3',
      cb: () => setTab('3'),
    },
  ];

  const { address, id: calculatorId } = calculator || DEFAULT_CALCULATOR;
  const { city, street, housingStockNumber, corpus } = address;
  const {
    futureCommercialAccountingDate,
    lastCommercialAccountingDate,
    nodeStatus,
    number,
    resource,
    serviceZone,
    communicationPipes,
  } = node || DEFAULT_NODE;

  const entryNumber = communicationPipes
    ? communicationPipes[0].entryNumber
    : null;

  const initialValues = {
    isConnected: isConnectedOptions[0].value,
    serialNumber: undefined,
    lastCheckingDate: moment(),
    futureCheckingDate: moment().add(3, 'years'),
    lastCommercialAccountingDate: lastCommercialAccountingDate
      ? moment(lastCommercialAccountingDate)
      : moment(),
    futureCommercialAccountingDate: futureCommercialAccountingDate
      ? moment(futureCommercialAccountingDate)
      : moment(),
    housingMeteringDeviceType: housingMeteringDeviceTypes[0].value,
    resource,
    model: undefined,
    diameter: null,
    diameterVisible: true,
    calculatorId: calculatorId,
    entryNumber,
    pipeNumber: null,
    magistral: magistrals[0].value,
    city,
    street,
    housingStockNumber,
    corpus,
    number,
    nodeStatus,
  };

  const handleSubmit = (values: any) => {
    console.log('handleSubmit', values);
    const form: CreateHousingMeteringDeviceRequest = {
      serialNumber: values.serialNumber,
      lastCheckingDate: values.lastCheckingDate,
      futureCheckingDate: values.futureCheckingDate,
      lastCommercialAccountingDate: values.lastCommercialAccountingDate,
      futureCommercialAccountingDate: values.futureCommercialAccountingDate,
      housingMeteringDeviceType: values.housingMeteringDeviceType,
      resource: values.resource,
      model: values.model,
      diameter: values.diameter,
      pipe: {
        calculatorId: calculatorId,
        entryNumber: values.entryNumber,
        pipeNumber: values.pipeNumber,
        magistral: values.magistral,
        nodeId: node.id,
      },
    };
    console.log('form', form);
    // addHousingMeteringDevice(form).then((res) => {
    //   console.log(res);
    //   setTimeout(() => {
    //     setVisible(false);
    //   }, 1000);
    // });
  };

  const tabErrors: Array<TabErrorsInterface> = [
    {
      key: '1',
      value: [''],
    },
    {
      key: '2',
      value: ['diameter', 'pipeNumber', 'serial', 'model'],
    },
    {
      key: '3',
      value: [''],
    },
  ];

  function handleBeforeSubmit(errors: any) {
    const { hasError, errorTab } = handleTabsBeforeFormSubmit(
      tabErrors,
      errors
    );
    if (hasError) {
      console.log(errors);
      setTab(errorTab);
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => handleSubmit(values)}
      render={({ values, errors, setFieldValue }) => (
        <Form>
          <StyledModalBody>
            <Header>Добавление нового ОДПУ</Header>
            <Tabs
              tabItems={tabItems}
              tabsType={'tabs'}
              activeKey={currentTabKey}
            />

            {/*First Tabs*/}
            <StyledFormPage hidden={Number(currentTabKey) !== 1}>
              <Form.Item
                name="resource"
                label="Выберите тип ресурса"
                style={styles.w49}
              >
                <SelectFormik options={resources} name="resource" disabled />
              </Form.Item>

              <Form.Item
                name="housingMeteringDeviceType"
                label="Выберите тип прибора"
                style={styles.w49}
              >
                <SelectFormik
                  options={housingMeteringDeviceTypes}
                  name="housingMeteringDeviceType"
                  onChange={(value) => {
                    // console.log(value);
                    value === 'FlowMeter'
                      ? setValidationSchema(validationSchemaFlowMeter)
                      : setValidationSchema(validationSchemaTemperatureSensor);
                    value !== 'FlowMeter'
                      ? setFieldValue('diameter', null)
                      : console.log(values.diameter);
                  }}
                />
              </Form.Item>

              <Divider style={{ margin: 0 }} />

              <SubHeader>Узел</SubHeader>

              <Form.Item
                name="isConnected"
                label="Подключение к вычислителю"
                style={styles.w49}
              >
                <SelectFormik
                  options={isConnectedOptions}
                  name="isConnected"
                  disabled
                />
              </Form.Item>

              <Form.Item
                name="calculatorId"
                label="Вычислитель, к которому подключен прибор"
                style={styles.w49}
              >
                <InputFormik name="calculatorId" disabled />
              </Form.Item>

              <Form.Item
                name="entryNumber"
                label="Номер ввода"
                style={styles.w100}
              >
                <InputFormik name="entryNumber" disabled />
              </Form.Item>

              <Form.Item name="number" label="Номер узла" style={styles.w49}>
                <InputFormik name="number" disabled />
              </Form.Item>

              <Form.Item
                name="nodeStatus"
                label="Статус узла"
                style={styles.w49}
              >
                <SelectFormik
                  name="nodeStatus"
                  options={nodeStatusList}
                  disabled
                />
              </Form.Item>

              <Form.Item
                name="lastCommercialAccountingDate"
                label="Дата начала Акта действия допуска"
                style={styles.w49}
              >
                <DatePickerFormik
                  name="lastCommercialAccountingDate"
                  format="DD.MM.YYYY"
                  allowClear={false}
                  disabled
                />
              </Form.Item>

              <Form.Item
                name="futureCommercialAccountingDate"
                label="Дата окончания Акта действия допуска"
                style={styles.w49}
              >
                <DatePickerFormik
                  name="futureCommercialAccountingDate"
                  format="DD.MM.YYYY"
                  allowClear={false}
                  disabled
                />
              </Form.Item>
            </StyledFormPage>

            {/* Second Tabs */}
            <StyledFormPage hidden={Number(currentTabKey) !== 2}>
              <Form.Item
                name="housingMeteringDeviceType"
                label="Выберите тип прибора"
                style={styles.w100}
              >
                <SelectFormik
                  name="housingMeteringDeviceType"
                  options={housingMeteringDeviceTypes}
                  disabled
                />
              </Form.Item>

              <Form.Item
                name="model"
                label="Выберите модель прибора"
                style={styles.w49}
              >
                <InputFormik name="model" />
              </Form.Item>

              <Form.Item
                name="serialNumber"
                label="Серийный номер"
                style={styles.w49}
              >
                <InputFormik name="serialNumber" />
              </Form.Item>

              {values.housingMeteringDeviceType === 'FlowMeter' ? (
                <Form.Item
                  name="diameter"
                  label="Диаметр трубы (мм)"
                  style={styles.w100}
                >
                  <InputNumberFormik name="diameter" min={0} step={1} />
                </Form.Item>
              ) : null}

              <Form.Item
                name="lastCheckingDate"
                label="Дата поверки"
                style={styles.w49}
              >
                <DatePickerFormik
                  name="lastCheckingDate"
                  format="DD.MM.YYYY"
                  allowClear={false}
                />
              </Form.Item>

              <Form.Item
                name="futureCheckingDate"
                label="Дата следующей поверки"
                style={styles.w49}
              >
                <DatePickerFormik
                  name="futureCheckingDate"
                  format="DD.MM.YYYY"
                  allowClear={false}
                />
              </Form.Item>

              <Form.Item
                name="pipeNumber"
                label="Номер трубы"
                style={styles.w49}
              >
                <InputNumberFormik name="pipeNumber" />
              </Form.Item>

              <Form.Item name="magistral" label="Магистраль" style={styles.w49}>
                <SelectFormik name="magistral" options={magistrals} />
              </Form.Item>
            </StyledFormPage>

            {/* Third Tabs */}
            <StyledFormPage hidden={Number(currentTabKey) !== 3}>
              <Title color="black">Компонент в разработке</Title>
            </StyledFormPage>
          </StyledModalBody>
          <StyledFooter>
            <ButtonTT
              color="blue"
              onClick={() => {
                console.log(currentTabKey);
                setTab((prevState) => String(Number(prevState) + 1));
              }}
              big
              hidden={currentTabKey === '3'}
              style={{ marginLeft: 16 }}
              type="button"
            >
              Далее
            </ButtonTT>

            <ButtonTT
              color="blue"
              type="submit"
              onClick={() => {
                handleBeforeSubmit(errors);
              }}
              hidden={currentTabKey !== '3'}
              style={{ marginLeft: 16 }}
              big
            >
              Добавить
            </ButtonTT>
            <ButtonTT
              type="button"
              color="white"
              onClick={handleCancel}
              style={{ marginLeft: 16 }}
            >
              Отмена
            </ButtonTT>
          </StyledFooter>
        </Form>
      )}
    />
  );
};

export default ModalAddDeviceForm;

const SubHeader = styled.h3`
  margin: 0;
  padding: 0;
  width: 100%;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 32px;
`;

// const devices =
//   communicationPipes ||
//   [].map((communicationPipe) => {
//     const { devices } = communicationPipe;
//     return (
//       devices ||
//       [].map((device) => {
//         return device;
//       })
//     );
//   });
// const res = _.flatten(devices);
// const entryNumbers =
//   res ||
//   [].map((item) => {
//     const { hub } = item;
//     const { entryNumber } = hub;
//     return entryNumber;
//   });

{
  /*<SubHeader>Адрес установки</SubHeader>*/
}

{
  /*<Form.Item name="city" label="Город" style={styles.w49}>*/
}
{
  /*  <InputTT placeholder="Нижнекамск" />*/
}
{
  /*</Form.Item>*/
}

{
  /*<Form.Item label="Улица" name="street" style={styles.w49}>*/
}
{
  /*  <InputTT placeholder="Пр Мира" />*/
}
{
  /*</Form.Item>*/
}

{
  /*<Form.Item label="Дом" name="housingStockNumber" style={styles.w49}>*/
}
{
  /*  <InputTT />*/
}
{
  /*</Form.Item>*/
}

{
  /*<Form.Item name="corpus" label="Корпус" style={styles.w49}>*/
}
{
  /*  <InputTT />*/
}
{
  /*</Form.Item>*/
}

{
  /*<Divider style={{ margin: 0 }} />*/
}

import React, { Dispatch, SetStateAction, useState } from 'react';
import { Divider } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import styled from 'styled-components';
import {
  ButtonTT,
  Header,
  StyledFooter,
  StyledModalBody,
  Title,
  StyledFormPage,
  styles,
} from '../../../../../tt-components';
import {
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
  CreatePipeHousingMeteringDeviceRequest,
  PipeNodeResponse,
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
import Warning from '../../../../../tt-components/Warning';

interface ModalAddDeviceFormInterface {
  handleCancel: any;
  node: PipeNodeResponse;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const ModalAddDeviceForm = ({
  node,
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

  const tabErrors: Array<TabErrorsInterface> = [
    {
      key: '1',
      value: ['housingMeteringDeviceType'],
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

  // const { id: calculatorId } = calculator || DEFAULT_CALCULATOR;
  const {
    futureCommercialAccountingDate,
    lastCommercialAccountingDate,
    nodeStatus,
    number,
    resource,
    communicationPipes,
    address,
    calculatorId,
  } = node || DEFAULT_NODE;

  const entryNumber = communicationPipes?.length
    ? communicationPipes[0].entryNumber
    : null;

  const allDevices = _.flatten(
    communicationPipes?.map((communicationPipe) => {
      const { devices } = communicationPipe;
      return devices;
    })
  );

  const initialValues = {
    isConnected: isConnectedOptions[0].value,
    serialNumber: undefined,
    lastCheckingDate: moment().toISOString(true),
    futureCheckingDate: moment().add(3, 'years').toISOString(true),
    lastCommercialAccountingDate: lastCommercialAccountingDate
      ? moment(lastCommercialAccountingDate).toISOString(true)
      : moment().toISOString(true),
    futureCommercialAccountingDate: futureCommercialAccountingDate
      ? moment(futureCommercialAccountingDate).toISOString(true)
      : moment().toISOString(true),
    housingMeteringDeviceType: undefined,
    resource,
    model: undefined,
    diameter: null,
    diameterVisible: true,
    calculatorId: calculatorId,
    entryNumber,
    pipeNumber: null,
    magistral: magistrals[0].value,
    number,
    nodeStatus: nodeStatus?.value,
    coldWaterWarningHidden: true,
  };

  const handleSubmit = (values: any) => {
    const form: CreatePipeHousingMeteringDeviceRequest = {
      serialNumber: values.serialNumber,
      lastCheckingDate: moment(values.lastCheckingDate).toISOString(true),
      futureCheckingDate: moment(values.futureCheckingDate).toISOString(true),
      housingMeteringDeviceType: values.housingMeteringDeviceType,
      resource: values.resource,
      model: values.model,
      diameter:
        values.housingMeteringDeviceType === 'FlowMeter'
          ? values.diameter
          : null,
      pipe: {
        // calculatorId: calculatorId,
        pipeNumber: values.pipeNumber,
        magistral: values.magistral,
        nodeId: node.id,
      },
    };
    addHousingMeteringDevice(form).then(() => {
      setTimeout(() => {
        setVisible(false);
      }, 1000);
    });
  };

  function handleBeforeSubmit(errors: any) {
    const { hasError, errorTab } = handleTabsBeforeFormSubmit(
      tabErrors,
      errors
    );
    if (hasError) {
      setTab(errorTab);
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => handleSubmit(values)}
      render={({ values, errors, setFieldValue }) => {
        const coldWaterValidation = (housingMeteringDeviceType: string) => {
          const hasNodeFlowMeters = _.find(allDevices, {
            housingMeteringDeviceType: 'FlowMeter',
          });

          resource === 'ColdWaterSupply' &&
          hasNodeFlowMeters &&
          housingMeteringDeviceType === 'FlowMeter'
            ? setFieldValue('coldWaterWarningHidden', false)
            : setFieldValue('coldWaterWarningHidden', true);
        };

        return (
          <Form>
            <StyledModalBody>
              <Header>Добавление нового ОДПУ</Header>
              <Tabs
                tabItems={tabItems}
                tabsType={'tabs'}
                activeKey={currentTabKey}
              />

              <StyledFormPage hidden={Number(currentTabKey) !== 1}>
                <Warning
                  style={styles.w100}
                  title={
                    'Нельзя добавить еще один расходомер холодной воды в узле'
                  }
                  hidden={values.coldWaterWarningHidden}
                />
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
                      value === 'FlowMeter'
                        ? setValidationSchema(validationSchemaFlowMeter)
                        : setValidationSchema(
                            validationSchemaTemperatureSensor
                          );
                      value !== 'FlowMeter' && setFieldValue('diameter', null);
                      coldWaterValidation(value);
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

                {/*<Form.Item*/}
                {/*  name="calculatorId"*/}
                {/*  label="Вычислитель, к которому подключен прибор"*/}
                {/*  style={styles.w49}*/}
                {/*>*/}
                {/*  <InputFormik name="calculatorId" disabled />*/}
                {/*</Form.Item>*/}

                {/*<Form.Item*/}
                {/*  name="entryNumber"*/}
                {/*  label="Номер ввода"*/}
                {/*  style={styles.w100}*/}
                {/*>*/}
                {/*  <InputFormik name="entryNumber" disabled />*/}
                {/*</Form.Item>*/}

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

                <Form.Item
                  name="magistral"
                  label="Магистраль"
                  style={styles.w49}
                >
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
                disabled={!values.coldWaterWarningHidden}
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
        );
      }}
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

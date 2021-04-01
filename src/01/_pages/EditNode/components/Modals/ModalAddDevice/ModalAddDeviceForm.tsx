import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Form, Divider } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
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
  isConnected,
  magistrals,
  nodeStatusList,
  resources,
} from '../../../../../tt-components/localBases';
import TabsComponent from './Tabs';
import {
  validationSchemaFlowMeter,
  validationSchemaTemperatureSensor,
} from './validationSchemas';
import { addOdpu } from './apiModalAddDevice';
import { EditNodeContext, EditNodeContextInterface } from '../../../Context';
import { CalculatorResponse, NodeResponse } from '../../../../../../myApi';

interface ModalAddDeviceFormInterface {
  handleCancel: any;
  node: NodeResponse;
  calculator: CalculatorResponse;
}

const ModalAddDeviceForm = ({
  node,
  calculator,
  handleCancel,
}: ModalAddDeviceFormInterface) => {
  const [currentTabKey, setTab] = useState('1');
  const [validationSchema, setValidationSchema] = useState(Yup.object({}));
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    setValidationSchema(validationSchemaFlowMeter);
  }, []);

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

  const devices =
    communicationPipes ||
    [].map((communicationPipe) => {
      const { devices } = communicationPipe;
      return (
        devices ||
        [].map((device) => {
          return device;
        })
      );
    });
  const res = _.flatten(devices);
  const entryNumbers =
    res ||
    [].map((item) => {
      const { hub } = item;
      const { entryNumber } = hub;
      return entryNumber;
    });

  function handleChangeTab(value: string) {
    setTab(value);
  }

  function handleNext() {
    setTab(String(Number(currentTabKey) + 1));
  }

  const onFinish = () => {
    console.log('onFinish');

    // const form = {
    //   serialNumber: values.serialNumber,
    //   lastCheckingDate: values.lastCheckingDate,
    //   futureCheckingDate: values.futureCheckingDate,
    //   lastCommercialAccountingDate: values.lastCommercialAccountingDate,
    //   futureCommercialAccountingDate: values.futureCommercialAccountingDate,
    //   documentsIds: [],
    //   housingMeteringDeviceType: values.housingMeteringDeviceType,
    //   resource: values.resource,
    //   model: values.model,
    //   diameter: Number(values.diameter),
    //   pipe: {
    //     calculatorId: values.calculatorId,
    //     entryNumber: values.entryNumber,
    //     pipeNumber: values.pipeNumber,
    //     magistral: values.magistral,
    //   },
    // };
    // addOdpu(form).then((res) => {
    //   // setTimeout(() => { setAddOdpu(false); }, 1000);
    // });
  };

  const onFinishFailed = () => {
    console.log('onFinishFailed');
  };

  const [form] = Form.useForm();
  const {
    setFieldsValue,
    getFieldsValue,
    getFieldValue,
    validateFields,
    getFieldsError,
  } = form;

  const initialValues = {
    isConnected: isConnected[0].value,
    serialNumber: '120220211643',
    lastCheckingDate: moment(),
    futureCheckingDate: moment().add(3, 'years'),
    lastCommercialAccountingDate: lastCommercialAccountingDate
      ? moment(lastCommercialAccountingDate)
      : moment(),
    futureCommercialAccountingDate: futureCommercialAccountingDate
      ? moment(futureCommercialAccountingDate)
      : moment(),
    documentsIds: [],
    ipV4: '',
    deviceAddress: null,
    port: null,
    housingMeteringDeviceType: housingMeteringDeviceTypes[0].value,
    resource,
    model: 'COLD 12022021',
    diameter: null,
    calculatorId: calculatorId ?? null,
    entryNumber: null,
    pipeNumber: null,
    magistral: magistrals[0].value,
    city,
    street,
    housingStockNumber,
    corpus,
    number,
    nodeStatus,
  };

  const handleSwitch = (event: boolean) => {
    // setSubscription((prevState) => !prevState);
  };

  const onChange = (allFields: any) => {
    console.log('allFields', allFields);
  };
  const onFormLayoutChange = (currentField: any, allFields: any) => {
    // formHasErrors() ? setIsPeriodDisabled(true) : setIsPeriodDisabled(false);
  };
  return (
    <Form
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      form={form}
      requiredMark={false}
      onFieldsChange={(_, allFields) => {
        onChange(allFields);
      }}
      onValuesChange={onFormLayoutChange}
      scrollToFirstError
    >
      <StyledModalBody>
        <Header>Добавление нового ОДПУ</Header>
        <TabsComponent
          currentTabKey={currentTabKey}
          handleChangeTab={handleChangeTab}
        />
        {/*First Tabs*/}
        <StyledFormPage hidden={Number(currentTabKey) !== 1}>
          <Form.Item
            name="resource"
            label="Выберите тип ресурса"
            rules={[{ required: true, message: 'Выберите тип ресурса' }]}
            style={styles.w49}
          >
            <SelectTT options={resources} disabled />
          </Form.Item>

          <Form.Item
            name="housingMeteringDeviceType"
            label="Выберите тип прибора"
            rules={[{ required: true, message: 'Выберите тип прибора' }]}
            style={styles.w49}
          >
            <SelectTT options={housingMeteringDeviceTypes} />
          </Form.Item>

          <Divider style={{ margin: 0 }} />

          {/*<SubHeader>Адрес установки</SubHeader>*/}

          {/*<Form.Item name="city" label="Город" style={styles.w49}>*/}
          {/*  <InputTT placeholder="Нижнекамск" />*/}
          {/*</Form.Item>*/}

          {/*<Form.Item label="Улица" name="street" style={styles.w49}>*/}
          {/*  <InputTT placeholder="Пр Мира" />*/}
          {/*</Form.Item>*/}

          {/*<Form.Item label="Дом" name="housingStockNumber" style={styles.w49}>*/}
          {/*  <InputTT />*/}
          {/*</Form.Item>*/}

          {/*<Form.Item name="corpus" label="Корпус" style={styles.w49}>*/}
          {/*  <InputTT />*/}
          {/*</Form.Item>*/}

          {/*<Divider style={{ margin: 0 }} />*/}

          <SubHeader>Узел</SubHeader>

          <Form.Item
            name="isConnected"
            label="Подключение к вычислителю"
            style={styles.w49}
          >
            <SelectTT options={isConnected} disabled />
          </Form.Item>

          <Form.Item
            name="calculatorId"
            label="Вычислитель, к которому подключен прибор"
            style={styles.w49}
          >
            <InputTT disabled />
          </Form.Item>

          <Form.Item name="entryNumber" label="Номер ввода" style={styles.w100}>
            <InputTT placeholder="Номер ввода" />
          </Form.Item>

          <Form.Item name="number" label="Номер узла" style={styles.w49}>
            <InputTT placeholder="Номер узла" disabled />
          </Form.Item>

          <Form.Item name="nodeStatus" label="Статус узла" style={styles.w49}>
            <SelectTT options={nodeStatusList} disabled />
          </Form.Item>

          <Form.Item
            name="lastCommercialAccountingDate"
            label="Дата начала Акта действия допуска"
            style={styles.w49}
          >
            <DatePickerTT
              format="DD.MM.YYYY"
              placeholder="Укажите дату..."
              allowClear={false}
              disabled
            />
          </Form.Item>

          <Form.Item
            name="futureCommercialAccountingDate"
            label="Дата окончания Акта действия допуска"
            style={styles.w49}
          >
            <DatePickerTT
              format="DD.MM.YYYY"
              placeholder="Укажите дату..."
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
            <SelectTT options={housingMeteringDeviceTypes} disabled />
          </Form.Item>

          <Form.Item
            name="model"
            label="Выберите модель прибора"
            style={styles.w49}
          >
            <InputTT />
          </Form.Item>

          <Form.Item
            name="serialNumber"
            label="Серийный номер"
            style={styles.w49}
          >
            <InputTT />
          </Form.Item>

          {getFieldValue('housingMeteringDeviceType') === 'FlowMeter' ? (
            <Form.Item label="Диаметр трубы (мм)" style={styles.w100}>
              <InputTT
                name="diameter"
                placeholder="Укажите диаметр трубы в мм"
              />
            </Form.Item>
          ) : null}

          <Form.Item
            name="lastCheckingDate"
            label="Дата поверки"
            style={styles.w49}
          >
            <DatePickerTT
              format="DD.MM.YYYY"
              placeholder="Укажите дату..."
              allowClear={false}
            />
          </Form.Item>

          <Form.Item
            name="futureCheckingDate"
            label="Дата следующей поверки"
            style={styles.w49}
          >
            <DatePickerTT
              format="DD.MM.YYYY"
              placeholder="Укажите дату..."
              allowClear={false}
            />
          </Form.Item>

          <Form.Item name="pipeNumber" label="Номер трубы" style={styles.w49}>
            <InputTT type="number" min="0" step="1" placeholder="Номер трубы" />
          </Form.Item>

          <Form.Item name="magistral" label="Магистраль" style={styles.w49}>
            <SelectTT
              placeholder="Выберите направление магистрали"
              options={magistrals}
            />
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
          onClick={handleNext}
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

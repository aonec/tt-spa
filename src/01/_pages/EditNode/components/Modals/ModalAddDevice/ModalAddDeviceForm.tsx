import React, { useEffect, useState } from 'react';
import { Form, Divider } from 'antd';
import _ from 'lodash';
import moment from 'moment';
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
import Tabs from '../../../../../tt-components/Tabs';
import {
  validationSchemaFlowMeter,
  validationSchemaTemperatureSensor,
} from './validationSchemas';
import {
  CalculatorResponse,
  NodeResponse,
  UpdateHousingMeteringDeviceRequest,
} from '../../../../../../myApi';
import { TabsItemInterface } from '../../../../../tt-components/interfaces';

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
    ipV4: '',
    deviceAddress: null,
    port: null,
    housingMeteringDeviceType: housingMeteringDeviceTypes[0].value,
    resource,
    model: 'COLD 12022021',
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

  const onFinish = () => {
    console.log('onFinish');

    const form: UpdateHousingMeteringDeviceRequest = {
      serialNumber: getFieldValue('serialNumber'),
      lastCheckingDate: getFieldValue('lastCheckingDate'),
      futureCheckingDate: getFieldValue('futureCheckingDate'),
      lastCommercialAccountingDate: getFieldValue(
        'lastCommercialAccountingDate'
      ),
      futureCommercialAccountingDate: getFieldValue(
        'futureCommercialAccountingDate'
      ),
      housingMeteringDeviceType: getFieldValue('housingMeteringDeviceType'),
      resource: getFieldValue('resource'),
      model: getFieldValue('model'),
      diameter: getFieldValue('diameter'),
      pipe: {
        calculatorId: getFieldValue('calculatorId'),
        entryNumber: getFieldValue('entryNumber'),
        pipeNumber: getFieldValue('pipeNumber'),
        magistral: getFieldValue('magistral'),
        nodeId: node.id,
      },
    };
    console.log('form', form);
    console.log('node', node);
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

  const handleSwitch = (event: boolean) => {
    // setSubscription((prevState) => !prevState);
  };

  const onChange = (allFields: any) => {
    console.log('allFields', allFields);
    console.log(getFieldValue('housingMeteringDeviceType'));

    getFieldValue('housingMeteringDeviceType') === 'FlowMeter'
      ? setFieldsValue({ diameterVisible: true })
      : setFieldsValue({ diameterVisible: false });
  };
  const onFormLayoutChange = (currentField: any, allFields: any) => {
    // formHasErrors() ? setIsPeriodDisabled(true) : setIsPeriodDisabled(false);
  };

  const handleHousingMeteringDeviceType = (value: any) => {
    // console.log('value', value);
    // console.log(getFieldValue('housingMeteringDeviceType'));
    // console.log(value);
  };
  return (
    <>
      <Tabs tabItems={tabItems} tabsType={'tabs'} />
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
              <SelectTT
                options={housingMeteringDeviceTypes}
                onChange={handleHousingMeteringDeviceType}
              />
            </Form.Item>

            <Divider style={{ margin: 0 }} />

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

            <Form.Item
              name="entryNumber"
              label="Номер ввода"
              rules={[{ required: true, message: 'Выберите Номер ввода' }]}
              style={styles.w100}
            >
              <InputTT placeholder="Номер ввода" disabled />
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

            {getFieldValue('diameterVisible') ? (
              <Form.Item
                name="diameter"
                label="Диаметр трубы (мм)"
                rules={[
                  { required: true, message: 'Укажите Диаметр трубы (мм)' },
                ]}
                style={styles.w100}
              >
                <InputTT placeholder="Укажите диаметр трубы в мм" />
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

            <Form.Item
              name="pipeNumber"
              label="Номер трубы"
              rules={[
                { required: true, message: 'Укажите Диаметр трубы (мм)' },
              ]}
              style={styles.w49}
            >
              <InputTT placeholder="Номер трубы" />
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
            onClick={() => {
              console.log(currentTabKey);
              setTab('2');
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
    </>
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

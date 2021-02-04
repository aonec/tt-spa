import React, { useEffect, useRef, useState } from 'react';
import { Form } from 'antd';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import styled from 'styled-components';
import {
  resources, magistrals, housingMeteringDeviceTypes, isConnected, ipv4RegExp, serviceZoneList, nodeStatusList,
} from '../../../tt-components/localBases';
import {
  Title, SelectTT, InputTT, DatePickerTT, StyledModalBody, ButtonTT, StyledFooter, Icon, Warning, StyledModalHeader,
} from '../../../tt-components';
import TabsComponent from './Tabs';
import RelatedDevices from './RelatedDevices';
import { styles, StyledFormPage } from './styledComponents';
import { addNode } from '../apiAddNode';

const StyledHint = styled.div`
  color: rgba(39, 47, 90, 0.7)
`;

const AddNodeForm = (props) => {
  const {
    housingStock,
    addCalculator,
    setAddCalculator,
    calculators,
    currentCalculatorId,
    setCurrentCalculatorId,
    setAddOdpu,
    addOdpu,
    devices,
    setDevices,
    calculatorsExtended,
    setResource,
    entryNumber,
    setEntryNumber,
    communicationPipes,
  } = props;
  const [currentTabKey, setTab] = useState('1');
  const [disable, setDisable] = useState(false);
  const [validationSchema, setValidationSchema] = useState(Yup.object({}));

  const {
    handleSubmit, handleChange, values, touched, errors,
    handleBlur, setFieldValue, setValues,
  } = useFormik({
    initialValues: {
      resource: resources[0].value,
      number: 1,
      serviceZone: serviceZoneList[0].value,
      nodeStatus: nodeStatusList[0].value,
      lastCheckingDate: moment().toISOString(),
      futureCheckingDate: moment().add(1, 'years').toISOString(),
      isConnected: true,
      calculatorId: null,
      devices,
    },
    validationSchema,

    onSubmit: async () => {
      const communicationPipes = [];
      const communicationPipe = {
        number: values.number,
        entryNumber,
        devices,
      };

      communicationPipes.push(communicationPipe);

      const form = {
        resource: values.resource,
        number: values.number,
        serviceZone: values.serviceZone,
        nodeStatus: values.nodeStatus,
        lastCommercialAccountingDate: values.lastCommercialAccountingDate,
        futureCommercialAccountingDate: values.futureCommercialAccountingDate,
        calculatorId: values.calculatorId,
        communicationPipes,
      };
      console.log(form);
      console.log(JSON.stringify(form));
      addNode(form).then((res) => {
        console.log(res);
      });
      // addOdpu(form).then(() => {
      //   setTimeout(() => { setAddOdpu(false); }, 1000);
      // });
    },
  });

  useEffect(() => {
    setFieldValue('calculatorId', currentCalculatorId);
  }, [currentCalculatorId]);

  useEffect(() => {
    setFieldValue('devices', devices);
  }, [devices]);

  const Alert = ({ name }) => {
    const touch = _.get(touched, `${name}`);
    const error = _.get(errors, `${name}`);
    if (touch && error) {
      return (
        <div>{error}</div>
      );
    }
    return null;
  };

  function handleChangeTab(value) {
    setTab(value);
  }

  function handleNext() {
    setTab(String(Number(currentTabKey) + 1));
  }

  const entryNumberList = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
  ];

  const handleModalAddCalculator = () => {
    setAddCalculator(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <TabsComponent
        currentTabKey={currentTabKey}
        handleChangeTab={handleChangeTab}
      />

      {/* First Tab */}
      <StyledFormPage hidden={Number(currentTabKey) !== 1}>
        <Title color="black" style={styles.w100}>Общие данные</Title>
        <Form.Item label="Тип ресурса" style={styles.w49}>
          <SelectTT
            name="resource"
            onChange={(value) => {
              setFieldValue('resource', value);
              setResource(value);
            }}
            onBlur={handleBlur}
            options={resources}
            value={values.resource}
          />
          <Alert name="resource" />
        </Form.Item>

        <Form.Item label="Номер узла" style={styles.w49}>
          <InputTT
            name="number"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.number}
          />
          <Alert name="number" />
        </Form.Item>

        <Form.Item label="Зона" style={styles.w100}>
          <SelectTT
            name="serviceZone"
            onChange={(value) => {
              setFieldValue('serviceZone', value);
            }}
            onBlur={handleBlur}
            options={serviceZoneList}
            value={values.serviceZone}
          />
          <Alert name="serviceZone" />
        </Form.Item>

        <Form.Item label="Коммерческий учет показателей приборов" style={styles.w100}>
          <SelectTT
            name="nodeStatus"
            onChange={(value) => {
              setFieldValue('nodeStatus', value);
              if (value === nodeStatusList[1].value) {
                setFieldValue('futureCommercialAccountingDate', undefined);
                setFieldValue('lastCommercialAccountingDate', undefined);
              }
            }}
            onBlur={handleBlur}
            options={nodeStatusList}
            value={values.nodeStatus}
          />
          <Alert name="nodeStatus" />
        </Form.Item>
        {values.nodeStatus !== nodeStatusList[1].value ? (
          <>
            <Form.Item label="Дата начала Акта действия допуска" style={styles.w49}>
              <DatePickerTT
                format="DD.MM.YYYY"
                name="lastCommercialAccountingDate"
                placeholder="Укажите дату..."
                allowClear={false}
                onChange={(date) => {
                  setFieldValue('lastCommercialAccountingDate', date.toISOString());
                }}
                value={moment(values.lastCommercialAccountingDate)}
              />
              <Alert name="lastCommercialAccountingDate" />
            </Form.Item>

            <Form.Item label="Дата окончания Акта действия допуска" style={styles.w49}>
              <DatePickerTT
                format="DD.MM.YYYY"
                name="futureCommercialAccountingDate"
                placeholder="Укажите дату..."
                allowClear={false}
                onChange={(date) => {
                  setFieldValue('futureCommercialAccountingDate', date.toISOString());
                }}
                value={moment(values.futureCommercialAccountingDate)}
              />
              <Alert name="futureCommercialAccountingDate" />
            </Form.Item>
          </>
        ) : null}
      </StyledFormPage>

      {/* Second Tab */}
      <StyledFormPage hidden={Number(currentTabKey) !== 2}>
        <Title color="black" style={styles.w100}>Настройки соединения</Title>
        <Form.Item label="Подключение к вычислителю" style={styles.w100}>
          <SelectTT
            name="isConnected"
            onChange={(item) => {
              (item === false) ? setDisable(true) : setDisable(false);
              setFieldValue('isConnected', item);
            }}
            placeholder="Подключение к вычислителю"
            options={isConnected}
            value={values.isConnected}
            disabled
          />
        </Form.Item>

        <Form.Item label="Вычислитель, к которому подключен узел" style={styles.w49}>
          <SelectTT
            name="calculatorId"
            onChange={(value) => {
              setFieldValue('calculatorId', value);
              setCurrentCalculatorId(value);
            }}
            placeholder="Вычислитель, к которому подключен узел"
            options={calculators}
            value={values.calculatorId}
          />
        </Form.Item>

        <Form.Item label="&nbsp;" colon={false} style={styles.w49}>
          <ButtonTT
            style={styles.w100}
            color="white"
            type="button"
            onClick={handleModalAddCalculator}
          >
            + Создать вычислитель
          </ButtonTT>
        </Form.Item>

        <Form.Item
          label="Номер ввода"
          style={styles.w100}
        >
          <SelectTT
            name="entryNumber"
            onBlur={handleBlur}
            placeholder="Выберите номер ввода"
            onChange={(value) => {
              setFieldValue('entryNumber', value);
              setEntryNumber(value);
            }}
            options={entryNumberList}
            value={values.entryNumber}
          />
          <Alert name="entryNumber" />
        </Form.Item>
      </StyledFormPage>

      <StyledFormPage hidden={Number(currentTabKey) !== 3}>
        <Title color="black" style={styles.w100}>
          Настройки соединения
        </Title>
        <div style={styles.w100}>
          <RelatedDevices {...props} />
        </div>
        <ButtonTT
          style={{ marginTop: '24px' }}
          color="white"
          type="button"
          onClick={() => {
            setAddOdpu(true);
          }}
        >
          + Добавить прибор
        </ButtonTT>
      </StyledFormPage>

      <StyledFooter form>

        <ButtonTT
          color="blue"
          onClick={handleNext}
          big
          hidden={currentTabKey === '3'}
          type="button"
        >
          Далее
        </ButtonTT>

        <ButtonTT
          color="blue"
          type="submit"
          hidden={currentTabKey !== '3'}
          big
        >
          Создать узел
        </ButtonTT>
        {/* <ButtonTT type="button" color="white" onClick={handleCancel} style={{ marginLeft: '16px' }}> */}
        {/*  Отмена */}
        {/* </ButtonTT> */}
      </StyledFooter>
    </form>
  );
};
export default AddNodeForm;

// console.log('calculatorsExtended', calculatorsExtended);
// const currentCalculator = _.find(calculatorsExtended, { id: currentCalculatorId });
// console.log('currentCalculator', currentCalculator);
//
// const entryNumberListDraft = currentCalculator ? currentCalculator.nodes.map((node, index) => {
//   const { communicationPipes } = node;
//   const communicationPipesArr = communicationPipes.map((communicationPipe, index) => {
//     const { entryNumber } = communicationPipe;
//     console.log('entryNumber', entryNumber);
//     return {value: entryNumber, label: entryNumber}
//   });
//   return communicationPipesArr
// }) : [];
//
// const entryNumberList =_.uniqBy(_.flatten(entryNumberListDraft), function (e) {
//   return e.value;
// }).sort()

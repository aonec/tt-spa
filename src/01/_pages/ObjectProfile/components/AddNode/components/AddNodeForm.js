import React, { useEffect, useRef, useState } from 'react';
import { Form } from 'antd';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import styled from 'styled-components';
import {
  resources, magistrals, housingMeteringDeviceTypes, isConnected, ipv4RegExp, serviceZoneList, nodeStatusList,
} from '../../../../../tt-components/localBases';
import {
  Title, SelectTT, InputTT, DatePickerTT, StyledModalBody, ButtonTT, StyledFooter, Icon, Warning, StyledModalHeader,
} from '../../../../../tt-components';
import { addOdpu, getCalculator } from '../apiAddNode';
import TabsComponent from './Tabs';

import { styles, StyledFormPage } from './styledComponents';
import { handleTabsBeforeFormSubmit } from '../../../../../utils/handleTabsBeforeFormSubmit';
import Complete from './AutoComplete';
import SearchInputAndAdd from './AutoComplete';

const StyledHint = styled.div`
  color: rgba(39, 47, 90, 0.7)
`;

const AddNodeForm = (props) => {
  const { calculators, handleCancel, setAddOdpu } = props;
  const [currentTabKey, setTab] = useState('1');
  const [calculator, setCalculator] = useState();
  const [coldandthermo, setColdandthermo] = useState(false);
  const [disable, setDisable] = useState(false);
  const [validationSchema, setValidationSchema] = useState(Yup.object({}));

  const validationSchemaFlowMeter = Yup.object({
    model: Yup.string().min(3, 'Модель должна быть длиннее трех символов').required('Введите модель'),
    serialNumber: Yup.string().min(3, 'Серийный номер должен быть длиннее трех символов').required('Введите серийный номер'),
    calculatorId: Yup.number().typeError('Вы не выбрали вычислитель').required('Выберите вычислитель'),
    entryNumber: Yup.number().min(0).max(10, 'Укажите число до 10').typeError('Введите число, значение не может быть пустым')
      .required('Введите номер'),
    pipeNumber: Yup.number().min(0).max(10, 'Укажите число до 10').typeError('Введите число, значение не может быть пустым')
      .required('Введите номер'),
    diameter: Yup.number().min(1, 'от 1').max(150, 'до 150').typeError('Нельзя оставлять пустое значение')
      .required('Введите число от 1'),
  });
  const validationSchemaTemperatureSensor = Yup.object({
    model: Yup.string().min(3, 'Модель должна быть длиннее трех символов').required('Введите модель'),
    serialNumber: Yup.string().min(3, 'Серийный номер должен быть длиннее трех символов').required('Введите серийный номер'),
    calculatorId: Yup.number().typeError('Вы не выбрали вычислитель').required('Выберите вычислитель'),
    entryNumber: Yup.number().min(0).max(10, 'Укажите число до 10').typeError('Введите число, значение не может быть пустым')
      .required('Введите номер'),
    pipeNumber: Yup.number().min(0).max(10, 'Укажите число до 10').typeError('Введите число, значение не может быть пустым')
      .required('Введите номер'),
  });

  const {
    handleSubmit, handleChange, values, touched, errors,
    handleBlur, setFieldValue, setValues,
  } = useFormik({
    initialValues: {
      resource: resources[0].value,
      number: null,
      serviceZone: serviceZoneList[0].value,
      nodeStatus: nodeStatusList[0].value,
      lastCommercialAccountingDate: moment().toISOString(),
      futureCommercialAccountingDate: moment().add(1, 'years').toISOString(),
      isConnected: true,
    },
    validationSchema,

    onSubmit: async () => {
      const form = {
        resource: values.resource,
        number: values.number,
        serviceZone: values.serviceZone,
        nodeStatus: values.nodeStatus,
        lastCommercialAccountingDate: values.lastCommercialAccountingDate,
        futureCommercialAccountingDate: values.futureCommercialAccountingDate,
      };
      console.log(form);
      console.log(JSON.stringify(form));
      // addOdpu(form).then(() => {
      //   setTimeout(() => { setAddOdpu(false); }, 1000);
      // });
    },
  });

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

  const entryNumberList = [{ value: 1, label: 1 },
    { value: 3, label: 3 },
    { value: 5, label: 5 }];

  return (
    <form
      id="formikFormAddOdpu"
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <StyledModalBody>
        <StyledModalHeader size="middle" color="black">
          Добавление нового узла
        </StyledModalHeader>
        {/* <Warning hidden={!coldandthermo} title="Для данного узла не предусмотрено наличие термодатчика. Проверьте выбранный ресурс." /> */}
        <TabsComponent
          currentTabKey={currentTabKey}
          handleChangeTab={handleChangeTab}
        />

        {/* First Tab */}
        <StyledFormPage hidden={Number(currentTabKey) !== 1}>
          <Form.Item label="Тип ресурса" style={styles.w49}>
            <SelectTT
              name="resource"
              onChange={(value) => {
                setFieldValue('resource', value);
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
          <Form.Item label="Подключение к вычислителю" style={styles.w49}>
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

          <Form.Item label="Подключение к вычислителю" style={styles.w49}>
            <SearchInputAndAdd />
          </Form.Item>

          <ButtonTT color="white" small>
            + Создать вычислитель
          </ButtonTT>

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
              }}
              options={entryNumberList}
              value={values.entryNumber}
            />
            <Alert name="entryNumber" />
          </Form.Item>

          <hr align="center" width="100%" size="1" color="#DCDEE4" />

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
              }}
              options={entryNumberList}
              value={values.entryNumber}
            />
            <Alert name="entryNumber" />
          </Form.Item>

        </StyledFormPage>

        <StyledFormPage hidden={Number(currentTabKey) !== 3}>
          <Form.Item label="Номер ввода" style={styles.w49}>
            <InputTT
              name="entryNumber"
              type="number"
              onBlur={handleBlur}
              placeholder="Номер ввода"
              value={values.entryNumber}
              onChange={handleChange}
              disabled={disable}
            />
            <Alert name="entryNumber" />
          </Form.Item>

          <Form.Item label="Номер узла" style={styles.w49}>
            <InputTT
              name="hubNumber"
              type="number"
              placeholder="Номер узла"
              onBlur={handleBlur}
              value={values.hubNumber}
              onChange={handleChange}
              disabled={disable}
            />
            <Alert name="hubNumber" />
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
      </StyledModalBody>
      <StyledFooter>

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
          form="formikFormAddOdpu"
          hidden={currentTabKey !== '3'}
          big
        >
          Добавить
        </ButtonTT>
        <ButtonTT type="button" color="white" onClick={handleCancel} style={{ marginLeft: '16px' }}>
          Отмена
        </ButtonTT>
      </StyledFooter>
    </form>
  );
};

export default AddNodeForm;

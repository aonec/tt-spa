import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import _ from 'lodash';
import { useFormik } from 'formik';
import { Form } from 'antd';
import moment from 'moment';
import {
  housingMeteringDeviceTypes,
  magistrals,
  resources,
} from '../../../tt-components/localBases';
import {
  ButtonTT,
  DatePickerTT,
  Header,
  InputTT,
  SelectTT,
  StyledFooter,
  StyledFormPage,
  styles,
} from '../../../tt-components';
import { handleTabsBeforeFormSubmit } from '../../../utils/handleTabsBeforeFormSubmit';
import {
  HousingMeteringDeviceResponse,
  MagistralType,
  UpdateHousingMeteringDeviceRequest,
} from '../../../../myApi';
import {
  validationSchemaFlowMeter,
  validationSchemaThermoSensor,
} from './editOdpuValidationSchemas';
import { AlertInterface } from '../../../tt-components/interfaces';
import { putOdpu } from './apiEditOdpu';
import { putCalculator } from '../../EditCalculator/components/apiEditCalculator';

interface FormEditODPUInterface {
  currentTabKey: string;
  device: HousingMeteringDeviceResponse;
  setTab: Dispatch<SetStateAction<string>>;
  setAlert: Dispatch<SetStateAction<boolean>>;
  setExistDevice: Dispatch<SetStateAction<any>>;
}

const FormEditODPU = ({
  currentTabKey,
  device,
  setTab,
  setAlert,
  setExistDevice,
}: FormEditODPUInterface) => {
  const { deviceId } = useParams();
  const [validationSchema, setValidationSchema] = useState<any>();

  const {
    address: { city, street, housingStockNumber, corpus },
    hubConnection: {
      hub: { entryNumber, pipeNumber, magistral },
      calculatorId,
      nodeId,
    },
    id,
    model,
    serialNumber,
    lastCommercialAccountingDate,
    futureCommercialAccountingDate,
    lastCheckingDate,
    futureCheckingDate,
    diameter,
    resource,
    housingMeteringDeviceType,
  } = device;

  const initialValues = {
    housingMeteringDeviceType,
    resource,
    model,
    serialNumber,
    lastCheckingDate: lastCheckingDate ? moment(lastCheckingDate) : null,
    futureCheckingDate: futureCheckingDate ? moment(futureCheckingDate) : null,
    lastCommercialAccountingDate: lastCommercialAccountingDate
      ? moment(lastCommercialAccountingDate)
      : null,
    futureCommercialAccountingDate: futureCommercialAccountingDate
      ? moment(futureCommercialAccountingDate)
      : null,
    calculatorId,
    entryNumber,
    diameter,
    pipeNumber,
    city,
    street,
    housingStockNumber,
    corpus,
    magistral,
    nodeId,
  };

  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    handleBlur,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: () => {
      // console.log(values);

      const magistralEnum: MagistralType = values.magistral as MagistralType;

      const form: UpdateHousingMeteringDeviceRequest = {
        serialNumber: values.serialNumber,
        lastCheckingDate: values.lastCheckingDate?.toISOString(),
        futureCheckingDate: values.futureCheckingDate?.toISOString(),
        lastCommercialAccountingDate: values.lastCommercialAccountingDate?.toISOString(),
        futureCommercialAccountingDate: values.futureCommercialAccountingDate?.toISOString(),
        housingMeteringDeviceType: values.housingMeteringDeviceType,
        resource: values.resource,
        model: values.model,
        diameter: Number(values.diameter),
        pipe: {
          calculatorId: values.calculatorId,
          entryNumber: Number(values.entryNumber),
          pipeNumber: Number(values.pipeNumber),
          magistral: magistralEnum,
          nodeId: Number(values.nodeId),
        },
      };
      putOdpu(id, form).then(({ show, id }: any) => {
        console.log('show', show);
        console.log('id', id);
        if (show) {
          setAlert(true);
          setExistDevice(id);
        }
      });

      console.log('PUT_EDIT_FORM', form);
      console.log('PUT_EDIT_FORM', JSON.stringify(form));
    },
  });

  useEffect(() => {
    housingMeteringDeviceType === 'FlowMeter'
      ? setValidationSchema(validationSchemaFlowMeter)
      : setValidationSchema(validationSchemaThermoSensor);
  }, []);

  const Alert = ({ name }: AlertInterface) => {
    const touch = _.get(touched, `${name}`);
    const error = _.get(errors, `${name}`);
    if (touch && error) {
      return <div>{error}</div>;
    }
    return null;
  };

  const tabErrors = [
    {
      key: '1',
      value: ['model', 'serialNumber', 'diameter'],
    },
    {
      key: '2',
      value: ['entryNumber', 'pipeNumber', 'calculatorId'],
    },
  ];

  function handleSubmitForm(e: any) {
    e.preventDefault();
    const { hasError, errorTab } = handleTabsBeforeFormSubmit(
      tabErrors,
      errors
    );
    if (hasError) {
      setTab(errorTab);
    } else {
      handleSubmit();
    }
  }

  console.log(device);
  return (
    <form
      onSubmit={handleSubmitForm}
      style={{ paddingBottom: 40, maxWidth: 480 }}
    >
      <StyledFormPage hidden={Number(currentTabKey) !== 1}>
        <Form.Item label="Тип прибора" style={styles.w100}>
          <SelectTT
            name="housingMeteringDeviceType"
            onChange={(event) => {
              setFieldValue('housingMeteringDeviceType', event);
            }}
            options={housingMeteringDeviceTypes}
            value={values.housingMeteringDeviceType}
            disabled
          />
          <Alert name="housingMeteringDeviceType" />
        </Form.Item>

        <Form.Item label="Тип ресурса" style={styles.w100}>
          <SelectTT
            name="resource"
            onChange={(value) => {
              setFieldValue('resource', value);
            }}
            options={resources}
            value={values.resource}
            disabled
          />
        </Form.Item>

        <Form.Item label="Модель прибора" style={styles.w100}>
          <InputTT
            name="model"
            placeholder="Укажите модель..."
            type="text"
            onChange={handleChange}
            value={values.model}
            onBlur={handleBlur}
          />
          <Alert name="model" />
        </Form.Item>

        <Form.Item label="Серийный номер" style={styles.w100}>
          <InputTT
            name="serialNumber"
            placeholder="Укажите серийный номер..."
            type="text"
            onChange={handleChange}
            value={values.serialNumber}
            onBlur={handleBlur}
          />
          <Alert name="serialNumber" />
        </Form.Item>

        <Form.Item label="Номер ввода" style={styles.w100}>
          <InputTT
            name="entryNumber"
            type="number"
            placeholder="Номер ввода"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.entryNumber}
          />
          <Alert name="entryNumber" />
        </Form.Item>

        <Form.Item label="Номер трубы" style={styles.w100}>
          <InputTT
            name="pipeNumber"
            type="number"
            placeholder="Номер трубы"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.pipeNumber}
          />
          <Alert name="pipeNumber" />
        </Form.Item>

        <Form.Item label="Направление магистрали" style={styles.w100}>
          <SelectTT
            name="magistral"
            options={magistrals}
            placeholder="Направление магистрали"
            onChange={(value) => {
              setFieldValue('magistral', value);
            }}
            onBlur={handleBlur}
            value={values.magistral}
          />
          <Alert name="magistral" />
        </Form.Item>

        {device.housingMeteringDeviceType !== 'TemperatureSensor' ? (
          <Form.Item label="Диаметр прибора, мм" style={styles.w100}>
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

        <Form.Item label="Дата Поверки" style={styles.w100}>
          <DatePickerTT
            format="DD.MM.YYYY"
            name="lastCheckingDate"
            placeholder="Укажите дату..."
            onChange={(date) => {
              setFieldValue('lastCheckingDate', date);
              setFieldValue('futureCheckingDate', moment(date).add(3, 'years'));
            }}
            value={values.lastCheckingDate}
          />
          <Alert name="lastCheckingDate" />
        </Form.Item>

        <Form.Item label="Дата Следующей поверки" style={styles.w100}>
          <DatePickerTT
            format="DD.MM.YYYY"
            placeholder="Укажите дату..."
            onChange={(date) => {
              setFieldValue('futureCheckingDate', date);
            }}
            value={values.futureCheckingDate}
            name="futureCheckingDate"
          />
          <Alert name="futureCheckingDate" />
        </Form.Item>

        <Form.Item
          label="Дата начала действия акта-допуска"
          style={styles.w100}
        >
          <DatePickerTT
            format="DD.MM.YYYY"
            name="lastCommercialAccountingDate"
            placeholder="Укажите дату..."
            onChange={(date) => {
              setFieldValue('lastCommercialAccountingDate', date);
            }}
            value={values.lastCommercialAccountingDate}
          />
        </Form.Item>

        <Form.Item
          label="Дата окончания действия акта-допуска"
          style={styles.w100}
        >
          <DatePickerTT
            format="DD.MM.YYYY"
            placeholder="Укажите дату..."
            onChange={(date) => {
              setFieldValue('futureCommercialAccountingDate', date);
            }}
            value={values.futureCommercialAccountingDate}
            name="futureCommercialAccountingDate"
          />
        </Form.Item>

        <Form.Item label="Город" style={styles.w100}>
          <InputTT
            name="city"
            type="text"
            placeholder="Укажите город"
            onChange={handleChange}
            value={values.city}
            disabled
          />
          <Alert name="city" />
        </Form.Item>

        <Form.Item label="Улица" style={styles.w100}>
          <InputTT
            name="street"
            type="text"
            placeholder="Укажите улицу"
            onChange={handleChange}
            value={values.street}
            disabled
          />
          <Alert name="street" />
        </Form.Item>

        <Form.Item label="Номер дома" style={styles.w100}>
          <InputTT
            name="housingStockNumber"
            type="text"
            placeholder="Укажите дом"
            onChange={handleChange}
            value={values.housingStockNumber}
            disabled
          />
          <Alert name="number" />
        </Form.Item>

        {corpus ? (
          <Form.Item label="Номер корпуса" style={styles.w100}>
            <InputTT
              name="corpus"
              type="text"
              placeholder="Номер корпуса"
              onChange={handleChange}
              value={values.corpus}
              disabled
            />
            <Alert name="corpus" />
          </Form.Item>
        ) : null}
      </StyledFormPage>

      <StyledFormPage hidden={Number(currentTabKey) !== 2}>
        <Header>Компонент в разработке</Header>
      </StyledFormPage>

      <StyledFooter form>
        <ButtonTT color="blue" style={{ marginRight: 16 }} type={'submit'}>
          Сохранить
        </ButtonTT>

        <NavLink to={`/housingMeteringDevices/${deviceId}/`}>
          <ButtonTT style={{ marginLeft: 16 }} color="white">
            Отмена
          </ButtonTT>
        </NavLink>
      </StyledFooter>
    </form>
  );
};

export default FormEditODPU;

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { Form } from 'antd';
import moment from 'moment';
import {
  entryNumberList,
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
import {
  HousingMeteringDeviceResponse,
  IndividualDeviceResponse,
  MagistralType,
  UpdateHousingMeteringDeviceRequest,
} from '../../../../myApi';
import { AlertInterface } from '../../../tt-components/interfaces';
import _ from 'lodash';

interface FormEditODPUInterface {
  currentTabKey: string;
  device: IndividualDeviceResponse;
  setTab: Dispatch<SetStateAction<string>>;
  setAlert: Dispatch<SetStateAction<boolean>>;
  setExistDevice: Dispatch<SetStateAction<any>>;
}

const IndividualDeviceEditForm = ({
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
    id,
    model,
    serialNumber,
    lastCommercialAccountingDate,
    futureCommercialAccountingDate,
    lastCheckingDate,
    futureCheckingDate,
    resource,
  } = device;

  const initialValues = {
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
    city,
    street,
    housingStockNumber,
    corpus,
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
      console.log(values);

      // const magistralEnum: MagistralType = values.magistral as MagistralType;
      //
      // const form: UpdateHousingMeteringDeviceRequest = {
      //   serialNumber: values.serialNumber,
      //   lastCheckingDate: values.lastCheckingDate?.toISOString(),
      //   futureCheckingDate: values.futureCheckingDate?.toISOString(),
      //   lastCommercialAccountingDate: values.lastCommercialAccountingDate?.toISOString(),
      //   futureCommercialAccountingDate: values.futureCommercialAccountingDate?.toISOString(),
      //   housingMeteringDeviceType: values.housingMeteringDeviceType,
      //   resource: values.resource,
      //   model: values.model,
      //   diameter: Number(values.diameter),
      //   pipe: {
      //     calculatorId: values.calculatorId,
      //     entryNumber: Number(values.entryNumber),
      //     pipeNumber: Number(values.pipeNumber),
      //     magistral: magistralEnum,
      //     nodeId: Number(values.nodeId),
      //   },
      // };
      // putOdpu(id, form).then(({ show, id: existDeviceId }: any) => {
      //   if (show) {
      //     setAlert(true);
      //     setExistDevice(existDeviceId);
      //   }
      // });

      // console.log('PUT_EDIT_FORM', form);
      // console.log('PUT_EDIT_FORM', JSON.stringify(form));
    },
  });

  const tabErrors = [
    {
      key: '1',
      value: [
        'model',
        'serialNumber',
        'entryNumber',
        'pipeNumber',
        'calculatorId',
      ],
    },
  ];

  const Alert = ({ name }: AlertInterface) => {
    const touch = _.get(touched, `${name}`);
    const error = _.get(errors, `${name}`);
    if (touch && error) {
      return <div style={{ color: 'red' }}>{error}</div>;
    }
    return null;
  };

  return (
    <form onSubmit={handleSubmit} style={{ paddingBottom: 40, maxWidth: 480 }}>
      <StyledFormPage hidden={Number(currentTabKey) !== 1}>
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
          <Alert name="resource" />
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

        <Form.Item label="Дата ввода в эксплуатацию" style={styles.w100}>
          <DatePickerTT
            format="DD.MM.YYYY"
            name="lastCommercialAccountingDate"
            placeholder="Укажите дату"
            onChange={(date) => {
              setFieldValue('lastCommercialAccountingDate', date);
            }}
            value={values.lastCommercialAccountingDate}
          />
        </Form.Item>

        <Form.Item label="Дата Поверки" style={styles.w100}>
          <DatePickerTT
            format="DD.MM.YYYY"
            name="lastCheckingDate"
            placeholder="Укажите дату..."
            onChange={(date) => {
              console.log(date);
              setFieldValue('lastCheckingDate', date);
              setFieldValue('futureCheckingDate', moment(date).add(4, 'years'));
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

export default IndividualDeviceEditForm;

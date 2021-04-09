import React from 'react';
import { Form } from 'antd';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { checkDevice } from './apiCheckDevice';
import {
  CalculatorResponse,
  CheckDeviceRequest,
  HousingMeteringDeviceResponse,
} from '../../../myApi';
import { StyledModalBody, StyledFormPage } from '../../tt-components/Modal';
import {
  DatePickerTT,
  StyledFooter,
  ButtonTT,
  styles,
} from '../../tt-components';
import { Loader } from '../../components/Loader';
import HeaderTT from '../../tt-components/HeaderTT';
import { yupDate, yupDeviceId } from '../../tt-components/yupTemplates';
import { AlertInterface } from '../../tt-components/interfaces';
import _ from 'lodash';

interface ModalCheckFormInterface {
  handleCancel: any;
  device: CalculatorResponse | HousingMeteringDeviceResponse;
}

const ModalCheckForm = ({ handleCancel, device }: ModalCheckFormInterface) => {
  const { id, lastCheckingDate, futureCheckingDate } = device;
  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    handleBlur,
    setFieldValue,
  } = useFormik({
    initialValues: {
      deviceId: id,
      lastCheckingDate: moment(lastCheckingDate),
      futureCheckingDate: moment(futureCheckingDate),
    },
    validationSchema: Yup.object({
      deviceId: yupDeviceId,
      lastCheckingDate: yupDate,
      futureCheckingDate: yupDate,
    }),
    onSubmit: async () => {
      const form: CheckDeviceRequest = {
        deviceId: values.deviceId,
        currentCheckingDate: values.lastCheckingDate.toISOString(),
        futureCheckingDate: values.futureCheckingDate.toISOString(),
      };
      console.log(form);
      console.log(JSON.stringify(form));
      checkDevice(form).then((res) => {
        setTimeout(handleCancel, 1000);
      });
    },
  });

  if (!device) return <Loader show={true} size={32} />;

  const Alert = ({ name }: AlertInterface) => {
    const touch = _.get(touched, `${name}`);
    const error = _.get(errors, `${name}`);
    if (touch && error) {
      return <div style={{ color: 'red' }}>{error}</div>;
    }
    return null;
  };

  return (
    <form onSubmit={handleSubmit}>
      <StyledModalBody>
        <StyledFormPage>
          <HeaderTT>{`Поверка вычислителя ${device.model} (${device.serialNumber})`}</HeaderTT>
          <Form.Item label="Дата последней поверки прибора" style={styles.w49}>
            <DatePickerTT
              placeholder="Укажите дату"
              format="DD.MM.YYYY"
              allowClear={false}
              onChange={(date) => {
                setFieldValue('lastCheckingDate', moment(date));
                setFieldValue(
                  'futureCheckingDate',
                  moment(date).add(3, 'years')
                );
              }}
              value={values.lastCheckingDate}
              name="lastCheckingDate"
            />
            <Alert name={'lastCheckingDate'} />
          </Form.Item>
          <Form.Item label="Дата следующей поверки прибора" style={styles.w49}>
            <DatePickerTT
              placeholder="Укажите дату"
              format="DD.MM.YYYY"
              allowClear={false}
              onChange={(date) => {
                setFieldValue('futureCheckingDate', date);
              }}
              value={values.futureCheckingDate}
              name="futureCheckingDate"
            />
            <Alert name={'futureCheckingDate'} />
          </Form.Item>
        </StyledFormPage>
      </StyledModalBody>
      <StyledFooter modal>
        <ButtonTT color="white" type="button" onClick={handleCancel}>
          Отмена
        </ButtonTT>
        <ButtonTT color="blue" style={{ marginLeft: '32px' }} type="submit">
          Сохранить изменения
        </ButtonTT>
      </StyledFooter>
    </form>
  );
};

export default ModalCheckForm;

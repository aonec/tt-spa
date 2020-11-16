import React, { useContext } from 'react';
import { Form } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  ButtonTT, DatePickerTT, InputTT, Header,
} from '../../../../../tt-components';
import { DeviceContext } from '../../../CalculatorProfile';

const ModalDeregisterForm = (props) => {
  const { handleCancel } = props;

  console.log('ModalDeregisterForm.js');
  const { deregister, setDeregister, device } = useContext(DeviceContext);
  const {model, serialNumber} = device;

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

  const Buttons = () => {
    const CancelButton = () => {
      console.log('CancelButton');
      return (
        <ButtonTT color="white"
                  onClick={handleCancel}
        >
          Отмена
        </ButtonTT>
      );
    };
    const OkButton = () => {
      console.log('OkButton');
      return (
        <ButtonTT
          color="red"
          style={{ marginLeft: '32px' }}
          type={'submit'}
          onClick={handleSubmit}
          form={'deregisterDevice'}
        >
          Снять прибор с учета
        </ButtonTT>
      );
    };
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <CancelButton />
        <OkButton />
      </div>
    );
  };
  const {
    handleSubmit, handleChange, values, touched, errors,
    handleBlur, setFieldValue,
  } = useFormik({
    initialValues: {
      closingDateTime: moment().toISOString(),
      documentsIds: [],
      deviceId: device.id,
    },
    validationSchema: Yup.object({
      deviceId: Yup.number().required('Не передан ИД устройства'),
    }),
    onSubmit: async () => {
      const form = {
        deviceId: values.deviceId,
        documentsIds: values.documentsIds,
        closingDateTime: values.closingDateTime,
      };
      console.log(form);
      alert("deregisterDevice")
      // deregisterDevice(form);
    },
  });

  return (
    <Form id={'deregisterDevice'}>
      <Header>{`Вы действительно хотите снять ${model} (${serialNumber}) с учета?`}</Header>
      <Form.Item label="Дата снятия прибора с учета">
        <DatePickerTT
          placeholder="Укажите дату"
          format="DD.MM.YYYY"
          allowClear={false}
          onChange={(date) => {
            setFieldValue('closingDateTime', date.toISOString());
          }}
          value={moment(values.closingDateTime)}
          name={'closingDateTime'}
        />
      </Form.Item>
      <Buttons />
    </Form>
  );
};

export default ModalDeregisterForm;

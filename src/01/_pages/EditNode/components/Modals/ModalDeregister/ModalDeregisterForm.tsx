import React from 'react';
import { Form } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  ButtonTT,
  DatePickerTT,
  Header,
  StyledFooter,
  StyledModalBody,
} from '../../../../../tt-components';
import { deregisterDevice } from './apiDeregisterDevice';

const ModalCalculatorDeregisterForm = ({ handleCancel, device }: any) => {
  const { model, serialNumber } = device;

  //     closingDateTime: moment().toISOString(),
  //     documentsIds: [],
  //     deviceId: device.id,

  const onFinish = () => {
    console.log('onFinish');
  };

  return (
    <Form onFinish={onFinish}>
      <StyledModalBody>
        <Header>{`Вы действительно хотите снять ${model} (${serialNumber}) с учета?`}</Header>
        <Form.Item label="Дата снятия прибора с учета">
          <DatePickerTT
            placeholder="Укажите дату"
            format="DD.MM.YYYY"
            allowClear={false}
            name="closingDateTime"
          />
        </Form.Item>
      </StyledModalBody>
      <StyledFooter modal>
        <ButtonTT type="button" color="white" onClick={handleCancel}>
          Отмена
        </ButtonTT>

        <ButtonTT
          color="red"
          style={{ marginLeft: '32px' }}
          type="submit"
          big
          form="deregisterDevice"
        >
          Снять прибор с учета
        </ButtonTT>
      </StyledFooter>
    </Form>
  );
};

// const {
//   handleSubmit,
//   handleChange,
//   values,
//   touched,
//   errors,
//   handleBlur,
//   setFieldValue,
// } = useFormik({
//   initialValues: {
//     closingDateTime: moment().toISOString(),
//     documentsIds: [],
//     deviceId: device.id,
//   },
//   validationSchema: Yup.object({
//     deviceId: Yup.number().required('Не передан ИД устройства'),
//   }),
//   onSubmit: async () => {
//     const form = {
//       deviceId: values.deviceId,
//       documentsIds: values.documentsIds,
//       closingDateTime: values.closingDateTime,
//     };
//     console.log(form);
//     deregisterDevice(form);
//     setTimeout(handleCancel, 1000);
//   },
// });
//

export default ModalCalculatorDeregisterForm;

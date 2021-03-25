import React, { Dispatch, SetStateAction, useContext } from 'react';
import { Form } from 'antd';
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
import { HousingMeteringDeviceResponse } from '../../../../../../myApi';

interface ModalDeregisterDeviceInterface {
  deregister: boolean;
  setDeregister: Dispatch<SetStateAction<boolean>>;
  device: HousingMeteringDeviceResponse;
  handleCancel: any;
}

const ModalDeregisterForm = ({
  deregister,
  setDeregister,
  device,
  handleCancel,
}: ModalDeregisterDeviceInterface) => {
  const { model, serialNumber } = device;

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
      closingDateTime: moment().toISOString(),
      documentsIds: [],
      deviceId: device.id,
    },
    validationSchema: Yup.object({
      deviceId: Yup.number().required('Не передан ИД устройства'),
    }),
    onSubmit: async () => {
      const form: FormInterface = {
        deviceId: values.deviceId,
        documentsIds: values.documentsIds,
        closingDateTime: values.closingDateTime,
      };
      console.log(form);
      deregisterDevice(form).then((res) => {
        setTimeout(handleCancel, 1000);
      });
    },
  });

  return (
    <Form id="deregisterDevice">
      <StyledModalBody>
        <Header>{`Вы действительно хотите снять ${model} (${serialNumber}) с учета?`}</Header>
        <Form.Item label="Дата снятия прибора с учета">
          <DatePickerTT
            placeholder="Укажите дату"
            format="DD.MM.YYYY"
            allowClear={false}
            onChange={(date) => {
              setFieldValue('closingDateTime', date?.toISOString());
            }}
            value={moment(values.closingDateTime)}
            name="closingDateTime"
          />
        </Form.Item>
      </StyledModalBody>
      <StyledFooter modal>
        <ButtonTT color="white" onClick={handleCancel}>
          Отмена
        </ButtonTT>
        <ButtonTT
          color="red"
          style={{ marginLeft: '32px' }}
          type="submit"
          form="deregisterDevice"
        >
          Снять прибор с учета
        </ButtonTT>
      </StyledFooter>
    </Form>
  );
};
export interface FormInterface {
  deviceId: number;
  documentsIds: Array<number>;
  closingDateTime: string;
}

export default ModalDeregisterForm;

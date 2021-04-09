import React from 'react';
import { Form } from 'antd';
import moment from 'moment';
import { deregisterDevice } from './apiDeregisterDevice';
import { StyledFooter, StyledModalBody } from '../Modal';
import { DatePickerTT } from '../DatePicker';
import Header from '../Header';
import ButtonTT from '../ButtonTT';
import { CloseDeviceRequest } from '../../../myApi';

const ModalCalculatorDeregisterForm = ({
  handleCancel,
  device,
  setVisible,
}: any) => {
  if (!device) {
    return null;
  }
  const { model, serialNumber, id } = device;

  const [form] = Form.useForm();
  const {
    setFieldsValue,
    getFieldsValue,
    getFieldValue,
    validateFields,
    getFieldsError,
  } = form;

  const initialValues = {
    closingDate: moment(),
    documentsIds: [],
    deviceId: device.id,
  };

  const onFinish = () => {
    console.log('onFinish');
    const form: CloseDeviceRequest = {
      closingDate: getFieldValue('closingDate').toISOString(),
      documentsIds: [],
      deviceId: id,
    };

    deregisterDevice(form).then((res) => {
      setTimeout(() => {
        setVisible(false);
      }, 1000);
    });
  };

  const onFinishFailed = () => {
    console.log('onFinishFailed');
  };

  return (
    <Form
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      form={form}
      requiredMark={false}
      scrollToFirstError
    >
      <StyledModalBody>
        <Header>{`Вы действительно хотите снять ${model} (${serialNumber}) с учета?`}</Header>
        <Form.Item
          label="Дата снятия прибора с учета"
          name="closingDate"
          rules={[
            { required: true, message: 'Выберите Дата снятия прибора с учета' },
          ]}
        >
          <DatePickerTT
            placeholder="Укажите дату"
            format="DD.MM.YYYY"
            allowClear={false}
          />
        </Form.Item>
      </StyledModalBody>
      <StyledFooter modal>
        <ButtonTT type="button" color="white" onClick={handleCancel}>
          Отмена
        </ButtonTT>

        <ButtonTT color="red" style={{ marginLeft: 32 }} type="submit" big>
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

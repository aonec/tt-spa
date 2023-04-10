import React from 'react';
import { Form } from 'antd';
import moment from 'moment';
import { deregisterDevice } from './apiDeregisterDevice';
import { StyledFooter, StyledModalBody } from '../Modal';
import { DatePickerTT } from '../DatePicker';
import Header from '../Header';
import { CloseDeviceRequest } from '../../../myApi';
import { Button } from 'ui-kit/Button';
import { ButtonSC } from './DerigesterForm.styled';

const ModalCalculatorDeregisterForm = ({
  handleCancel,
  device,
  setVisible,
}: any) => {
  const [form] = Form.useForm();

  if (!device) {
    return null;
  }

  const { model, serialNumber, id } = device;

  const { getFieldValue } = form;

  const initialValues = {
    closingDate: moment(),
    documentsIds: [],
    deviceId: device.id,
  };

  const onFinish = () => {
    const form: CloseDeviceRequest = {
      closingDate: getFieldValue('closingDate').toISOString(true),
      documentsIds: [],
      deviceId: id,
    };

    deregisterDevice(form).then((res) => {
      setTimeout(() => {
        setVisible(false);
      }, 1000);
    });
  };

  const onFinishFailed = () => {};

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
        <Button type="ghost" onClick={handleCancel}>
          Отмена
        </Button>

        <ButtonSC type="danger">Снять прибор с учета</ButtonSC>
      </StyledFooter>
    </Form>
  );
};

export default ModalCalculatorDeregisterForm;

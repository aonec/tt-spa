import React, { useContext, useState } from 'react';
import {
  StyledFooter,
  StyledModal,
  ButtonTT,
  StyledModalBody,
  StyledFormPage,
  RangePickerTT,
} from '../../../../tt-components';

import { Divider, Form, Radio } from 'antd';
import { StyledRadio } from '../../../../tt-components/Radio';
import moment from 'moment';
import { ObjectContext } from '../../../index';
import {
  CalculatorListResponse,
  HousingStockResponse,
  CalculatorListResponsePagedList,
} from '../../../../../myApi';
import { ModalInterface } from '../../../../tt-components/interfaces';
import Title from '01/tt-components/Title';

interface ObjectContextInterface {
  object: HousingStockResponse;
  calculators: CalculatorListResponse[] | null;
}

const ModalUnitRecord = ({ visible, setVisible }: ModalInterface) => {
  const { object, calculators }: ObjectContextInterface = useContext(
    ObjectContext
  );
  const handleCancel = () => {
    setVisible(false);
  };

  const RegistrationForm = () => {
    const [form] = Form.useForm();
    const { setFieldsValue, getFieldValue } = form;
    const [isDisabled, setIsDisabled] = useState(true);
    const onFinish = async (values: any) => {
      const begin = moment(getFieldValue('dates')[0]).format('YYYY-MM-DD');
      const end = moment(getFieldValue('dates')[1]).format('YYYY-MM-DD');

    };

    const onFinishFailed = (errorInfo: any) => {};


    const initialValues = {
      dates: [moment().startOf('month'), moment()],
    };

    return (
      <Form
        initialValues={initialValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
        requiredMark={false}
      >
        <StyledModalBody>
          <Title size="middle" color="black">
          Снятие узла с коммерческого учёта
          </Title>
          <StyledFormPage>
            <Form.Item
              label="Дата снятия с коммерческого учёта"
              name="dates"
              style={{ width: '300px' }}
            >
              <RangePickerTT
                format="DD.MM.YYYY"
                allowClear={false}
                placeholder={['Дата Начала', 'Дата окончания']}
                disabled={isDisabled}
                disabledDate={(current) => {
                  return current && current > moment();
                }}
              />
            </Form.Item>
          </StyledFormPage>
        </StyledModalBody>
        <StyledFooter modal>
          <ButtonTT
            type="button"
            color="white"
            onClick={handleCancel}
            style={{ marginLeft: '16px' }}
          >
            Отмена
          </ButtonTT>
          <ButtonTT
            color="blue"
            type="submit"
            style={{ marginLeft: '16px' }}
            big
          >
            Выгрузить отчет
          </ButtonTT>
        </StyledFooter>
      </Form>
    );
  };

  return (
    <StyledModal
      visible={visible}
      width={800}
      footer={null}
      onCancel={handleCancel}
    >
      <RegistrationForm />
    </StyledModal>
  );
};

export default ModalUnitRecord;
import React, { useContext, useState } from 'react';
import {
  StyledFooter,
  StyledModal,
  ButtonTT,
  StyledModalBody,
  StyledFormPage,
  InputTT,
  styles,
  RangePickerTT,
} from '../../../../../tt-components';

import { Divider, Form, Radio } from 'antd';
import { StyledRadio } from '../../../../../tt-components/Radio';
import moment from 'moment';
import { ObjectContext } from '../../../index';
import {
  CalculatorListResponse,
  HousingStockResponse,
} from '../../../../../../myApi';
import { downloadReport } from './apiCommonReport';
import { ModalInterface } from '../../../../../tt-components/interfaces';
import Title from '../../../../../tt-components/Title';

interface ObjectContextInterface {
  object: HousingStockResponse;
  calculators: CalculatorListResponse[] | null;
}

const ModalCommonReport = ({ visible, setVisible }: ModalInterface) => {
  const { object, calculators }: ObjectContextInterface = useContext(
    ObjectContext
  );
  const handleCancel = () => {
    setVisible(false);
  };
  const ids = calculators?.map((calculator, index) => {
    const { id } = calculator;
    return `calculatorsId[${index}]=${id}`;
  });

  const { city, street, number } = object;
  const reportName = `Сводный_отчёт_${street}_${number}.xlsx`;
  const addressString = `${city}, ${street}, ${number}`;

  const RegistrationForm = () => {
    const [form] = Form.useForm();
    const { setFieldsValue, getFieldValue } = form;
    const [isDisabled, setIsDisabled] = useState(true);
    const onFinish = (values: any) => {
      const begin = moment(getFieldValue('dates')[0]).format('YYYY-MM-DD');
      const end = moment(getFieldValue('dates')[1]).format('YYYY-MM-DD');
      const calculatorsString = ids?.join('&');

      const link = `Reports/ConsolidatedReport?${calculatorsString}&ReportType=${values.detailing}&From=${begin}&To=${end}`;

      downloadReport(link);
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };

    const onPeriodChange = (event: any) => {
      const period = event.target.value;
      switch (period) {
        case 'currentMonth':
          setFieldsValue({ dates: [moment().startOf('month'), moment()] });
          setIsDisabled(true);
          break;
        case 'previousMonth':
          setFieldsValue({
            dates: [
              moment().subtract(1, 'months').startOf('month'),
              moment().startOf('month'),
            ],
          });
          setIsDisabled(true);
          break;
        case 'customPeriod':
          setIsDisabled(false);
          break;
        default:
          alert('Не выбран период!');
      }
    };
    const initialValues = {
      name: reportName,
      address: addressString,
      period: 'currentMonth',
      dates: [moment().startOf('month'), moment()],
      detailing: 'daily',
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
            Выгрузка сводного отчёта
          </Title>
          <StyledFormPage>
            <Form.Item name="name" label="Название отчёта" style={styles.w100}>
              <InputTT readOnly />
            </Form.Item>

            <Form.Item label="Адрес" name="address" style={styles.w100}>
              <InputTT disabled />
            </Form.Item>

            <Form.Item label="Тип архива" name="period" style={styles.w49}>
              <Radio.Group onChange={(event: any) => onPeriodChange(event)}>
                <StyledRadio value="currentMonth">С начала месяца</StyledRadio>
                <StyledRadio value="previousMonth">
                  За прошлый месяц
                </StyledRadio>
                <StyledRadio value="customPeriod">
                  Произвольный период
                </StyledRadio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="Детализация отчета"
              style={styles.w49}
              name="detailing"
              rules={[
                { required: true, message: 'Укажите детализацию отчета' },
              ]}
            >
              <Radio.Group>
                <StyledRadio value="hourly">Часовая</StyledRadio>
                <StyledRadio value="daily">Суточная</StyledRadio>
              </Radio.Group>
            </Form.Item>

            <Divider />

            <Form.Item
              label="Период выгрузки"
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

export default ModalCommonReport;

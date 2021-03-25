import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  StyledFooter,
  StyledModal,
  ButtonTT,
  StyledModalBody,
  StyledFormPage,
  InputTT,
  Title,
  styles,
  RangePickerTT,
} from '../../../../../tt-components';

import { Divider, Form, Radio, Select } from 'antd';
import { StyledRadio } from '../../../../../tt-components/Radio';
import moment from 'moment';
import { ObjectContext } from '../../../index';
import {
  CalculatorListResponse,
  HousingStockResponse,
} from '../../../../../../myApi';

interface ModalPropsInterface {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

interface ObjectContextInterface {
  object: HousingStockResponse;
  calculators: CalculatorListResponse[] | null;
}

const ModalCommonReport = ({ visible, setVisible }: ModalPropsInterface) => {
  const { object, calculators }: ObjectContextInterface = useContext(
    ObjectContext
  );
  const handleCancel = () => {
    setVisible(false);
  };
  // console.log(calculators)
  const ids = calculators?.map((calculator, index) => {
    const { id } = calculator;
    return `calculatorsId[${index}]=${id}`;
  });

  const { city, street, number, corpus } = object;
  const reportName = `Сводный_отчёт_${street}_${number}.xlsx`;
  const addressString = `${city}, ${street}, ${number}`;

  const RegistrationForm = () => {
    const [form] = Form.useForm();
    const { setFieldsValue, getFieldsValue, getFieldValue } = form;
    const [isDisabled, setIsDisabled] = useState(true);
    const onFinish = (values: any) => {
      console.log('Success:', values);
      console.log('getFieldsValue', getFieldsValue(true));
      const begin = moment(getFieldValue('dates')[0]).format('YYYY-MM-DD');
      const end = moment(getFieldValue('dates')[1]).format('YYYY-MM-DD');
      const calculatorsString = ids?.join('&');
      // const link = `http://84.201.132.164:8080/api/reports/getConsolidatedReport?calculatorsId[0]=2538841&calculatorsId[1]=2538371&reportType=daily&from=2021-03-15T00:00:00Z&to=2021-03-20T23:00:00Z`
      const link = `http://84.201.132.164:8080/api/reports/getConsolidatedReport?${calculatorsString}&reportType=daily&from=${begin}T00:00:00Z&to=${end}T23:00:00Z`;
      console.log(link);
      window.open(link);
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

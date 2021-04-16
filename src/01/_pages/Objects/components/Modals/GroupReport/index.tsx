import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  StyledFooter,
  StyledModal,
  ButtonTT,
  StyledModalBody,
  StyledFormPage,
  InputTT,
  styles,
  RangePickerTT,
  SelectTT,
  StyledRadio,
  SwitchTT,
  DatePickerTT,
  MultiSelectTT,
} from '../../../../../tt-components';

import { Divider, Form, Radio } from 'antd';

import moment, { Moment } from 'moment';
import { getReports } from '../../../apiObjects';
import {
  GroupReportFormResponse,
  NodeCommercialAccountStatus,
  ResourceType,
} from '../../../../../../myApi';
import { useAsync } from '../../../../../hooks/useAsync';
import styled from 'styled-components';
import { downloadReport } from './apiGroupReport';
import Title from '../../../../../tt-components/Title';
import { ReportModalType } from '../../../ObjectsSearchForm/components/Header';

interface ModalPropsInterface {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<ReportModalType>>;
}

interface GroupReportValuesInterface {
  group: string;
  name: string;
  resource: Array<ResourceType>;
  category: NodeCommercialAccountStatus;
  dates: [Moment, Moment];
  detailing: 'daily';
  email?: string;
  contractors?: Array<Number>;
  nextDate: undefined;
  period: 'currentMonth' | 'previousMonth' | 'customPeriod';
  subscribe: boolean;
  subscribePeriod?: 'OncePerTwoWeeks' | 'OncePerMonth' | 'OncePerQuarter';
}

const ModalGroupReport = ({ visible, setVisible }: ModalPropsInterface) => {
  const { data, status, run } = useAsync<GroupReportFormResponse>();

  const handleCancel = () => {
    setVisible(undefined);
  };

  useEffect(() => {
    run(getReports());
  }, []);

  if (!data) {
    return null;
  }

  const GroupForm = () => {
    console.log('data', data);
    const [subscription, setSubscription] = useState(false);
    const [isPeriodDisabled, setIsPeriodDisabled] = useState(true);
    const reportName = `Выгрузка группового отчёта`;
    const { groupReports, nodeResourceTypes, nodeStatuses, contractors } = data;

    const groupReportsOptions = groupReports
      ? groupReports.map((group) => {
          const { houseManagementId, title, id } = group;
          return { value: id === null ? houseManagementId : id, label: title };
        })
      : [];

    const nodeResourceTypesOptions = nodeResourceTypes
      ? nodeResourceTypes.map((nodeResourceType) => {
          const { key, value } = nodeResourceType;
          return { value: key, label: value };
        })
      : [];

    const nodeStatusesOptions = nodeStatuses
      ? nodeStatuses.map((nodeStatus) => {
          const { key, value } = nodeStatus;
          return { value: key, label: value };
        })
      : [];

    const contractorsOptions = contractors
      ? contractors.map((contractor) => {
          const { id, title } = contractor;
          return { value: id, label: title };
        })
      : [];

    const [form] = Form.useForm<GroupReportValuesInterface>();
    (window as any).form = form;
    // const values = form.getFieldsValue();
    const {
      setFieldsValue,
      getFieldValue,
      getFieldsError,
      getFieldsValue,
    } = form;

    const onFinish = (values: GroupReportValuesInterface) => {
      console.log('values', values);
      const beginDay = moment(getFieldValue('dates')[0]);
      const endDay = moment(getFieldValue('dates')[1]);
      const beginDayQuery = beginDay.format('YYYY-MM-DD');
      const endDayQuery = endDay.format('YYYY-MM-DD');
      const daysCount = endDay.diff(beginDay, 'days');

      const resources = getFieldValue('resource').map(
        (item: string, index: number) => {
          return `NodeResourceType=${item}`;
        }
      );
      const resResources = resources.join('&');
      const valuess = getFieldsValue();
      debugger;

      if (daysCount >= 30 && getFieldValue('detailing') === 'hourly') {
        setVisible('currentEmailForm');
      }

      if (subscription) {
        console.log('C подпиской');
        const link = `Reports/GetGroupReport?houseManagementId=${values.group}&NodeResourceType=${resResources}&NodeStatus=${values.category}&ReportType=${values.detailing}&From=${beginDayQuery}&To=${endDayQuery}&Subscription.Email=${values.email}&Subscription.Type=${values.subscribePeriod}`;
        console.log(link);
        const fileName = 'Report.zip';
        downloadReport(link, fileName);
      }
      if (!subscription) {
        console.log('Без подписки');
        const link = `Reports/GetGroupReport?houseManagementId=${values.group}&NodeResourceType=${resResources}&NodeStatus=${values.category}&ReportType=${values.detailing}&From=${beginDayQuery}&To=${endDayQuery}`;
        console.log(link);
        const fileName = 'Report.zip';
        downloadReport(link, fileName);
      }
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };

    const onPeriodChange = (event: any) => {
      const period = event.target.value;
      switch (period) {
        case 'currentMonth':
          setFieldsValue({ dates: [moment().startOf('month'), moment()] });
          setIsPeriodDisabled(true);
          break;
        case 'previousMonth':
          setFieldsValue({
            dates: [
              moment().subtract(1, 'months').startOf('month'),
              moment().startOf('month'),
            ],
          });
          setIsPeriodDisabled(true);
          break;
        case 'customPeriod':
          setIsPeriodDisabled(false);
          break;
        default:
          setIsPeriodDisabled(true);
      }
    };
    const initialValues = {
      name: reportName,
      address: 'addressString',
      period: 'currentMonth',
      dates: [moment().startOf('month'), moment()],
      detailing: 'daily',
      hidden: true,
      subscribePeriod: 'OncePerMonth',
      nextDate: undefined,
      email: undefined,
      subscribe: false,
    };

    const handleSwitch = (event: boolean) => {
      setSubscription((prevState) => !prevState);
    };

    const onChange = (allFields: any) => {
      console.log('allFields', allFields);
    };

    const onFormLayoutChange = (currentField: any, allFields: any) => {
      formHasErrors() ? setIsPeriodDisabled(true) : setIsPeriodDisabled(false);
      // console.log("onFormLayoutChange", currentField, allFields)
      // console.log("formHasErrors", formHasErrors())
      // console.log("getFieldsError()", getFieldsError())
    };

    const formHasErrors = () =>
      getFieldsError().some((item) => item.errors.length > 0);

    return (
      <Form
        initialValues={initialValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
        requiredMark={false}
        onFieldsChange={(_, allFields) => {
          onChange(allFields);
        }}
        onValuesChange={onFormLayoutChange}
        scrollToFirstError
      >
        <StyledModalBody>
          <Title size="middle" color="black">
            Выгрузка группового отчёта
          </Title>
          <StyledFormPage>
            <Form.Item
              name="group"
              label="Группа"
              style={styles.w100}
              rules={[{ required: true, message: 'Выберите Группу' }]}
            >
              <SelectTT options={groupReportsOptions} />
            </Form.Item>

            <Form.Item name="name" label="Название отчёта" style={styles.w100}>
              <InputTT readOnly />
            </Form.Item>

            <Form.Item
              name="resource"
              label="Ресурс"
              style={styles.w49}
              rules={[{ required: true, message: 'Выберите Ресурс' }]}
            >
              <MultiSelectTT
                mode="multiple"
                options={nodeResourceTypesOptions}
              />
            </Form.Item>

            <Form.Item
              name="category"
              label="Категория узлов"
              style={styles.w49}
              rules={[{ required: true, message: 'Категория узлов' }]}
            >
              <SelectTT options={nodeStatusesOptions} />
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

            <Form.Item
              label="Период выгрузки"
              name="dates"
              style={{ width: '300px' }}
            >
              <RangePickerTT
                format="DD.MM.YYYY"
                allowClear={false}
                placeholder={['Дата Начала', 'Дата окончания']}
                disabled={isPeriodDisabled}
                disabledDate={(current) => {
                  return current && current > moment();
                }}
              />
            </Form.Item>

            <Divider />
            <div
              style={{ display: 'flex', alignItems: 'baseline', width: '100%' }}
            >
              <Form.Item name="subscribe">
                <SwitchTT
                  onChange={handleSwitch}
                  disabled={getFieldsValue().period === 'customPeriod'}
                />
              </Form.Item>
              <div style={{ paddingLeft: 16 }}>
                <SwitchHeader>Регулярная выгрузка отчёта</SwitchHeader>
                <SwitchSubheader>
                  Групповой отчёт будет приходить вам и подрядчикам на почту в
                  выбранную дату
                </SwitchSubheader>
              </div>
            </div>
          </StyledFormPage>

          <StyledFormPage hidden={!subscription}>
            <Form.Item
              label="Email"
              style={styles.w49}
              name="email"
              rules={
                subscription
                  ? [
                      {
                        required: true,
                        type: 'email',
                        message: 'введите email в формате: name@domain.ru',
                      },
                    ]
                  : [{}]
              }
            >
              <InputTT readOnly={!subscription} />
            </Form.Item>

            <Form.Item label="Подрядчики" style={styles.w49}>
              <SelectTT options={contractorsOptions} />
            </Form.Item>

            <Form.Item
              name="nextDate"
              label="Дата следующей выгрузки отчёта"
              style={styles.w49}
              required
              rules={
                subscription
                  ? [
                      {
                        required: true,
                        message: 'Дата следующей выгрузки отчёта!',
                      },
                    ]
                  : [{}]
              }
            >
              <DatePickerTT format="DD.MM.YYYY" />
            </Form.Item>

            <Form.Item
              label="Период"
              style={styles.w100}
              name="subscribePeriod"
              rules={[{ required: true, message: 'Укажите Период' }]}
            >
              <Radio.Group>
                <StyledRadio value="OncePerTwoWeeks">
                  1 раз в 2 недели
                </StyledRadio>
                <StyledRadio value="OncePerMonth">1 раз в месяц</StyledRadio>
                <StyledRadio value="OncePerQuarter">
                  1 раз в квартал
                </StyledRadio>
              </Radio.Group>
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
            htmlType="submit"
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
      {status === 'error' ? (
        <div style={{ background: 'red' }}>ОШИБКА</div>
      ) : null}
      {status === 'pending' || status === 'idle' ? (
        <div>ЗАГРУЗКА...</div>
      ) : null}
      {status === 'resolved' ? <GroupForm /> : null}
    </StyledModal>
  );
};

const SwitchHeader = styled.h4`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 32px;
  color: var(--color-primary-90);
  padding: 0;
  margin: 0;
`;
const SwitchSubheader = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: var(--color-primary-90);
`;

export default ModalGroupReport;

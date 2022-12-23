import React, { FC } from 'react';
import {
  StyledRadioGroup,
  StyledTab,
} from './ConsumptionReportCalculatorForm.styled';
import { ConsumptionReportCalculatorFormProps } from './ConsumptionReportCalculatorForm.types';
import { Form, Radio } from 'antd';
import { Tabs } from 'ui-kit/Tabs';
import { ResourceNamesDictionary } from 'services/devices/resourceAccountingSystemsService/view/ResourceAccountingSystems/NodesGroup/NodesGroup.constants';
import _ from 'lodash';
import {
  EHousingMeteringDeviceType,
  EReportFormat,
  EReportType,
  EResourceType,
} from 'myApi';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { useFormik } from 'formik';
import moment from 'moment';
import * as yup from 'yup';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { Select } from 'ui-kit/Select';
import { RangePicker } from 'ui-kit/RangePicker';

export const ConsumptionReportCalculatorForm: FC<ConsumptionReportCalculatorFormProps> = ({
  formId,
  calculator,
}) => {
  const address = calculator?.address?.address?.mainAddress;
  const reportName = `${calculator?.model}_${address?.street}_${address?.number}`;

  const nodesList = calculator?.nodes || [];
  const nodeGroups = _.groupBy(nodesList, 'resource');
  const resources = Object.keys(nodeGroups) as EResourceType[];

  const { errors, values, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      period: 'lastSevenDays',
      detail: 'daily',
      begin: moment().startOf('month'),
      end: moment(),
      nodeId: null,
      customPeriodDisabled: true,
      withNS: false,
      currentResourceType: resources[0],
      reportName: reportName,
    },
    validateOnChange: false,
    validationSchema: yup.object({
      nodeId: yup.number().typeError('Выберите Узел').required('Выберите Узел'),
    }),
    onSubmit: (data) => {
      const begin = data.begin.startOf('day').format('YYYY-MM-DD HH:mm:ss');
      const end = data.end.endOf('day').format('YYYY-MM-DD HH:mm:ss');
      const params = {
        Name: data.reportName,
        NodeId: data.nodeId,
        ReportType: data.detail as EReportType,
        From: begin,
        To: end,
        ReportFormat: data.withNS
          ? EReportFormat.Rso
          : EReportFormat.Consumption,
      };

      console.log(data);
      console.log(params);
    },
  });

  const currentGroup = nodeGroups[values.currentResourceType];

  const options = currentGroup.map((node) => {
    const { id, number, communicationPipes } = node;

    const devicesList = _.flatten(
      communicationPipes?.map((communicationPipe) => {
        const { devices } = communicationPipe;
        return devices?.filter(
          (device) =>
            device.housingMeteringDeviceType ===
            EHousingMeteringDeviceType.FlowMeter
        );
      })
    );

    const devicesString = devicesList
      .map((device) => `${device?.model} (${device?.serialNumber})`)
      .join(', ');

    const label = `Узел ${number}: ${calculator?.model} (${calculator?.serialNumber}) ${devicesString}`;

    return { value: id, label };
  });

  return (
    <Form id={formId} onSubmitCapture={handleSubmit}>
      <Tabs
        onChange={(value) => {
          setFieldValue('currentResourceType', value);
          setFieldValue('nodeId', null);
        }}
        activeKey={values.currentResourceType}
      >
        {resources &&
          resources.map((resource) => {
            const resourceName = ResourceNamesDictionary[resource];
            return (
              <Tabs.TabPane
                tab={
                  <StyledTab>
                    <ResourceIconLookup resource={resource} />
                    <div> {resourceName} </div>
                  </StyledTab>
                }
                key={resource}
              />
            );
          })}
      </Tabs>

      <FormItem label="Название отчета">
        <Input
          onChange={(value) =>
            setFieldValue('reportName', value.currentTarget.value)
          }
          value={values.reportName}
          suffix=".xlsx"
        />
      </FormItem>

      <FormItem label="Узел">
        <Select
          onChange={(value) => setFieldValue('nodeId', value)}
          value={values.nodeId || undefined}
          placeholder="Выберите узел"
          options={options}
        />
      </FormItem>

      <FormItem label="Период">
        <StyledRadioGroup
          defaultValue="currentMonth"
          size="large"
          onChange={(event) => {}}
        >
          <Radio value="lastSevenDays">Последние 7 дней</Radio>
          <Radio value="currentMonth" checked>
            С начала месяца
          </Radio>
          <Radio value="previousMonth">За прошлый месяц</Radio>
          <Radio value="customPeriod">Произвольный период</Radio>
        </StyledRadioGroup>

        <RangePicker
          format="DD.MM.YYYY"
          allowClear={false}
          onChange={() => {}}
          disabled={values.customPeriodDisabled}
        />
      </FormItem>

      <FormItem label="Детализация отчета" style={{ width: '50%' }}>
        <Radio.Group
          defaultValue="daily"
          size="large"
          onChange={(event) => {
            setFieldValue('detail', event.target.value);
          }}
        >
          <Radio value="daily" checked>
            Суточная
          </Radio>
          <Radio value="hourly">Часовая</Radio>
          <Radio value="monthly">Месячная</Radio>
        </Radio.Group>
      </FormItem>
    </Form>
  );
};

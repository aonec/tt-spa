import React, { FC } from 'react';
import {
  GridContainer,
  MarginTop,
  StyledRadioGroup,
  StyledTab,
} from './ConsumptionReportCalculatorForm.styled';
import {
  ArchiveType,
  ConsumptionReportCalculatorFormProps,
  DatePeriod,
} from './ConsumptionReportCalculatorForm.types';
import { Checkbox, Form, Radio } from 'antd';
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
import * as yup from 'yup';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { Select } from 'ui-kit/Select';
import { RangePicker } from 'ui-kit/RangePicker';
import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { getDatePeriod } from './ConsumptionReportCalculatorForm.utils';
import { ErrorMessage } from '01/shared/ui/ErrorMessage';
import { GetCalculatorReportParams } from 'services/calculators/consumptionReportCalculatorService/consumptionReportCalculatorService.types';

export const ConsumptionReportCalculatorForm: FC<ConsumptionReportCalculatorFormProps> = ({
  formId,
  calculator,
  handleSubmitForm,
  isSono,
}) => {
  const address = calculator?.address?.address?.mainAddress;
  const reportName = `${calculator?.model}_${address?.street}_${address?.number}`;

  const nodesList = calculator?.nodes || [];
  const nodeGroups = _.groupBy(nodesList, 'resource');
  const resources = Object.keys(nodeGroups) as EResourceType[];

  const nodeIdForSono = calculator?.nodes && calculator.nodes[0].id;

  const { errors, values, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      archiveType: isSono ? ArchiveType.AnyPeriod : ArchiveType.StartOfMonth,
      period: [null, null] as DatePeriod,
      detail: isSono ? EReportType.Monthly : EReportType.Daily,
      nodeId: isSono ? nodeIdForSono : null,
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
      const period = getDatePeriod(values.archiveType, values.period);

      if (!period) return;

      const { From, To } = period;

      const params: GetCalculatorReportParams = {
        Name: data.reportName,
        NodeId: data.nodeId || undefined,
        ReportType: data.detail as EReportType,
        From: From,
        To: To,
        ReportFormat: data.withNS
          ? EReportFormat.Rso
          : EReportFormat.Consumption,
      };

      handleSubmitForm(params);
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
        {!isSono && (
          <>
            <Select
              onChange={(value) => setFieldValue('nodeId', value)}
              value={values.nodeId || undefined}
              placeholder="Выберите узел"
              options={options}
            />
            <ErrorMessage>{errors.nodeId}</ErrorMessage>
          </>
        )}
        {isSono && <Input value="Sono" disabled />}
      </FormItem>

      <GridContainer>
        {!isSono && (
          <FormItem label="Период">
            <StyledRadioGroup
              value={values.archiveType}
              onChange={(value) => {
                const archiveType = value.target.value;
                setFieldValue('archiveType', archiveType);
              }}
            >
              <Radio value={ArchiveType.LastSevenDays}>Последние 7 дней</Radio>
              <Radio value={ArchiveType.StartOfMonth} checked>
                С начала месяца
              </Radio>
              <Radio value={ArchiveType.PreviousMonth}>За прошлый месяц</Radio>
              <Radio value={ArchiveType.AnyPeriod}>Произвольный период</Radio>
            </StyledRadioGroup>

            <MarginTop>
              <RangePicker
                placeholder={['Дата начала', 'Дата окончания']}
                format="DD.MM.YYYY"
                disabled={values.archiveType !== ArchiveType.AnyPeriod}
                value={values.period}
                onChange={(value) => {
                  if (!value) {
                    setFieldValue('period', [null, null]);
                    return;
                  }

                  setFieldValue('period', value);
                }}
              />
            </MarginTop>
          </FormItem>
        )}
        {isSono && (
          <FormItem label="Период">
            <StyledRadioGroup
              value={values.archiveType}
              onChange={(value) => {
                const archiveType = value.target.value;
                setFieldValue('archiveType', archiveType);
              }}
            >
              <Radio value={ArchiveType.PreviousMonth}>За прошлый месяц</Radio>
              <Radio value={ArchiveType.AnyPeriod} checked>
                Произвольный период
              </Radio>
            </StyledRadioGroup>

            <MarginTop>
              <RangePicker
                picker="month"
                format="MM.YYYY"
                placeholder={['Дата начала', 'Дата окончания']}
                disabled={values.archiveType !== ArchiveType.AnyPeriod}
                value={values.period}
                onChange={(value) => {
                  if (!value) {
                    setFieldValue('period', [null, null]);
                    return;
                  }

                  setFieldValue('period', value);
                }}
              />
            </MarginTop>
          </FormItem>
        )}

        <FormItem label="Детализация отчёта">
          <StyledRadioGroup
            defaultValue={isSono ? EReportType.Monthly : EReportType.Daily}
            onChange={(event) => {
              setFieldValue('detail', event.target.value);
            }}
          >
            {!isSono && (
              <>
                <Radio value={EReportType.Hourly}>Часовая</Radio>
                <Radio value={EReportType.Daily} checked>
                  Суточная
                </Radio>
              </>
            )}
            {isSono && (
              <Radio value={EReportType.Monthly} checked>
                Месячная
              </Radio>
            )}
          </StyledRadioGroup>
        </FormItem>
      </GridContainer>

      {!isSono && (
        <>
          <SpaceLine />
          <Checkbox
            checked={values.withNS}
            onChange={(value) => setFieldValue('withNS', value.target.checked)}
          >
            Выгрузка отчета с кодами НС
          </Checkbox>
        </>
      )}
    </Form>
  );
};

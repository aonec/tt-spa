import React, { FC } from 'react';
import { Form, Radio, Space } from 'antd';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { useFormik } from 'formik';
import { EReportType } from 'myApi';
import {
  ArchiveType,
  ConsolidatedReportFormProps,
  DatePeriod,
} from './ConsolidatedReportForm.types';
import { PeriodSelection } from './ConsolidatedReportForm.styled';
import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { RangePicker } from 'ui-kit/RangePicker';
import { getHousingStockAddress } from 'utils/getHousingStockAddress';
import { getDatePeriod } from './ConsolidatedReportForm.utils';

export const ConsolidatedReportForm: FC<ConsolidatedReportFormProps> = ({
  formId,
  housingStock,
  handleSubmit,
}) => {
  const address = housingStock.address?.mainAddress;
  const addressString = getHousingStockAddress(housingStock, true);

  const {
    values,
    setFieldValue,
    handleChange,
    handleSubmit: handleSubmitForm,
  } = useFormik({
    initialValues: {
      name: `Сводный_отчёт_${address?.street}_${address?.number}`,
      reportType: EReportType.Daily,
      period: [null, null] as DatePeriod,
      archiveType: ArchiveType.StartOfMonth,
    },
    onSubmit: (values) => {
      const period = getDatePeriod(values.archiveType, values.period);

      if (!period) return;

      const { From, To } = period;

      handleSubmit({
        Name: values.name,
        HousingStockId: housingStock.id,
        ReportType: values.reportType,
        From,
        To,
      });
    },
  });

  return (
    <Form id={formId} onSubmitCapture={handleSubmitForm}>
      <FormItem label="Название отчёта">
        <Input
          value={values.name}
          name="name"
          onChange={handleChange}
          placeholder="Введите название"
          suffix=".xlsx"
        />
      </FormItem>
      <FormItem label="Адрес">
        <Input value={addressString || ''} disabled />
      </FormItem>
      <PeriodSelection>
        <FormItem label="Тип архива">
          <Radio.Group
            value={values.archiveType}
            onChange={(value) => {
              const archiveType = value.target.value;
              setFieldValue('archiveType', archiveType);
            }}
          >
            <Space direction="vertical">
              <Radio value={ArchiveType.StartOfMonth}>С начала месяца</Radio>
              <Radio value={ArchiveType.PreviousMonth}>За прошлый месяц</Radio>
              <Radio value={ArchiveType.AnyPeriod}>Произвольный период</Radio>
            </Space>
          </Radio.Group>
        </FormItem>
        <FormItem label="Детализация отчета">
          <Radio.Group
            value={values.reportType}
            onChange={(value) =>
              setFieldValue('reportType', value.target.value)
            }
          >
            <Space direction="vertical">
              <Radio value={EReportType.Hourly}>Часовая</Radio>
              <Radio value={EReportType.Daily}>Суточная</Radio>
            </Space>
          </Radio.Group>
        </FormItem>
      </PeriodSelection>
      <SpaceLine />
      <FormItem label="Период выгрузки">
        <RangePicker
          value={values.period}
          onChange={(value) => {
            if (!value) {
              setFieldValue('period', [null, null]);
              return;
            }

            setFieldValue('period', value);
          }}
          disabled={values.archiveType !== ArchiveType.AnyPeriod}
          format="DD.MM.YYYY"
        />
      </FormItem>
    </Form>
  );
};

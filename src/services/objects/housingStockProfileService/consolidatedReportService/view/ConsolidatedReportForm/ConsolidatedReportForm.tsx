import React, { FC } from 'react';
import { Form, Radio, Space, message } from 'antd';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { useFormik } from 'formik';
import { EReportType } from 'api/myApi';
import {
  ArchiveType,
  ConsolidatedReportFormProps,
  DatePeriod,
} from './ConsolidatedReportForm.types';
import { PeriodSelection } from './ConsolidatedReportForm.styled';
import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { RangePicker } from 'ui-kit/RangePicker';
import { getBuildingAddress } from 'utils/getBuildingAddress';
import { getDatePeriod } from './ConsolidatedReportForm.utils';
import * as yup from 'yup';
import { ErrorMessage } from 'ui-kit/ErrorMessage';

export const ConsolidatedReportForm: FC<ConsolidatedReportFormProps> = ({
  formId,
  building,
  handleSubmit,
}) => {
  const address = building.address?.mainAddress;
  const addressString = getBuildingAddress(building, true);

  const {
    values,
    setFieldValue,
    handleChange,
    handleSubmit: handleSubmitForm,
    errors,
  } = useFormik({
    initialValues: {
      name: `Сводный_отчёт_${address?.street}_${address?.number}`,
      reportType: EReportType.Daily,
      period: [null, null] as DatePeriod,
      archiveType: ArchiveType.StartOfMonth,
    },
    validationSchema: yup.object().shape({
      name: yup.string().required('Введите название отчёта'),
    }),
    onSubmit: (values) => {
      const period = getDatePeriod(values.archiveType, values.period);

      if (!period) {
        message.warning('Выберите период!');
        return;
      }

      const { From, To } = period;

      handleSubmit({
        Name: values.name,
        BuildingId: building.id,
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
        <ErrorMessage>{errors.name}</ErrorMessage>
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

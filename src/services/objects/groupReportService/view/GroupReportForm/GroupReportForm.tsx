import React, { FC, useEffect, useMemo } from 'react';
import { GroupReportFormProps } from './GroupReportForm.types';
import { Form } from 'antd';
import { GroupReportRequestPayload } from '../../groupReportService.types';
import { useFormik } from 'formik';
import {
  ReportFormatRadioOptions,
  validationSchema,
} from './GroupReportForm.constants';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { Input } from 'ui-kit/Input';
import moment from 'moment';
import { RowWrapper, SelectSC } from './GroupReportForm.styled';
import { GroupReportDatesSelect } from './GroupReportDatesSelect';
import { RadioGroupSC } from './GroupReportDatesSelect/GroupReportDatesSelect.styled';
import { EReportType } from 'myApi';
import { LabeledValue } from 'antd/lib/select';

export const GroupReportForm: FC<GroupReportFormProps> = ({
  formId,
  handleDownload,
  reportFilters,
}) => {
  const { groupReports, nodeResourceTypes, nodeStatuses } = reportFilters;

  const { values, setFieldValue, handleSubmit, errors } = useFormik<
    Partial<GroupReportRequestPayload>
  >({
    initialValues: {
      Name: `Групповой_отчёт_${moment().format('DD.MM.YYYY')}`,
      ReportType: EReportType.Hourly,
    },
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) =>
      handleDownload({
        ...values,
        From: moment(values.From).format('YYYY-MM-DD'),
        To: moment(values.To).format('YYYY-MM-DD'),
      }),
  });

  const groupReportsOptions = useMemo(
    () =>
      (groupReports || []).reduce((acc, elem) => {
        if (!elem.houseManagementId) {
          return acc;
        }
        return [
          ...acc,
          {
            value: elem.houseManagementId,
            key: elem.houseManagementId,
            label: elem.title || '',
          },
        ];
      }, [] as LabeledValue[]),
    [groupReports]
  );

  const nodeResourceTypesOptions = useMemo(
    () =>
      (nodeResourceTypes || []).reduce((acc, elem) => {
        if (!elem.key) {
          return acc;
        }
        return [
          ...acc,
          {
            value: elem.key,
            key: elem.key,
            label: elem.value || '',
          },
        ];
      }, [] as LabeledValue[]),
    [nodeResourceTypes]
  );

  return (
    <Form id={formId} onSubmitCapture={handleSubmit}>
      <FormItem label="Группа">
        <Select
          value={values.HouseManagementId}
          onChange={(value) => setFieldValue('HouseManagementId', value)}
          options={groupReportsOptions}
        />
      </FormItem>
      <FormItem label="Название отчёта">
        <Input
          value={values.Name}
          onChange={(e) => setFieldValue('Name', e.currentTarget.value)}
        />
      </FormItem>
      <RowWrapper>
        <FormItem label="Ресурс">
          <SelectSC
            value={values.NodeResourceTypes}
            onChange={(value) => setFieldValue('NodeResourceTypes', value)}
            mode="multiple"
            options={nodeResourceTypesOptions}
          />
        </FormItem>

        <FormItem label="Категория узлов">
          <Select
            value={values.NodeStatus || 'All'}
            onChange={(value) => {
              if (value === 'All') {
                return setFieldValue('NodeStatus', undefined);
              }
              setFieldValue('NodeStatus', value);
            }}
          >
            {(nodeStatuses || []).map((elem) => {
              const key = elem.key || 'All';
              return (
                <Select.Option value={key} key={key}>
                  {elem.value || ''}
                </Select.Option>
              );
            })}
          </Select>
        </FormItem>
      </RowWrapper>

      <RowWrapper>
        <FormItem label="Период">
          <GroupReportDatesSelect
            value={{ From: values.From, To: values.To }}
            setValue={({ From, To }) => {
              setFieldValue('From', From);
              setFieldValue('To', To);
            }}
          />
        </FormItem>
        <FormItem label="Детализация отчёта">
          <RadioGroupSC
            options={ReportFormatRadioOptions}
            onChange={(e) => setFieldValue('ReportType', e.target.value)}
            value={values.ReportType}
          />
        </FormItem>
      </RowWrapper>
    </Form>
  );
};

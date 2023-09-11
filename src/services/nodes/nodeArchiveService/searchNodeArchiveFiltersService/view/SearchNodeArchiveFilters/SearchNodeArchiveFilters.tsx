import { Form, Select } from 'antd';
import { useFormik } from 'formik';
import dayjs from 'api/dayjs';
import { EReportType } from 'api/types';
import React, { FC } from 'react';
import { Button } from 'ui-kit/Button';
import {
  Bottom,
  FiltersWrap,
  RangePicker,
  Title,
  Wrap,
} from './SearchNodeArchiveFilters.styled';
import {
  FormValues,
  SearchNodeArchiveFiltersProps,
} from './SearchNodeArchiveFilters.types';
import { reportTypes } from './SearchNodeArchiveFilters.utils';

export const SearchNodeArchiveFilters: FC<SearchNodeArchiveFiltersProps> = ({
  loading,
  handleSubmit,
}) => {
  const { values, setFieldValue, resetForm, submitForm } =
    useFormik<FormValues>({
      initialValues: {
        from: null,
        to: null,
        type: EReportType.Daily,
      },
      onSubmit: ({ from, to, type }) => {
        const toDate = to?.endOf('day').format();

        handleSubmit({
          from: from?.format(),
          to: toDate,
          type,
        });
      },
    });

  return (
    <Wrap>
      <FiltersWrap>
        <Title>Фильтры</Title>
        <Form.Item label="Период">
          <RangePicker
            value={[values.from, values.to]}
            format="DD.MM.YYYY"
            disabledDate={(date) => {
              const currentDate = dayjs().startOf('day');
              const pickerDate = date.startOf('day');
              const diff = currentDate.diff(pickerDate, 'days');

              return diff < 0;
            }}
            onChange={(dateRange) => {
              setFieldValue('from', dateRange?.[0] || null);
              setFieldValue('to', dateRange?.[1] || null);
            }}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item label="Детализация">
          <Select
            value={values.type || undefined}
            onChange={(value) => setFieldValue('type', value)}
          >
            {reportTypes.map(({ key, value }) => (
              <Select.Option key={key} value={key}>
                {value}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </FiltersWrap>
      <Bottom>
        <Button onClick={() => resetForm()} type="ghost">
          Сбросить
        </Button>
        <Button
          disabled={loading}
          onClick={submitForm}
          style={{ marginLeft: '15px' }}
        >
          Применить фильтр
        </Button>
      </Bottom>
    </Wrap>
  );
};

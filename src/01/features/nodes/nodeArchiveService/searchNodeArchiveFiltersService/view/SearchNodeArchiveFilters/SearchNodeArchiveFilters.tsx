import { ButtonTT } from '01/tt-components';
import { Form, Select } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { EReportType } from 'myApi';
import React, { FC } from 'react';
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
  const {
    values,
    setFieldValue,
    resetForm,
    submitForm,
  } = useFormik<FormValues>({
    initialValues: {
      from: null,
      to: null,
      type: EReportType.Daily,
    },
    onSubmit: ({ from, to, type }) => {
      handleSubmit({
        from: from?.toISOString(true),
        to: to?.toISOString(true),
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
            disabledDate={(date) => moment().diff(date, 'days') <= 0}
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
        <ButtonTT onClick={resetForm} color="white">
          Сбросить
        </ButtonTT>
        <ButtonTT
          disabled={loading}
          onClick={submitForm}
          color="blue"
          style={{ marginLeft: '15px' }}
        >
          Применить фильтр
        </ButtonTT>
      </Bottom>
    </Wrap>
  );
};

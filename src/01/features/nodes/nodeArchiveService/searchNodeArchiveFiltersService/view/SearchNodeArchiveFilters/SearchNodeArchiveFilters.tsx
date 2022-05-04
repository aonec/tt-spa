import { ButtonTT } from '01/tt-components';
import { Form } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
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
    },
    onSubmit: ({ from, to }) => {
      handleSubmit({
        from: from?.toISOString(true),
        to: to?.toISOString(true),
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
            disabledDate={(date) => moment().diff(date) < 0}
            onChange={(dateRange) => {
              setFieldValue('from', dateRange?.[0] || null);
              setFieldValue('to', dateRange?.[1] || null);
            }}
            style={{ width: '100%' }}
          />
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

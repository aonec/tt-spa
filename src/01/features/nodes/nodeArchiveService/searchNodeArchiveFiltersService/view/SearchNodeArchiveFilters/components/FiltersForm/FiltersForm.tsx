import { Form } from 'antd';
import { useForm } from 'effector-forms/dist';
import React, { FC, useState } from 'react';
import { RangePicker } from './FilterForm.styled';
import { FilterFormProps } from './FiltersForm.types';

export const FiltersForm: FC<FilterFormProps> = ({ form }) => {
  const { fields } = useForm(form);

  return (
    <>
      <Form.Item label="Период">
        <RangePicker
          value={[fields.from.value, fields.to.value]}
          format="DD.MM.YYYY"
          onChange={(dateRange) => {
            fields.from.onChange(dateRange?.[0] || null);
            fields.to.onChange(dateRange?.[1] || null);
          }}
          style={{ width: '100%' }}
        />
      </Form.Item>
    </>
  );
};

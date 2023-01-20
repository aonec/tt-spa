import React, { FC } from 'react';
import { Wrapper } from './ReportFiltrationForm.styled';
import { ReportFiltrationFormProps } from './ReportFiltrationForm.types';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { SearchIcon } from 'ui-kit/icons';

export const ReportFiltrationForm: FC<ReportFiltrationFormProps> = ({}) => {
  return (
    <Wrapper>
      <FormItem label="Город">
        <Select suffixIcon={<SearchIcon />} placeholder="Выберите из списка" />
      </FormItem>
      <FormItem label="Домоуправление">
        <Select suffixIcon={<SearchIcon />} placeholder="Выберите из списка" />
      </FormItem>
      <FormItem label="Адрес">
        <Select suffixIcon={<SearchIcon />} placeholder="Выберите адреса из списка" />
      </FormItem>
      <FormItem label="Ресурс">
        <Select placeholder="Выбраны все ресурсы" />
      </FormItem>
      <FormItem label="Вид отчета">
        <Select placeholder="Выберите из списка" />
      </FormItem>
    </Wrapper>
  );
};

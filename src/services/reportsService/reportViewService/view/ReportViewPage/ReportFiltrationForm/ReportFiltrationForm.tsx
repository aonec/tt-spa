import React, { FC } from 'react';
import { Wrapper } from './ReportFiltrationForm.styled';
import { ReportFiltrationFormProps } from './ReportFiltrationForm.types';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { SearchIcon } from 'ui-kit/icons';
import { Radio, Space } from 'antd';

export const ReportFiltrationForm: FC<ReportFiltrationFormProps> = () => {
  return (
    <div>
      <Wrapper>
        <FormItem label="Город">
          <Select
            suffixIcon={<SearchIcon />}
            placeholder="Выберите из списка"
          />
        </FormItem>
        <FormItem label="Домоуправление">
          <Select
            suffixIcon={<SearchIcon />}
            placeholder="Выберите из списка"
          />
        </FormItem>
        <FormItem label="Адрес">
          <Select
            suffixIcon={<SearchIcon />}
            placeholder="Выберите адреса из списка"
          />
        </FormItem>
        <FormItem label="Ресурс">
          <Select placeholder="Выбраны все ресурсы" />
        </FormItem>
        <FormItem label="Вид отчета">
          <Select placeholder="Выберите из списка" />
        </FormItem>
      </Wrapper>
      <FormItem label="Период">
        <Radio.Group>
          <Space direction="vertical">
            <Radio>Последние сутки</Radio>
            <Radio>Последние 7 дней</Radio>
            <Radio>С начала месяца</Radio>
            <Radio>За прошлый месяц</Radio>
            <Radio>Произвольный период</Radio>
          </Space>
        </Radio.Group>
      </FormItem>
    </div>
  );
};

import { Checkbox, Form } from 'antd';
import React, { FC } from 'react';
import { DatePicker } from 'ui-kit/DatePicker';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import {
  CheckBoxWrapper,
  FirstLineWrapper,
  SecondLineWrapper,
} from './EditHomeownerForm.styled';
import { EditHomeownerFormProps } from './EditHomeownerForm.types';

export const EditHomeownerForm: FC<EditHomeownerFormProps> = ({ formId }) => {

  

  return (
    <Form id={formId}>
      <FirstLineWrapper>
        <FormItem label="Собственник">
          <Input placeholder="Введите ФИО" />
        </FormItem>
        <FormItem label="Лицевой счет">
          <Input placeholder="Введите номер л/с" />
        </FormItem>
      </FirstLineWrapper>
      <SecondLineWrapper>
        <FormItem label="Платежный код">
          <Input placeholder="Введите платежный код" />
        </FormItem>
        <FormItem label="Телефон">
          <Input placeholder="Введите телефон" />
        </FormItem>
        <FormItem label="Дата открытия лицевого счета">
          <DatePicker format="DD.MM.YYYY" />
        </FormItem>
      </SecondLineWrapper>
      <CheckBoxWrapper>
        <Checkbox>Основной собственник квартиры</Checkbox>
      </CheckBoxWrapper>
    </Form>
  );
};

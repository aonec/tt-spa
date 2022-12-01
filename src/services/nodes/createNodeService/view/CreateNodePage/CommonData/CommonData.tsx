import React, { FC } from 'react';
import { Button } from 'ui-kit/Button';
import { DatePicker } from 'ui-kit/DatePicker';
import { DocumentsUploadContainer } from 'ui-kit/DocumentsService';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { Select } from 'ui-kit/Select';
import { Title } from 'ui-kit/Title';
import { Footer } from '../CreateNodePage.styled';
import {
  FilesUploaderWrapper,
  FirstLineWrapper,
  SecondLineWrapper,
  ThirdLineWrapper,
} from './CommonData.styled';
import { CommonDataProps } from './CommonData.types';

export const CommonData: FC<CommonDataProps> = ({ goPrevStep }) => {
  return (
    <div>
      <Title>Общие данные об узле</Title>
      <FirstLineWrapper>
        <FormItem label="Ресурс">
          <Select placeholder="Выберите"></Select>
        </FormItem>
        <FormItem label="Номер узла">
          <Input placeholder="Введите" />
        </FormItem>
      </FirstLineWrapper>
      <SecondLineWrapper>
        <FormItem label="Зона">
          <Select placeholder="Выберите"></Select>
        </FormItem>
      </SecondLineWrapper>
      <FormItem label="Коммерческий учет показателей приборов">
        <Select placeholder="Выберите"></Select>
      </FormItem>
      <ThirdLineWrapper>
        <FormItem label="Дата начала действия акта-допуска">
          <DatePicker format="DD.MM.YYYY" placeholder="Введите дату" />
        </FormItem>
        <FormItem label="Дата окончания действия акта-допуска">
          <DatePicker format="DD.MM.YYYY" placeholder="Введите дату" />
        </FormItem>
      </ThirdLineWrapper>
      <FilesUploaderWrapper>
        <DocumentsUploadContainer
          label="Добавьте акт-допуска"
          documents={[]}
          uniqId="edit-apartment-act-form"
          onChange={() => {}}
          max={1}
        />
      </FilesUploaderWrapper>
      <Footer>
        <Button type="ghost" onClick={goPrevStep}>
          Назад
        </Button>
        <Button sidePadding={20} onClick={() => {}}>
          Далее
        </Button>
      </Footer>
    </div>
  );
};

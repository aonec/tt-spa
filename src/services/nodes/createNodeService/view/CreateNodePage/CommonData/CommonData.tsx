import React, { FC } from 'react';
import { Button } from 'ui-kit/Button';
import { DatePicker } from 'ui-kit/DatePicker';
import { DocumentsUploadContainer } from 'ui-kit/DocumentsService';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { Select } from 'ui-kit/Select';
import { LinkButton } from 'ui-kit/shared_components/LinkButton';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { Title } from 'ui-kit/Title';
import { Footer } from '../CreateNodePage.styled';
import { nodeResources, nodeStatuses } from './CommonData.contstants';
import {
  CreateNewZoneButtonWrapper,
  FilesUploaderWrapper,
  FirstLineWrapper,
  SelectOptionWithIconWrapper,
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
          <Select placeholder="Выберите">
            {nodeResources.map(({ resource, text }) => (
              <Select.Option key={resource} value={resource}>
                <SelectOptionWithIconWrapper>
                  <ResourceIconLookup resource={resource} />
                  <div>{text}</div>
                </SelectOptionWithIconWrapper>
              </Select.Option>
            ))}
          </Select>
        </FormItem>
        <FormItem label="Номер узла">
          <Input placeholder="Введите" />
        </FormItem>
      </FirstLineWrapper>
      <SecondLineWrapper>
        <FormItem label="Зона">
          <Select placeholder="Выберите"></Select>
        </FormItem>
        <CreateNewZoneButtonWrapper>
          <LinkButton onClick={() => {}}>+ Создать новую зону</LinkButton>
        </CreateNewZoneButtonWrapper>
      </SecondLineWrapper>
      <FormItem label="Коммерческий учет показателей приборов">
        <Select placeholder="Выберите">
          {nodeStatuses.map(({ nodeStatus, text, Icon }) => (
            <Select.Option key={nodeStatus} value={nodeStatus}>
              <SelectOptionWithIconWrapper>
                <Icon />
                <div>{text}</div>
              </SelectOptionWithIconWrapper>
            </Select.Option>
          ))}
        </Select>
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

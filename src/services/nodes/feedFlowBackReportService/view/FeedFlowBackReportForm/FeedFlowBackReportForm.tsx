import { EResourceType } from 'myApi';
import React, { FC } from 'react';
import { FormItem } from 'ui-kit/FormItem';
import { Input, InputWithAddon } from 'ui-kit/Input';
import { ResourceSelect } from 'ui-kit/shared_components/ResourceSelect';
import { LineWrapper } from './FeedFlowBackReportForm.styled';
import { FeedFlowBackReportFormProps } from './FeedFlowBackReportForm.types';

export const FeedFlowBackReportForm: FC<FeedFlowBackReportFormProps> = ({}) => {
  return (
    <div>
      <FormItem label="Название отчёта">
        <Input placeholder="Введите название" />
      </FormItem>
      <LineWrapper>
        <FormItem label="Город">
          <Input placeholder="Введите название" />
        </FormItem>
        <FormItem label="УК или домоуправление">
          <Input placeholder="Введите название" />
        </FormItem>
        <FormItem label="Тип ресурса">
          <ResourceSelect resource={EResourceType.Heat} disabled />
        </FormItem>
        <FormItem label="Температура наружного воздуха">
          <InputWithAddon
            type="number"
            placeholder="Введите температуру"
            addonAfter="°C"
          />
        </FormItem>
      </LineWrapper>
    </div>
  );
};

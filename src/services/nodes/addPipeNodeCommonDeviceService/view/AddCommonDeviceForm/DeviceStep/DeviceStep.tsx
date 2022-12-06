import { Form } from 'antd';
import React, { FC } from 'react';
import { DatePicker } from 'ui-kit/DatePicker';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { Select } from 'ui-kit/Select';
import { LinkButton } from 'ui-kit/shared_components/LinkButton';
import { CreatePipeButtonWrapper, LineWrapper } from './DeviceStep.styled';
import { DeviceStepProps } from './DeviceStep.types';

export const DeviceStep: FC<DeviceStepProps> = ({ openAddPipeModal }) => {
  return (
    <Form>
      <LineWrapper>
        <FormItem label="Модель прибора">
          <Input placeholder="Введите" />
        </FormItem>
        <FormItem label="Серийный номер">
          <Input placeholder="Введите" />
        </FormItem>
        <FormItem label="Дата последней поверки прибора">
          <DatePicker placeholder="Выберите" format="DD.MM.YYYY" />
        </FormItem>
        <FormItem label="Дата следующей поверки прибора">
          <DatePicker placeholder="Выберите" format="DD.MM.YYYY" />
        </FormItem>
        <FormItem label="Труба">
          <Select placeholder="Выберите" />
        </FormItem>
        <CreatePipeButtonWrapper>
          <LinkButton onClick={openAddPipeModal}>+ Добавить трубу</LinkButton>
        </CreatePipeButtonWrapper>
      </LineWrapper>
    </Form>
  );
};

import { ErrorMessage } from '01/shared/ui/ErrorMessage';
import { EResourceType } from 'myApi';
import React, { FC } from 'react';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { ResourceOptionWrapper } from './CreateResourceDisconnectionSelectResource.styled';
import { CreateResourceDisconnectionSelectResourceProps } from './CreateResourceDisconnectionSelectResource.types';

export const CreateResourceDisconnectionSelectResource: FC<
  CreateResourceDisconnectionSelectResourceProps
> = ({ disabled, resourceTypes, currentValue, errorText, setFieldValue }) => {
  return (
    <FormItem label="Тип ресурса">
      <Select
        disabled={disabled}
        placeholder="Выберите тип ресурса"
        value={currentValue}
        onChange={(value) => setFieldValue(value as EResourceType)}
      >
        {resourceTypes?.map(({ key, value }) => {
          if (key) {
            return (
              <Select.Option key={key} value={key}>
                <ResourceOptionWrapper>
                  <div className="device-resource-icon">
                    <ResourceIconLookup resource={key as EResourceType} />
                  </div>
                  {value}
                </ResourceOptionWrapper>
              </Select.Option>
            );
          }
        }) || null}
      </Select>
      <ErrorMessage>{errorText}</ErrorMessage>
    </FormItem>
  );
};

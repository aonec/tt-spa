import React, { FC } from 'react';
import { FormItem } from 'ui-kit/FormItem';
import { ResourceSelect } from 'ui-kit/shared_components/ResourceSelect';
import { Wrapper } from './CommonDataStep.styled';
import { CommonDataStepProps } from './CommonDataStep.types';

export const CommonDataStep: FC<CommonDataStepProps> = ({ resource }) => {
  return (
    <Wrapper>
      <FormItem label="Тип ресурса">
        <ResourceSelect resource={resource} disabled />
      </FormItem>
    </Wrapper>
  );
};

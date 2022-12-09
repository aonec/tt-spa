import { Checkbox } from 'antd';
import React, { FC } from 'react';
import { ResourceConsumptionGraphType } from 'services/resources/resourceConsumptionService/resourceConsumptionService.types';
import { TypeNameLookup } from './SelectGraphType.constants';
import {
  Circle,
  GroupWrapper,
  SelectTitle,
  Wrapper,
} from './SelectGraphType.styled';
import { SelectGraphTypeProps } from './SelectGraphType.types';

export const SelectGraphType: FC<SelectGraphTypeProps> = ({
  title,
  colors,
  disabled,
}) => {
  return (
    <Wrapper>
      <SelectTitle>{title}</SelectTitle>
      {Object.values(ResourceConsumptionGraphType).map((type) => (
        <GroupWrapper>
          <Checkbox disabled={disabled[type]} checked={false} />
          <Circle color={colors[type]} />
          {TypeNameLookup[type]}
        </GroupWrapper>
      ))}
    </Wrapper>
  );
};

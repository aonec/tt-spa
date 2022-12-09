import { Checkbox } from 'antd';
import React, { FC, useCallback } from 'react';
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
  disabled,
  checked,
  handleSetChecked,
  colorConstructor,
}) => {
  const setChecked = useCallback(
    (key: ResourceConsumptionGraphType, newChecked: boolean) =>
      handleSetChecked({ ...checked, [key]: newChecked }),
    [checked, handleSetChecked]
  );

  return (
    <Wrapper>
      <SelectTitle>{title}</SelectTitle>
      {Object.values(ResourceConsumptionGraphType).map((type) => (
        <GroupWrapper
          onClick={() => !disabled[type] && setChecked(type, !checked[type])}
        >
          <Checkbox disabled={disabled[type]} checked={checked[type]} />
          <Circle color={colorConstructor(type)} />
          {TypeNameLookup[type]}
        </GroupWrapper>
      ))}
    </Wrapper>
  );
};

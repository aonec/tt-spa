import React, { FC, useCallback } from 'react';
import { ResourceConsumptionGraphType } from 'services/resources/resourceConsumptionService/resourceConsumptionService.types';
import { TypeNameLookup } from './SelectGraphType.constants';
import { SelectTitle, Wrapper } from './SelectGraphType.styled';
import { SelectGraphTypeProps } from './SelectGraphType.types';
import { SelectGraphTypeItem } from './SelectGraphTypeItem';

export const SelectGraphType: FC<SelectGraphTypeProps> = ({
  title,
  disabled,
  checked,
  handleSetChecked,
  colorConstructor,
  isHousingLoading,
  isNormativeAndSubscriberLoading,
  isPrevHousingLoading,
  isPrevNormativeAndSubscriberLoading,
}) => {
  const setChecked = useCallback(
    (key: ResourceConsumptionGraphType, newChecked: boolean) =>
      handleSetChecked({ ...checked, [key]: newChecked }),
    [checked, handleSetChecked],
  );

  return (
    <Wrapper>
      <SelectTitle>{title}</SelectTitle>
      {Object.values(ResourceConsumptionGraphType).map((type) => {
        const isLoading =
          (type === ResourceConsumptionGraphType.Housing && isHousingLoading) ||
          (type === ResourceConsumptionGraphType.Normative &&
            isNormativeAndSubscriberLoading) ||
          (type === ResourceConsumptionGraphType.Subscriber &&
            isNormativeAndSubscriberLoading) ||
          (type === ResourceConsumptionGraphType.Housing &&
            isPrevHousingLoading) ||
          (type === ResourceConsumptionGraphType.Normative &&
            isPrevNormativeAndSubscriberLoading) ||
          (type === ResourceConsumptionGraphType.Subscriber &&
            isPrevNormativeAndSubscriberLoading);

        return (
          <SelectGraphTypeItem
            disabled={ isLoading || disabled[type]}
            checked={checked[type]}
            setChecked={(checked) => setChecked(type, checked)}
            color={colorConstructor(type)}
            text={TypeNameLookup[type]}
            key={type}
            isLoading={isLoading}
          />
        );
      })}
    </Wrapper>
  );
};

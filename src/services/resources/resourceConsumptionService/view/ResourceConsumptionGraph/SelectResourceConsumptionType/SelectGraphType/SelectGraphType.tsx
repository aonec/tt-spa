import React, { FC, useCallback, useMemo } from 'react';
import { ResourceConsumptionGraphType } from 'services/resources/resourceConsumptionService/resourceConsumptionService.types';
import { TypeNameLookup } from './SelectGraphType.constants';
import { SelectTitle, Wrapper } from './SelectGraphType.styled';
import { SelectGraphTypeProps } from './SelectGraphType.types';
import { SelectGraphTypeItem } from './SelectGraphTypeItem';
import { hasNoConsecutiveNumbers } from '../../ResourceConsumptionGraph.utils';

export const SelectGraphType: FC<SelectGraphTypeProps> = ({
  title,
  disabled,
  checked,
  handleSetChecked,
  colorConstructor,
  isHousingLoading,
  isNormativeAndSubscriberLoading,
  consumptionData,
}) => {
  const setChecked = useCallback(
    (key: ResourceConsumptionGraphType, newChecked: boolean) =>
      handleSetChecked({ ...checked, [key]: newChecked }),
    [checked, handleSetChecked],
  );

  const isDataEmpty = useMemo(() => {
    if (!consumptionData) return true;

    const { normative, housing, subscriber } = consumptionData;

    return [normative, housing, subscriber].every((consumption) =>
      Boolean(consumption && hasNoConsecutiveNumbers(consumption!)),
    );
  }, [consumptionData]);

  if (isDataEmpty) {
    return <Wrapper></Wrapper>;
  }

  return (
    <Wrapper>
      <SelectTitle>{title}</SelectTitle>
      {Object.values(ResourceConsumptionGraphType).map((type) => {
        const isHousing = type === ResourceConsumptionGraphType.Housing;
        const isNormative = type === ResourceConsumptionGraphType.Normative;
        const isSubscriber = type === ResourceConsumptionGraphType.Subscriber;

        const isHousingLoadingWithTypeCheck = isHousing && isHousingLoading;
        const isNormativeLoadingWithTypeCheck =
          isNormative && isNormativeAndSubscriberLoading;
        const isSubscriberLoadingWithTypeChecking =
          isSubscriber && isNormativeAndSubscriberLoading;
        const isLoading = [
          isHousingLoadingWithTypeCheck,
          isNormativeLoadingWithTypeCheck,
          isSubscriberLoadingWithTypeChecking,
        ].some(Boolean);

        const isNormativeEmpty =
          isNormative &&
          consumptionData?.normative &&
          hasNoConsecutiveNumbers(consumptionData.normative);
        const isSubscriberEmpty =
          isSubscriber &&
          consumptionData?.subscriber &&
          hasNoConsecutiveNumbers(consumptionData.subscriber);
        const isHousingEmpty =
          isHousing &&
          consumptionData?.housing &&
          hasNoConsecutiveNumbers(consumptionData.housing);
        const isConsumptionDataEmpty = [
          isNormativeEmpty,
          isSubscriberEmpty,
          isHousingEmpty,
        ].some(Boolean);

        return (
          <SelectGraphTypeItem
            disabled={isLoading || disabled[type]}
            checked={checked[type]}
            setChecked={(checked) => setChecked(type, checked)}
            color={colorConstructor(type)}
            text={TypeNameLookup[type]}
            key={type}
            isLoading={isLoading}
            isConsumptionDataEmpty={!isLoading && isConsumptionDataEmpty}
          />
        );
      })}
    </Wrapper>
  );
};

import React, { FC, useCallback } from 'react';
import { ResourceConsumptionGraphType } from 'services/resources/resourceConsumptionService/resourceConsumptionService.types';
import { BooleanTypesOfResourceConsumptionGraph } from '../../ResourceConsumptionProfile/ResourceConsumptionProfile.types';
import { getGraphTypeColors } from '../ResourceConsumptionGraph.utils';
import { SelectGraphType } from './SelectGraphType';
import { SelectTitle } from './SelectGraphType/SelectGraphType.styled';
import { SelectGraphTypeItem } from './SelectGraphType/SelectGraphTypeItem';
import { Wrapper } from './SelectResourceConsumptionType.styled';
import { SelectResourceConsumptionTypeProps } from './SelectResourceConsumptionType.types';

export const SelectResourceConsumptionType: FC<
  SelectResourceConsumptionTypeProps
> = ({
  disabled,
  checked,
  setCheckedGraphTypes,
  resource,
  isAdditionalAddress,
  additionalAddress,
  currentAddress,
  selectedAddresses,
  setSelectedAddresses,
  isHousingLoading,
  isNormativeAndSubscriberLoading,
  isPrevHousingLoading,
  isPrevNormativeAndSubscriberLoading,
  consumptionData,
}) => {
  const handleSetChecked = useCallback(
    (key: string, newChecked: BooleanTypesOfResourceConsumptionGraph) =>
      setCheckedGraphTypes({ ...checked, [key]: newChecked }),
    [checked, setCheckedGraphTypes],
  );

  if (!resource) {
    return null;
  }

  // console.log(JSON.stringify(consumptionData.currentMonthData));

  return (
    <Wrapper>
      <SelectGraphType
        title={'Выбранный период'}
        disabled={disabled.currentMonthData}
        checked={checked.currentMonthData}
        handleSetChecked={(checked) =>
          handleSetChecked('currentMonthData', checked)
        }
        colorConstructor={(type) => getGraphTypeColors({ resource, type })}
        isHousingLoading={isHousingLoading}
        isNormativeAndSubscriberLoading={isNormativeAndSubscriberLoading}
        consumptionData={consumptionData.currentMonthData}
      />
      {!isAdditionalAddress && (
        <SelectGraphType
          title={'Прошлый аналогичный период'}
          disabled={disabled.prevMonthData}
          checked={checked.prevMonthData}
          handleSetChecked={(checked) =>
            handleSetChecked('prevMonthData', checked)
          }
          colorConstructor={(type) =>
            getGraphTypeColors({ resource, type, isOpacityNeed: true })
          }
          isPrevHousingLoading={isPrevHousingLoading}
          isPrevNormativeAndSubscriberLoading={
            isPrevNormativeAndSubscriberLoading
          }
          consumptionData={consumptionData.prevMonthData}
        />
      )}
      {isAdditionalAddress && (
        <div>
          <SelectTitle>Адреса для сравнения</SelectTitle>
          <SelectGraphTypeItem
            color={getGraphTypeColors({
              resource,
              type: ResourceConsumptionGraphType.Housing,
            })}
            checked={selectedAddresses.currentAddress}
            disabled={false}
            text={currentAddress}
            setChecked={(checked) =>
              setSelectedAddresses({
                ...selectedAddresses,
                currentAddress: checked,
              })
            }
          />
          <SelectGraphTypeItem
            color={getGraphTypeColors({
              resource,
              type: ResourceConsumptionGraphType.Housing,
              isOpacityNeed: true,
            })}
            checked={selectedAddresses.addditionalAddress}
            disabled={false}
            text={additionalAddress}
            setChecked={(checked) =>
              setSelectedAddresses({
                ...selectedAddresses,
                addditionalAddress: checked,
              })
            }
          />
        </div>
      )}
    </Wrapper>
  );
};

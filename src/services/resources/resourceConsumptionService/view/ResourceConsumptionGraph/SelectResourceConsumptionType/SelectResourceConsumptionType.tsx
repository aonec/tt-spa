import React, { FC, useCallback } from 'react';
import { BooleanTypesOfResourceConsumptionGraph } from '../../ResourceConsumptionProfile/ResourceConsumptionProfile.types';
import { getGraphTypeColors } from '../ResourceConsumptionGraph.utils';
import { SelectGraphType } from './SelectGraphType';
import { Wrapper } from './SelectResourceConsumptionType.styled';
import { SelectResourceConsumptionTypeProps } from './SelectResourceConsumptionType.types';

export const SelectResourceConsumptionType: FC<SelectResourceConsumptionTypeProps> = ({
  disabled,
  checked,
  setCheckedGraphTypes,
  resource,
}) => {
  const handleSetChecked = useCallback(
    (key: string, newChecked: BooleanTypesOfResourceConsumptionGraph) =>
      setCheckedGraphTypes({ ...checked, [key]: newChecked }),
    [checked, setCheckedGraphTypes]
  );

  if (!resource) {
    return null;
  }

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
      />
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
      />
    </Wrapper>
  );
};

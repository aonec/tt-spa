import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { Checkbox } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { Wrapper } from './SwitchOrCompleteCheckbox.styled';
import { SwitchOrCompleteCheckboxProps } from './SwitchOrCompleteCheckbox.types';

export const SwitchOrCompleteCheckbox: FC<SwitchOrCompleteCheckboxProps> = ({
  handleChange,
}) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    handleChange(checked);
  }, [checked]);

  return (
    <Wrapper>
      <SpaceLine />
      <Checkbox
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      >
        Требуется дополнительная проверка старшего оператора
      </Checkbox>
    </Wrapper>
  );
};

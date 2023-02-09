import React, { FC, useEffect, useState } from 'react';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { SwitchStageSelectProps } from './SwitchStageSelect.types';

export const SwitchStageSelect: FC<SwitchStageSelectProps> = ({
  nextStages,
  handleChange,
}) => {
  const [selectedStage, setSelectedStage] = useState<number | null>(null);

  useEffect(() => {
    if (selectedStage) handleChange(selectedStage);
  }, [selectedStage, handleChange]);

  return (
    <FormItem label="Действия">
      <Select
        placeholder="Выберите действие"
        value={selectedStage || undefined}
        onChange={(value) => setSelectedStage(value as number)}
      >
        {nextStages.map((elem) => (
          <Select.Option key={elem.id} value={elem.id}>
            {elem.name}
          </Select.Option>
        ))}
      </Select>
    </FormItem>
  );
};

import React, { FC, useMemo } from 'react';
import { SelectSC } from './SelectApplicationWorker.styled';
import { SelectApplicationWorkerProps } from './SelectApplicationWorker.types';

export const SelectApplicationWorker: FC<SelectApplicationWorkerProps> = ({
  applicationBrigade,
  handleSelectWorker,
}) => {
  const options = useMemo(
    () =>
      applicationBrigade.map((brigade) => ({
        label: brigade.name,
        value: brigade.ttmId,
        key: brigade.ttmId,
      })),
    [applicationBrigade],
  );

  return (
    <SelectSC
      allowClear
      options={options}
      placeholder={'Выберите'}
      onChange={(value) => handleSelectWorker(value as number)}
    />
  );
};

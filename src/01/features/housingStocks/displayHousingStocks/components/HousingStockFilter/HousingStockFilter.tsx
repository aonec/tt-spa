import { Flex } from '01/shared/ui/Layout/Flex';
import { Input } from 'antd';
import React from 'react';
import { useFilter } from './useFilter.hook';

export const HousingStockFilter = () => {
  const { filterFields, setValue } = useFilter();

  return (
    <Flex>
      {filterFields?.map((field) => (
        <Input
          key={field.name}
          value={field.value}
          onChange={(e) => setValue(field.name, e.target.value)}
          type="text"
        />
      ))}
    </Flex>
  );
};

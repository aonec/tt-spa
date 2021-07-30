import { getArrayByCountRange } from '01/_pages/MetersPage/components/utils';
import { useState } from 'react';
const fieldNames = ['City', 'Street', 'HousingStockNumber', 'Corpus'];

export const useFilter = () => {
  const [filterFields, setFilterFields] = useState(
    getArrayByCountRange(fieldNames.length, (index) => ({
      name: fieldNames[index],
      value: '',
    }))
  );

  const setValue = (name: string, value: string) =>
    setFilterFields((prev) =>
      prev.map((elem) => (elem.name === name ? { ...elem, value } : elem))
    );

  return { filterFields, setValue };
};

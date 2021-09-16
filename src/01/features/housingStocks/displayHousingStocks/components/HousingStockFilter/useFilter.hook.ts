import { useState } from 'react';

export const filterValuesInit = {
  City: 'Нижнекамск',
  Street: '',
  HousingStockNumber: '',
  Corpus: '',
};

export const useFilter = () => {
  const [filterFields, setFilterFields] = useState(filterValuesInit);

  const setValue = (name: string, value: string) =>
    setFilterFields((prev) => ({ ...prev, [name]: value }));

  return {
    filterFields,
    setValue,
    setFilterFields,
  };
};

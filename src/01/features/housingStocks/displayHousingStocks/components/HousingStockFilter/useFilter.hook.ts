import { useState } from 'react';

export const useFilter = () => {
  const [filterFields, setFilterFields] = useState({
    City: 'Нижнекамск',
    Street: '',
    HousingStockNumber: '',
    Corpus: '',
  });

  const setValue = (name: string, value: string) =>
    setFilterFields((prev) => ({ ...prev, [name]: value }));

  return {
    filterFields,
    setValue,
  };
};

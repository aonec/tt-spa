import { useState } from 'react';

export const filterValuesInit = {
  City: '',
  Street: '',
  HousingStockNumber: '',
  Corpus: '',
};

export const useFilter = () => {
  const [filterFields, setFilterFields] = useState({
    City: '',
    Street: '',
    HousingStockNumber: '',
    Corpus: '',
  });

  const setValue = (name: string, value: string) =>
    setFilterFields((prev) => ({ ...prev, [name]: value }));

  return {
    filterFields,
    setValue,
    setFilterFields,
  };
};

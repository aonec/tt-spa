import { useState, useEffect } from 'react';
import { filterFieldHasBeenChanged } from '../../models';

export const useFilter = () => {
  const [filterFields, setFilterFields] = useState({
    City: 'Нижнекамск',
    Street: '',
    HousingStockNumber: '',
    Corpus: '',
  });

  const setValue = (name: string, value: string) =>
    setFilterFields((prev) => ({ ...prev, [name]: value }));

  useEffect(() => {
    filterFieldHasBeenChanged();
  }, [filterFields]);

  return {
    filterFields,
    setValue,
  };
};

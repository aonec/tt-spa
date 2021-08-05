import { useDebounce } from '01/hooks/useDebounce';
import { useState, useEffect } from 'react';
import { filterFieldHasBeenChanged } from '../../models';

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

  const debouncedValue = useDebounce(filterFields, 500);

  useEffect(() => {
    filterFieldHasBeenChanged(filterFields);
  }, [debouncedValue]);

  return {
    filterFields,
    setValue,
    setFilterFields,
  };
};

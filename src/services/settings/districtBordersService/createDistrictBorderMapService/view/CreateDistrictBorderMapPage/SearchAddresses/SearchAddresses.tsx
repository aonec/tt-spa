import React, { FC, useEffect, useMemo, useState } from 'react';
import { SearchInput } from '../CreateDistrictBorderMapPage.styled';
import { SearchIcon } from 'ui-kit/icons';
import { SearchAddressesProps } from './SearchAddresses.types';
import { getHousingStockItemAddress } from 'utils/getHousingStockItemAddress';
import { useAutocomplete } from 'hooks/useAutocomplete';
import { fromEnter } from 'ui-kit/shared/DatePickerNative';

export const SearchAddresses: FC<SearchAddressesProps> = ({
  existingHousingStocks,
  handleSelect,
}) => {
  const [search, setSearch] = useState('');

  const searchAdressesOptions = useMemo(() => {
    if (!existingHousingStocks?.items) return [];

    const housingStocks = existingHousingStocks.items;

    if (!housingStocks) return [];

    const options = housingStocks
      .map((elem) => ({
        value:
          elem.address?.mainAddress &&
          getHousingStockItemAddress(elem.address.mainAddress),
        id: elem.id,
      }))
      .filter((elem) => Boolean(elem.value));

    return options;
  }, [existingHousingStocks?.items]);

  useEffect(() => {
    const selectedOption = searchAdressesOptions.find(({ value, id }) => {
      return value === search;
    });

    const selectedHousingStock = existingHousingStocks?.items?.find(
      (elem) => elem.id === selectedOption?.id,
    );

    if (!selectedHousingStock) return;

    handleSelect(selectedHousingStock);
  }, [
    existingHousingStocks?.items,
    handleSelect,
    search,
    searchAdressesOptions,
  ]);

  const autocomplete = useAutocomplete(
    search,
    searchAdressesOptions.map((elem) => elem.value!),
    15,
  );
  const buildingMatch = autocomplete ? autocomplete.bestMatch : null;
  const options = autocomplete ? autocomplete.options : [];

  return (
    <>
      <SearchInput
        small
        suffixIcon={<SearchIcon />}
        placeholder="Поиск адресов"
        allowClear
        onChange={(value) => {
          setSearch(String(value));
        }}
        onKeyDown={fromEnter(() => {
          if (search && buildingMatch) setSearch(buildingMatch);
        })}
        options={options}
        onSelect={(value) => {
          setSearch(value as string);
        }}
      />
    </>
  );
};

import { fromEnter } from '01/shared/ui/DatePickerNative';
import { StyledAutocomplete } from '01/shared/ui/Fields';
import React, { FC, useState } from 'react';
import { AddressAutoCompleteSearchProps } from './AddressAutoCompleteSearch.types';
import { prepareOptionsForAutoComplete } from './AddressAutoCompleteSearch.utils';

export const AddressAutoCompleteSearch: FC<AddressAutoCompleteSearchProps> = ({
  streetsList,
  handleChooseHousingStock,
}) => {
  const [addressSearch, setAddressSearch] = useState('');

  const options = prepareOptionsForAutoComplete(streetsList, addressSearch);

  return (
    <StyledAutocomplete
      disabled={!streetsList.length}
      value={addressSearch}
      onChange={(e) => setAddressSearch(e)}
      placeholder="Введите адрес"
      onSelect={(address) =>
        handleChooseHousingStock(
          streetsList.find((elem) => elem.addressString === address)?.id || 0
        )
      }
      options={options}
    />
  );
};

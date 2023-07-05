import { useStore } from 'effector-react';
import React, { FC } from 'react';
import { CheckLg, XLg } from 'react-bootstrap-icons';
import {
  InputSC,
  PopoverWrapper,
  SearchWrapper,
  Wrapper,
} from './AddressIdSearch.styled';
import { Loader } from 'ui-kit/Loader';
import { AddressIdSearchProps } from './AddressIdSearch.types';
import { useFocusedIndex } from './AddressIdSearch.hooks';
import { fromEnter } from 'ui-kit/shared_components/DatePickerNative';
import { SearchIcon } from 'ui-kit/icons';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';
import { useAutocomplete } from 'hooks/useAutocomplete';

const addressIdSearchKey = 'address-id-search';

export const AddressIdSearch: FC<AddressIdSearchProps> = ({
  getApartmentId,
  onEnter,
  isSuccess,
  isError,
  isLoading,
  setAddress,
  addressFilter,
  dataKey,
}) => {
  const existingStreets = useStore(
    addressSearchService.outputs.$existingStreets,
  );
  const focusedIndex = useFocusedIndex(addressIdSearchKey);
  const isFirstFocused = focusedIndex === 0;

  const autocomplete = useAutocomplete(addressFilter.Street, existingStreets);
  const bestStreetMatch = autocomplete?.bestMatch;

  const Popover: React.FC<{ children: string }> = ({ children }) => {
    return children ? (
      <Wrapper onClick={() => setAddress({ Street: children })}>
        {children}
      </Wrapper>
    ) : null;
  };

  return (
    <SearchWrapper
      focused={focusedIndex !== null}
      isSuccess={isSuccess}
      error={isError}
    >
      {isError ? (
        <XLg style={{ color: '#c31700' }} />
      ) : isSuccess ? (
        <CheckLg style={{ color: '#00c34e' }} />
      ) : isLoading ? (
        <Loader show size={14} />
      ) : (
        <SearchIcon />
      )}
      <PopoverWrapper>
        <InputSC
          data-search-input={addressIdSearchKey}
          data-reading-input={dataKey}
          autoComplete="off"
          onChange={(e) => setAddress({ Street: e.currentTarget.value })}
          value={addressFilter.Street || ''}
          style={{
            borderLeft: 'none',
          }}
          onFocus={() => setAddress({})}
          onKeyDown={(e) => {
            fromEnter(() => {
              onEnter && onEnter(0);
              setAddress({ Street: bestStreetMatch });
            })(e);
          }}
          placeholder="Улица"
        />
        {isFirstFocused && bestStreetMatch && (
          <Popover>{bestStreetMatch}</Popover>
        )}
      </PopoverWrapper>

      <PopoverWrapper>
        <InputSC
          data-search-input={addressIdSearchKey}
          data-reading-input={dataKey}
          autoComplete="off"
          onFocus={() =>
            setAddress({
              Street: addressFilter.Street,
            })
          }
          onChange={(e) =>
            setAddress({ ...addressFilter, HousingNumber: e.target.value })
          }
          value={addressFilter.HousingNumber || ''}
          disabled={!addressFilter.Street}
          onKeyDown={(e) => fromEnter(() => onEnter && onEnter(1))(e)}
          placeholder="Дом"
        />
      </PopoverWrapper>

      <PopoverWrapper>
        <InputSC
          data-search-input={addressIdSearchKey}
          data-reading-input={dataKey}
          style={{ borderRadius: '0 3px 3px 0' }}
          autoComplete="off"
          onChange={(e) =>
            setAddress({ ...addressFilter, ApartmentNumber: e.target.value })
          }
          disabled={!addressFilter.HousingNumber}
          value={addressFilter.ApartmentNumber || ''}
          onFocus={() =>
            setAddress({
              HousingNumber: addressFilter.HousingNumber,
              Street: addressFilter.Street,
              ApartmentNumber: undefined,
            })
          }
          onKeyDown={(e: any) => {
            fromEnter(() => {
              getApartmentId();
              onEnter && onEnter(2);
            })(e);
          }}
          placeholder="Кв."
        />
      </PopoverWrapper>
    </SearchWrapper>
  );
};

import { FilterButton } from '01/shared/ui/Fields';
import React, { FC } from 'react';
import { ExpandedSearch } from '../../../components/ExpandedSearch';
import {
  FilterButtonWrapper,
  SearchFieldsWrapper,
  SelectCitySC,
  SelectManagingFirmSC,
  Wrapper,
} from './ManagingFirmSearch.styled';
import { ManagingFirmSearchProps } from './ManagingFirmSearch.types';

export const ManagingFirmSearch: FC<ManagingFirmSearchProps> = ({
  cities,
  managingFirms,
  selectManagingFirm,
  selectedManagingFirm,
  isOpenExpandedSearch,
  handleOpenExpandedSearch,
}) => {
  const isManagingFirmSelectDisabled = managingFirms.length === 0;

  return (
    <Wrapper>
      {isOpenExpandedSearch && <ExpandedSearch />}
      {!isOpenExpandedSearch && (
          <SearchFieldsWrapper>
          <FilterButtonWrapper onClick={handleOpenExpandedSearch}>
            <FilterButton />
          </FilterButtonWrapper>
            <SelectCitySC placeholder="Выберите город" disabled>
              {cities.map((city) => (
                <SelectCitySC.Option key={city} value={city}>
                  {city}
                </SelectCitySC.Option>
              ))}
            </SelectCitySC>
            <SelectManagingFirmSC
              value={selectedManagingFirm || undefined}
              onChange={(value) => selectManagingFirm(String(value))}
              placeholder="Выберите домоуправление"
              disabled={isManagingFirmSelectDisabled}
            >
              {managingFirms.map((managingFirm) => {
                const key = managingFirm.key;
                const value = managingFirm.value;
                if (!key || !value) {
                  return null;
                }
                return (
                  <SelectManagingFirmSC.Option key={key} value={key}>
                    {value}
                  </SelectManagingFirmSC.Option>
                );
              })}
            </SelectManagingFirmSC>
          </SearchFieldsWrapper>
      )}
    </Wrapper>
  );
};

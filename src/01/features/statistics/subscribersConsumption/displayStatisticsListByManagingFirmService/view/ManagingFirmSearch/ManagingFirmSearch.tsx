import { ExtendedSearch } from '01/shared/ui/ExtendedSearch';
import React, { FC } from 'react';
import {
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
}) => {
  const isManagingFirmSelectDisabled = managingFirms.length === 0;

  return (
    <Wrapper>
      <ExtendedSearch
        isOpen={false}
        handleApply={() => {}}
        handleClear={() => {}}
        handleClose={() => {}}
        handleOpen={() => {}}
        extendedSearchContent={<></>}
        disabled
      >
        <SearchFieldsWrapper>
          <SelectCitySC placeholder="Выберите город">
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
      </ExtendedSearch>
    </Wrapper>
  );
};

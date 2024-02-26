import { ExtendedSearch } from 'ui-kit/ExtendedSearch';
import { Form } from 'antd';
import React, { FC } from 'react';
import { SearchInspectorsHousingStocksProps } from './types';
import { Select } from 'ui-kit/Select';
import {
  ExtendedSearchWrap,
  Wrap,
} from './SearchInspectorsHousingStocks.styled';
import { AddressSearchContainer } from 'services/addressSearchService';
import { SearchFieldType } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';

export const SearchInspectorsHousingStocks: FC<
  SearchInspectorsHousingStocksProps
> = ({
  form,
  isExtendedSearchOpen,
  handelExtendedSearchOpen,
  handleExtendedSearchClose,
  inspectors,
  hosuingManagements,
  handleSearch,
  handleApplyFilters,
  handleClearExtendedSearchValues,
  isSearchError,
}) => {
  return (
    <>
      <Wrap>
        <ExtendedSearch
          isOpen={isExtendedSearchOpen}
          handleClose={handleExtendedSearchClose}
          handleOpen={handelExtendedSearchOpen}
          handleApply={handleApplyFilters}
          handleClear={handleClearExtendedSearchValues}
          extendedSearchContent={
            <ExtendedSearchWrap>
              <Form.Item label="Инспектор">
                <Select
                  small
                  placeholder="Выберите из списка"
                  value={form.fields.InspectorId.value || undefined}
                  onChange={(value) => {
                    if (!value) {
                      form.fields.InspectorId.reset();
                    } else {
                      form.fields.InspectorId.onChange(value as string);
                    }
                  }}
                  allowClear
                >
                  {inspectors?.map((inspector) => (
                    <Select.Option key={inspector.id} value={inspector.id}>
                      {inspector.fullName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Домоуправление">
                <Select
                  small
                  value={form.fields.HouseManagement.value || undefined}
                  onChange={(value) => {
                    if (!value) {
                      form.fields.HouseManagement.reset();
                    } else {
                      form.fields.HouseManagement.onChange(value as string);
                    }
                  }}
                  allowClear
                  placeholder="Выберите из списка"
                >
                  {hosuingManagements?.map((houseManagement) => (
                    <Select.Option
                      key={houseManagement.key}
                      value={houseManagement.value!}
                    >
                      {houseManagement.value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </ExtendedSearchWrap>
          }
        >
          <AddressSearchContainer
            fields={[
              SearchFieldType.City,
              SearchFieldType.Street,
              SearchFieldType.House,
            ]}
            customTemplate={[
              { fieldType: SearchFieldType.City, templateValue: '0.5fr' },
              { fieldType: SearchFieldType.Street, templateValue: '1fr' },
              { fieldType: SearchFieldType.House, templateValue: '0.25fr' },
            ]}
            initialValues={{
              city: form.fields.City.value,
              street: form.fields.Street.value,
              house: form.fields.BuildingNumber.value,
            }}
            handleSubmit={(values) => {
              form.fields.City.onChange(values.city as string);
              form.fields.Street.onChange(values.street as string);
              form.fields.BuildingNumber.onChange(values.house as string);

              handleSearch();
            }}
            isError={isSearchError}
          />
        </ExtendedSearch>
      </Wrap>
    </>
  );
};

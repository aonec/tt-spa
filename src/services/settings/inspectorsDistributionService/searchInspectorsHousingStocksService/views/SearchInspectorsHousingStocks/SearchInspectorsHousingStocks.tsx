import { ExtendedSearch } from 'ui-kit/ExtendedSearch';
import { Form } from 'antd';
import React, { FC } from 'react';
import { Select } from 'ui-kit/Select';
import {
  ExtendedSearchWrap,
  Wrap,
} from './SearchInspectorsHousingStocks.styled';
import { AddressSearchContainer } from 'services/addressSearchService';
import { SearchFieldType } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { useFormik } from 'formik';
import { SearchInspectorsHousingStocksProps } from './SearchInspectorsHousingStocks.types';

export const SearchInspectorsHousingStocks: FC<
  SearchInspectorsHousingStocksProps
> = ({
  isExtendedSearchOpen,
  handelExtendedSearchOpen,
  handleExtendedSearchClose,
  inspectors,
  hosuingManagements,
  handleApplyFilters,
  isSearchError,
  initialCity,
  handleSearchInspector,
  setForm,
}) => {
  const { values, submitForm, setFieldValue, setValues } = useFormik({
    initialValues: {
      City: initialCity,
      Street: '',
      BuildingNumber: '',
      HouseManagement: '',
      InspectorId: '',
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      setForm(values);
      handleSearchInspector();
    },
  });

  return (
    <>
      <Wrap>
        <ExtendedSearch
          isOpen={isExtendedSearchOpen}
          handleClose={handleExtendedSearchClose}
          handleOpen={handelExtendedSearchOpen}
          handleApply={() => {
            handleApplyFilters();
            submitForm();
          }}
          handleClear={() => {
            setValues({ ...values, HouseManagement: '', InspectorId: '' });
          }}
          extendedSearchContent={
            <ExtendedSearchWrap>
              <Form.Item label="Инспектор">
                <Select
                  small
                  placeholder="Выберите из списка"
                  value={values.InspectorId || undefined}
                  onChange={(value) => {
                    if (!value) {
                      setFieldValue('InspectorId', '');
                    } else {
                      setFieldValue('InspectorId', value);
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
                  value={values.HouseManagement || undefined}
                  onChange={(value) => {
                    if (!value) {
                      setFieldValue('HouseManagement', '');
                    } else {
                      setFieldValue('HouseManagement', value);
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
              SearchFieldType.Corpus,
            ]}
            customTemplate={[
              { fieldType: SearchFieldType.City, templateValue: '0.5fr' },
              { fieldType: SearchFieldType.Street, templateValue: '1fr' },
              { fieldType: SearchFieldType.House, templateValue: '0.25fr' },
            ]}
            initialValues={{
              city: values.City,
              street: values.Street,
              house: values.BuildingNumber,
            }}
            handleSubmit={(submitValues) => {
              setValues({
                ...values,
                City: submitValues.city as string,
                Street: submitValues.street as string,
                BuildingNumber: submitValues.house as string,
              });
              submitForm();
            }}
            isError={isSearchError}
          />
        </ExtendedSearch>
      </Wrap>
    </>
  );
};

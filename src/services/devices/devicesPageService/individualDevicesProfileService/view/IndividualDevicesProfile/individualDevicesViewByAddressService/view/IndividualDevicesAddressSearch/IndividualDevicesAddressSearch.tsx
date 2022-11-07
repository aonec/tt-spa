import { Checkbox } from 'antd';
import { useFormik } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { AddressSearchContainer } from 'services/addressSearchService';
import { SearchFieldType } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { DevicesSearchType } from 'services/devices/devicesPageService/individualDevicesProfileService/individualDevicesProfileService.types';
import { IndividualDevicesExtendedSearch } from '../../../IndividualDevicesExtendedSearch';
import { SearchIndividualDevicesRequestPayload } from '../../individualDevicesViewByAddressService.types';
import {
  SearchInputsWrapper,
  SearchWrapper,
  Wrapper,
} from './IndividualDevicesAddressSearch.styled';
import { IndividualDevicesAddressSearchProps } from './IndividualDevicesAddressSearch.types';

export const IndividualDevicesAddressSearch: FC<IndividualDevicesAddressSearchProps> = ({
  setIndividualDeviceSearchRequestPayload,
  filters,
  clearSearchPayload,
}) => {
  const {
    values,
    handleSubmit,
    setValues,
    setFieldValue,
  } = useFormik<SearchIndividualDevicesRequestPayload>({
    initialValues: filters,
    onSubmit: (values) => {
      setIndividualDeviceSearchRequestPayload(values);
    },
    enableReinitialize: true,
  });

  const submitWrap = async (callback: () => Promise<any>) => {
    await callback();
    handleSubmit();
  };

  return (
    <Wrapper>
      <IndividualDevicesExtendedSearch
        handleClear={clearSearchPayload}
        handleApply={(values) => {
          submitWrap(() => setValues((prev) => ({ ...prev, ...values })));
        }}
        devicesSearchType={DevicesSearchType.Address}
        values={values}
      >
        <SearchWrapper>
          <AddressSearchContainer
            fields={[
              SearchFieldType.City,
              SearchFieldType.Street,
              SearchFieldType.House,
              SearchFieldType.Corpus,
              SearchFieldType.Apartment,
            ]}
            initialValues={{
              city: values.City,
              street: values.Street,
              house: values.HouseNumber,
              corpus: values.HouseCorpus,
              apartment: values.Apartment,
            }}
            handleSubmit={(values) =>
              submitWrap(() =>
                setValues((prev) => ({
                  ...prev,
                  City: values.city,
                  Street: values.street,
                  HouseNumber: values.house,
                  HouseCorpus: values.corpus,
                  Apartment: values.apartment,
                }))
              )
            }
            customTemplate={[
              {
                fieldType: SearchFieldType.Street,
                templateValue: '0.8fr',
              },
            ]}
          />
          <SearchInputsWrapper>
            <Checkbox
              checked={values.IsAlsoClosing}
              onChange={(event) =>
                submitWrap(() =>
                  setFieldValue('IsAlsoClosing', event.target.checked)
                )
              }
            >
              Закрытые приборы
            </Checkbox>
          </SearchInputsWrapper>
        </SearchWrapper>
      </IndividualDevicesExtendedSearch>
    </Wrapper>
  );
};

import { useFormik } from 'formik';
import React, { FC, useState } from 'react';
import { AddressSearchContainer } from 'services/addressSearchService';
import { SearchFieldType } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { DevicesSearchType } from 'services/devices/devicesPageService/devicesPageService.types';
import { IndividualDevicesExtendedSearch } from '../../../IndividualDevicesExtendedSearch';
import { CheckboxSC } from '../../../individualDevicesViewBySerialNumberService/view/SerialNumberSearch/SerialNumberSearch.styled';
import { SearchIndividualDevicesRequestPayload } from '../../individualDevicesViewByAddressService.types';
import {
  SearchInputsWrapper,
  SearchWrapper,
  Wrapper,
} from './IndividualDevicesAddressSearch.styled';
import { IndividualDevicesAddressSearchProps } from './IndividualDevicesAddressSearch.types';
import { ClearIconSC } from 'ui-kit/ExtendedSearch/ExtendedSearch.styled';
import { Button } from 'ui-kit/Button';

export const IndividualDevicesAddressSearch: FC<
  IndividualDevicesAddressSearchProps
> = ({
  setIndividualDeviceSearchRequestPayload,
  filters,
  clearSearchPayload,
  mountPlaces,
}) => {
  const [isExendedSearchOpen, setIsExendedSearchOpen] = useState(false);

  const { values, handleSubmit, setValues, setFieldValue, resetForm } =
    useFormik<SearchIndividualDevicesRequestPayload>({
      initialValues: filters,
      onSubmit: (values) => {
        setIndividualDeviceSearchRequestPayload(values);
      },
      enableReinitialize: true,
    });

  const submitWrap = async (callback: () => Promise<unknown>) => {
    await callback();
    handleSubmit();
  };

  return (
    <Wrapper>
      <IndividualDevicesExtendedSearch
        handleClear={() => {
          clearSearchPayload();
        }}
        handleApply={(values) => {
          submitWrap(() => setValues((prev) => ({ ...prev, ...values })));
        }}
        devicesSearchType={DevicesSearchType.Address}
        values={values}
        mountPlaces={mountPlaces}
        isOpen={isExendedSearchOpen}
        setIsOpen={setIsExendedSearchOpen}
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
                })),
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
            <CheckboxSC
              checked={values.IsAlsoClosing}
              onChange={(event) =>
                submitWrap(() =>
                  setFieldValue('IsAlsoClosing', event.target.checked),
                )
              }
            >
              Закрытые приборы
            </CheckboxSC>
            <Button
              type="ghost"
              onClick={() => {
                clearSearchPayload();
                resetForm();
              }}
              size="s"
              icon={<ClearIconSC />}
            >
              Сбросить
            </Button>
          </SearchInputsWrapper>
        </SearchWrapper>
      </IndividualDevicesExtendedSearch>
    </Wrapper>
  );
};

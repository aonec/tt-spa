import { SelectSC } from '01/shared/ui/Fields';
import { Checkbox } from 'antd';
import { useFormik } from 'formik';
import React, { FC, useState } from 'react';
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

export const IndividualDevicesAddressSearch: FC<IndividualDevicesAddressSearchProps> = ({}) => {
  const [
    initialValues,
    setInitialValues,
  ] = useState<SearchIndividualDevicesRequestPayload>({
    City: '',
    Street: '',
    HouseNumber: '',
    Apartment: '',
    HouseCorpus: '',
    Model: '',
    SerialNumber: '',
    MountPlace: '',
    Resource: null,
    ApartmentStatus: null,
    ClosingReason: null,
    ExpiresCheckingDateAt: null,
    IsAlsoClosing: false,
  });

  const {
    values,
    setFieldValue,
  } = useFormik<SearchIndividualDevicesRequestPayload>({
    initialValues,
    onSubmit: () => {},
    enableReinitialize: true,
  });

  return (
    <Wrapper>
      <IndividualDevicesExtendedSearch
        handleApply={(values) =>
          setInitialValues((prev) => ({ ...prev, ...values }))
        }
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
              setInitialValues((prev) => ({
                ...prev,
                City: values.city,
                Street: values.street,
                HouseNumber: values.house,
                HouseCorpus: values.corpus,
                Apartment: values.apartment,
              }))
            }
            customTemplate={[
              {
                fieldType: SearchFieldType.Street,
                templateValue: '0.8fr',
              },
            ]}
          />
          <SearchInputsWrapper>
            <Checkbox>Закрытые приборы</Checkbox>
          </SearchInputsWrapper>
        </SearchWrapper>
      </IndividualDevicesExtendedSearch>
    </Wrapper>
  );
};

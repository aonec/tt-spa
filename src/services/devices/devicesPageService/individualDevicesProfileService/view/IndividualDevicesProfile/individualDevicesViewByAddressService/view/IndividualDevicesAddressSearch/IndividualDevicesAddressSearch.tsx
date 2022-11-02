import { SelectSC } from '01/shared/ui/Fields';
import { Checkbox } from 'antd';
import { useFormik } from 'formik';
import React, { FC } from 'react';
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
  const initialValues = {
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
  };

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
        handleApply={console.log}
        devicesSearchType={DevicesSearchType.Address}
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
            handleSubmit={console.log}
            customTemplate={[
              {
                fieldType: SearchFieldType.Street,
                templateValue: '0.8fr',
              },
            ]}
          />
          <SearchInputsWrapper>
            <SelectSC placeholder="Ресурс"></SelectSC>
            <Checkbox>Закрытые приборы</Checkbox>
          </SearchInputsWrapper>
        </SearchWrapper>
      </IndividualDevicesExtendedSearch>
    </Wrapper>
  );
};

import React, { FC, useState } from 'react';
import { ExtendedSearch } from '01/shared/ui/ExtendedSearch';
import { AddressSearchContainer } from 'services/addressSearchService';
import { SearchFieldType } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { IndividualDevicesExtendedSearchProps } from './IndividualDevicesExtendedSearch.types';
import {
  DevicesSearchType,
  SearchIndividualDevicesParams,
} from '../../../individualDevicesProfileService.types';
import {
  FirstLineWrapper,
  SecondLineWrapper,
} from './IndividualDevicesExtendedSearch.styled';
import { FormItem } from 'ui-kit/FormItem';
import { InputSC, SelectSC } from '01/shared/ui/Fields';
import { SearchIcon } from 'ui-kit/icons';
import { useFormik } from 'formik';

export const IndividualDevicesExtendedSearch: FC<IndividualDevicesExtendedSearchProps> = ({
  children,
  devicesSearchType,
  handleApply,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { values } = useFormik<SearchIndividualDevicesParams>({
    initialValues: {
      City: '',
      Street: '',
      HouseNumber: '',
      HouseCorpus: '',
      Model: '',
      SerialNumber: '',
      MountPlace: '',
      Resource: null,
      ApartmentStatus: null,
      ClosingReason: null,
      ExpiresCheckingDateAt: null,
    },
    onSubmit: () => {},
  });

  return (
    <ExtendedSearch
      isOpen={isOpen}
      handleOpen={() => setIsOpen(true)}
      handleClose={() => setIsOpen(false)}
      handleApply={() => {
        handleApply(values);
        setIsOpen(false);
      }}
      extendedSearchContent={
        <>
          <AddressSearchContainer
            showLabels
            fields={[
              SearchFieldType.City,
              SearchFieldType.Street,
              SearchFieldType.House,
              SearchFieldType.Corpus,
              SearchFieldType.Apartment,
            ]}
            handleSubmit={() => {}}
            disabledFields={
              devicesSearchType === DevicesSearchType.SearialNumber
                ? [SearchFieldType.Apartment]
                : undefined
            }
            customTemplate={[
              {
                fieldType: SearchFieldType.City,
                templateValue: '1.5fr',
              },
              {
                fieldType: SearchFieldType.Street,
                templateValue: '1.5fr',
              },
              {
                fieldType: SearchFieldType.House,
                templateValue: '0.45fr',
              },
              {
                fieldType: SearchFieldType.Corpus,
                templateValue: '0.45fr',
              },
              {
                fieldType: SearchFieldType.Apartment,
                templateValue: '0.45fr',
              },
            ]}
          />
          <FirstLineWrapper>
            <FormItem label="Ресурс">
              <SelectSC placeholder="Ресурс"></SelectSC>
            </FormItem>
            <FormItem label="Статус кв">
              <SelectSC placeholder="Статус кв"></SelectSC>
            </FormItem>
            <FormItem label="Модель прибора">
              <InputSC placeholder="Модель прибора" prefix={<SearchIcon />} />
            </FormItem>
            <FormItem label="Номер прибора">
              <InputSC
                disabled={devicesSearchType === DevicesSearchType.Address}
                placeholder="Номер прибора"
              />
            </FormItem>
          </FirstLineWrapper>
          <SecondLineWrapper>
            <FormItem label="Место установки прибора">
              <SelectSC placeholder="Место установки прибора"></SelectSC>
            </FormItem>
            <FormItem label="Причина закрытия ИПУ">
              <SelectSC placeholder="Причина закрытия ИПУ"></SelectSC>
            </FormItem>
            <FormItem label="Дата окoнчания поверки">
              <SelectSC placeholder="Дата окoнчания поверки"></SelectSC>
            </FormItem>
          </SecondLineWrapper>
        </>
      }
    >
      {children}
    </ExtendedSearch>
  );
};

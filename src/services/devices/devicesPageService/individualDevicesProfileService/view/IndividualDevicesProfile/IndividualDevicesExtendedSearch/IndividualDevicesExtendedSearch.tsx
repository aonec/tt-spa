import React, { FC, useState } from 'react';
import { ExtendedSearch } from '01/shared/ui/ExtendedSearch';
import { AddressSearchContainer } from 'services/addressSearchService';
import { SearchFieldType } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { IndividualDevicesExtendedSearchProps } from './IndividualDevicesExtendedSearch.types';
import { DevicesSearchType } from '../../../individualDevicesProfileService.types';

export const IndividualDevicesExtendedSearch: FC<IndividualDevicesExtendedSearchProps> = ({
  children,
  devicesSearchType,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ExtendedSearch
      isOpen={isOpen}
      handleOpen={() => setIsOpen(true)}
      handleClose={() => setIsOpen(false)}
      handleApply={() => {
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
                templateValue: '0.333fr',
              },
              {
                fieldType: SearchFieldType.Street,
                templateValue: '0.333fr',
              },
              {
                fieldType: SearchFieldType.House,
                templateValue: '0.111fr',
              },
              {
                fieldType: SearchFieldType.Corpus,
                templateValue: '0.111fr',
              },
              {
                fieldType: SearchFieldType.Apartment,
                templateValue: '0.111fr',
              },
            ]}
          />
        </>
      }
    >
      {children}
    </ExtendedSearch>
  );
};

import React, { FC, useState } from 'react';
import { Wrapper } from './SearchHousingStock.styled';
import { SearchHousingStockProps } from './SearchHousingStock.types';
import { ExtendedSearch } from 'ui-kit/ExtendedSearch';
import dayjs from 'api/dayjs';
import { SubscribersConsumptionExtendedSearch } from '../SubscribersConsumptionExtendedSearch';
import { useFormik } from 'formik';
import { AddressSearchContainer } from 'services/addressSearchService';
import { SearchFieldType } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';

export const SearchHousingStock: FC<SearchHousingStockProps> = ({
  filter,
  setFilter,
  housingStockAddress,
  setHousingStockAddress,
  isNothingFound,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const isExcluded =
    dayjs().diff(dayjs(filter?.DateLastCheckFrom), 'month') >= 3;

  const { values, submitForm, resetForm, setFieldValue } = useFormik({
    initialValues: {
      ColdWaterSupply: filter?.ColdWaterSupply,
      Electricity: filter?.Electricity,
      HotWaterSupply: filter?.HotWaterSupply,
      Heat: filter?.Heat,
      'ColdWaterSupplyFilter.From': filter?.['ColdWaterSupplyFilter.From'],
      'ColdWaterSupplyFilter.To': filter?.['ColdWaterSupplyFilter.To'],
      'ElectricityFilter.From': filter?.['ElectricityFilter.From'],
      'ElectricityFilter.To': filter?.['ElectricityFilter.To'],
      'HotWaterSupplyFilter.From': filter?.['HotWaterSupplyFilter.From'],
      'HotWaterSupplyFilter.To': filter?.['HotWaterSupplyFilter.To'],
      'HeatFilter.From': filter?.['HeatFilter.From'],
      'HeatFilter.To': filter?.['ElectricityFilter.To'],
      ExcludeApartments: isExcluded,
    },
    onSubmit: (values) => {
      setFilter(values);
    },
  });

  return (
    <Wrapper>
      <ExtendedSearch
        isOpen={isOpen}
        handleApply={submitForm}
        handleClear={resetForm}
        handleClose={close}
        handleOpen={open}
        extendedSearchContent={
          <SubscribersConsumptionExtendedSearch
            values={values}
            setFieldValue={setFieldValue}
          />
        }
      >
        <AddressSearchContainer
          initialValues={{
            city: housingStockAddress.City,
            street: housingStockAddress.Street,
            house: housingStockAddress.BuildingNumber,
            corpus: housingStockAddress.Corpus,
          }}
          fields={[
            SearchFieldType.City,
            SearchFieldType.Street,
            SearchFieldType.House,
            SearchFieldType.Corpus,
          ]}
          handleSubmit={(address) => {
            const { city, corpus, house, street } = address;
            if (!city || !house || !street) {
              return null;
            }

            setHousingStockAddress({
              City: city,
              BuildingNumber: house,
              Street: street,
              Corpus: corpus || undefined,
            });
          }}
          isError={isNothingFound}
        />
      </ExtendedSearch>
    </Wrapper>
  );
};

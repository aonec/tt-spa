import { ExtendedSearch } from 'ui-kit/ExtendedSearch';
import { useFormik } from 'formik';
import dayjs from 'api/dayjs';
import React, { FC, useState } from 'react';
import {
  SearchFieldsWrapper,
  SelectCitySC,
  SelectManagingFirmSC,
  Wrapper,
} from './ManagingFirmSearch.styled';
import {
  ManagingFirmSearchProps,
  SubscriberStatisticsFormik,
} from './ManagingFirmSearch.types';
import { SubscribersConsumptionExtendedSearch } from 'services/statistics/subscribersConsumptionService/displayStatisticsListByHousesService/view/SubscribersConsumptionExtendedSearch';

export const ManagingFirmSearch: FC<ManagingFirmSearchProps> = ({
  cities,
  managingFirms,
  selectManagingFirm,
  selectedManagingFirm,
  selectCity,
  selectedCity,
  setFilter,
  filter,
  managingFirmsLoading,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const isExcluded =
    dayjs().diff(dayjs(filter?.DateLastCheckFrom), 'month') >= 3;

  const { values, setFieldValue, resetForm, submitForm } =
    useFormik<SubscriberStatisticsFormik>({
      initialValues: {
        ColdWaterSupply: filter?.ColdWaterSupply || false,
        Electricity: filter?.Electricity || false,
        HotWaterSupply: filter?.HotWaterSupply || false,
        Heat: filter?.Heat,
        'ColdWaterSupplyFilter.From': filter?.['ColdWaterSupplyFilter.From'],
        'ColdWaterSupplyFilter.To': filter?.['ColdWaterSupplyFilter.To'],
        'ElectricityFilter.From': filter?.['ElectricityFilter.From'],
        'ElectricityFilter.To': filter?.['ElectricityFilter.To'],
        'HotWaterSupplyFilter.From': filter?.['HotWaterSupplyFilter.From'],
        'HotWaterSupplyFilter.To': filter?.['HotWaterSupplyFilter.To'],
        'HeatFilter.From': filter?.['HeatFilter.From'],
        'HeatFilter.To': filter?.['ElectricityFilter.To'],
        DateLastCheckFrom: filter?.DateLastCheckFrom,
        DateLastCheckTo: filter?.DateLastCheckTo,
        ExcludeApartments: isExcluded,
      },
      onSubmit: setFilter,
    });

  const isManagingFirmSelectDisabled =
    managingFirmsLoading || managingFirms.length === 0;

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
        <SearchFieldsWrapper>
          <SelectCitySC
            small
            placeholder="Выберите город"
            value={selectedCity}
            onChange={(city) => selectCity(String(city))}
          >
            {cities.map((city) => (
              <SelectCitySC.Option key={city} value={city}>
                {city}
              </SelectCitySC.Option>
            ))}
          </SelectCitySC>
          <SelectManagingFirmSC
            small
            value={selectedManagingFirm || undefined}
            onChange={(value) => selectManagingFirm(String(value))}
            placeholder="Выберите домоуправление"
            disabled={isManagingFirmSelectDisabled}
          >
            {managingFirms.map((managingFirm) => {
              const key = managingFirm.id;
              const value = managingFirm.name;
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

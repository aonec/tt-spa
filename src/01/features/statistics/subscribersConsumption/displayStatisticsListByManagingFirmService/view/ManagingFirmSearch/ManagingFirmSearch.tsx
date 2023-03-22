import { ExtendedSearch } from '01/shared/ui/ExtendedSearch';
import { useFormik } from 'formik';
import moment from 'moment';
import React, { FC, useState } from 'react';
import { SubscribersConsumptionExtendedSearch } from '../../../components/SubscribersConsumptionExtendedSearch';
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
    moment().diff(moment(filter?.DateLastCheckFrom), 'month') >= 3;

  const { values, setFieldValue, resetForm, submitForm } =
    useFormik<SubscriberStatisticsFormik>({
      initialValues: {
        ColdWaterSupply: filter?.ColdWaterSupply || false,
        Electricity: filter?.Electricity || false,
        HotWaterSupply: filter?.HotWaterSupply || false,
        ColdWaterSupplyConsumptionFrom: filter?.ColdWaterSupplyConsumptionFrom,
        ColdWaterSupplyConsumptionTo: filter?.ColdWaterSupplyConsumptionTo,
        ElectricitySupplyConsumptionFrom:
          filter?.ElectricitySupplyConsumptionFrom,
        ElectricitySupplyConsumptionTo: filter?.ElectricitySupplyConsumptionTo,
        HotWaterSupplyConsumptionFrom: filter?.HotWaterSupplyConsumptionFrom,
        HotWaterSupplyConsumptionTo: filter?.HotWaterSupplyConsumptionTo,
        DateLastCheckFrom: filter?.DateLastCheckFrom,
        DateLastCheckTo: filter?.DateLastCheckTo,
        ExcludeApartments: isExcluded,
      },
      enableReinitialize: true,
      onSubmit: setFilter,
    });

  const isManagingFirmSelectDisabled =
    managingFirmsLoading || managingFirms.length === 0;

  return (
    <Wrapper>
      <ExtendedSearch
        isOpen={isOpen}
        handleApply={submitForm}
        handleClear={() => {
          resetForm();
          submitForm();
        }}
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

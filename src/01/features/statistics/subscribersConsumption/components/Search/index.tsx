import axios from '01/axios';
import {
  $existingCities,
  ExistingCitiesGate,
} from '01/features/housingStocks/displayHousingStockCities/models';
import { fromEnter } from '01/features/housingStocks/displayHousingStocks/components/HousingStockFilter/HousingStockFilter';
import {
  $existingStreets,
  ExistingStreetsGate,
} from '01/features/housingStocks/displayHousingStockStreets/model';
import { useOnEnterSwitch } from '01/features/readings/accountingNodesReadings/components/Filter';
import { ExtendedSearch } from '01/shared/ui/ExtendedSearch';
import {
  StyledAutocomplete,
  SelectSC,
} from '01/shared/ui/Fields';
import { Grid } from '01/shared/ui/Layout/Grid';
import { useAutocomplete } from '01/_pages/MetersPage/hooks/useFilter';
import { useForm } from 'effector-forms/dist';
import { useEvent, useStore } from 'effector-react';
import { useFormik } from 'formik';
import moment from 'moment';
import { HousingStockListResponsePagedList } from 'myApi';
import React, { useState } from 'react';
import { SubscriberStatisticsFormik } from '../../displayStatisticsListByManagingFirmService/view/ManagingFirmSearch/ManagingFirmSearch.types';
import {
  setSelectedHousingStockId,
  subscribersConsumptionFindForm,
  subscribersConsumptionService,
} from '../../models';
import { SubscribersConsumptionExtendedSearch } from '../SubscribersConsumptionExtendedSearch';
import { Wrapper } from './Search.styled';

const { inputs, outputs } = subscribersConsumptionService;

export const Search: React.FC = () => {
  const [isExtendedSearchOpen, setIsExtendedSearchOpen] = useState(false);
  const openExtendedSearchOpen = () => setIsExtendedSearchOpen(true);
  const closeExtendedSearchOpen = () => setIsExtendedSearchOpen(false);

  const { fields, submit } = useForm(subscribersConsumptionFindForm);

  const filter = useStore(outputs.$subscriberStatisticsFilter);

  const setFilter = useEvent(inputs.setSubscriberStatisticsFilter);

  const isExcluded =
    moment().diff(moment(filter?.DateLastCheckFrom), 'month') >= 3;

  const {
    values,
    setFieldValue,
    resetForm,
    submitForm,
  } = useFormik<SubscriberStatisticsFormik>({
    initialValues: {
      ColdWaterSupply: filter?.ColdWaterSupply,
      Electricity: filter?.Electricity,
      HotWaterSupply: filter?.HotWaterSupply,
      ColdWaterSupplyConsumptionFrom: filter?.ColdWaterSupplyConsumptionFrom,
      ColdWaterSupplyConsumptionTo: filter?.ColdWaterSupplyConsumptionTo,
      ElectricitySupplyConsumptionFrom:
        filter?.ElectricitySupplyConsumptionFrom,
      ElectricitySupplyConsumptionTo: filter?.ElectricitySupplyConsumptionTo,
      HotWaterSupplyConsumptionFrom: filter?.HotWaterSupplyConsumptionFrom,
      HotWaterSupplyConsumptionTo: filter?.HotWaterSupplyConsumptionTo,
      ExcludeApartments: isExcluded,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      setFilter(values);
    },
  });

  const {
    keyDownEnterGuardedHandler,
    refs: [cityRef, streetRef, homeNumberRef],
  } = useOnEnterSwitch(3);

  const existingStreets = useStore($existingStreets);

  const { match: streetMatch, options } = useAutocomplete(
    fields.street.value,
    existingStreets
  );

  function onSendHandler() {
    if (fields.city && fields.street && fields.house) submit();
  }

  async function onFindHandler() {
    const city = fields.city.value;
    const street = fields.street.value;
    const house = fields.house.value;

    if (!city || !street || !house) return;

    try {
      const res: HousingStockListResponsePagedList = await axios.get(
        'HousingStocks',
        {
          params: {
            City: city,
            Street: street,
            HousingStockNumber: house,
            PageSize: 1,
            PageNumber: 1,
          },
        }
      );

      if (!res.items) return;

      const housingStock = res.items[0];

      if (!housingStock) return;

      setSelectedHousingStockId(housingStock.id);
    } catch (error) {}
  }

  const cities = useStore($existingCities);

  const baseSearch = (
    <ExtendedSearch
      isOpen={isExtendedSearchOpen}
      handleOpen={openExtendedSearchOpen}
      handleClose={closeExtendedSearchOpen}
      handleApply={submitForm}
      handleClear={resetForm}
      extendedSearchContent={
        <SubscribersConsumptionExtendedSearch
          values={values}
          setFieldValue={setFieldValue}
        />
      }
    >
      <>
        <ExistingCitiesGate />
        <ExistingStreetsGate City={fields.city.value} />
        <Grid temp="0.5fr 1fr 0.2fr" gap="15px">
          <SelectSC
            onBlur={onFindHandler}
            placeholder="Город"
            ref={cityRef}
            onKeyDown={keyDownEnterGuardedHandler(0)}
            onChange={fields.city.onChange as any}
            value={fields.city.value}
          >
            {cities?.map((elem, index) => (
              <SelectSC.Option key={index} value={elem}>
                {elem}
              </SelectSC.Option>
            ))}
          </SelectSC>
          <StyledAutocomplete
            onBlur={onFindHandler}
            placeholder="Улица"
            ref={streetRef}
            value={fields.street.value}
            onChange={fields.street.onChange}
            onKeyDown={(e) => {
              fromEnter(() => fields.street.onChange(streetMatch))(e);
              keyDownEnterGuardedHandler(1)(e);
            }}
            options={options}
            onClick={() => {
              fields.street.onChange('');
              fields.house.onChange('');
            }}
          />
          <StyledAutocomplete
            onBlur={onFindHandler}
            placeholder="Дом"
            value={fields.house.value}
            onChange={fields.house.onChange}
            ref={homeNumberRef}
            onClick={() => fields.house.onChange('')}
            onKeyDown={(e) => {
              fromEnter(onSendHandler)(e);
              keyDownEnterGuardedHandler(2)(e);
            }}
          />
        </Grid>
      </>
    </ExtendedSearch>
  );

  return <Wrapper>{baseSearch}</Wrapper>;
};

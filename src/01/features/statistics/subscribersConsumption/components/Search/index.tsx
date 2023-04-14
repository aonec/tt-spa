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
import { Grid } from '01/shared/ui/Layout/Grid';
import { useAutocomplete } from '01/hooks/useFilter';
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
import { Select } from 'ui-kit/Select';
import { AutoComplete } from 'ui-kit/AutoComplete';

const { inputs, outputs } = subscribersConsumptionService;

export const Search: React.FC<{ isHousingStockHasCorpuses: boolean }> = ({
  isHousingStockHasCorpuses,
}) => {
  const [isExtendedSearchOpen, setIsExtendedSearchOpen] = useState(false);
  const openExtendedSearchOpen = () => setIsExtendedSearchOpen(true);
  const closeExtendedSearchOpen = () => setIsExtendedSearchOpen(false);

  const existingStreets = useStore($existingStreets);
  const cities = useStore($existingCities);

  const { fields, submit } = useForm(subscribersConsumptionFindForm);

  const filter = useStore(outputs.$subscriberStatisticsFilter);

  const setFilter = useEvent(inputs.setSubscriberStatisticsFilter);

  const isExcluded =
    moment().diff(moment(filter?.DateLastCheckFrom), 'month') >= 3;

  const { values, setFieldValue, resetForm, submitForm } =
    useFormik<SubscriberStatisticsFormik>({
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

  const {
    keyDownEnterGuardedHandler,
    refs: [cityRef, streetRef, homeNumberRef, corpusRef],
  } = useOnEnterSwitch(isHousingStockHasCorpuses ? 4 : 3);

  const { match: streetMatch, options } = useAutocomplete(
    fields.street.value,
    existingStreets,
  );

  function onSendHandler() {
    if (fields.city && fields.street && fields.house) submit();
  }

  async function onFindHandler() {
    const city = fields.city.value;
    const street = fields.street.value;
    const house = fields.house.value;
    const corpus = fields.corpus.value;

    if (!city || !street || !house) return;

    try {
      const res: HousingStockListResponsePagedList = await axios.get(
        'HousingStocks',
        {
          params: {
            City: city,
            Street: street,
            HousingStockNumber: house,
            Corpus: corpus,
            PageSize: 1,
            PageNumber: 1,
          },
        },
      );

      if (!res.items) return;

      const housingStock = res.items[0];

      if (!housingStock) return;

      setSelectedHousingStockId(housingStock.id);
    } catch (error) {}
  }

  const temp = isHousingStockHasCorpuses
    ? '0.5fr 1fr 0.2fr 0.2fr'
    : '0.5fr 1fr 0.2fr';

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
        <Grid temp={temp} gap="15px">
          <Select
            small
            onBlur={onFindHandler}
            placeholder="Город"
            ref={cityRef}
            onKeyDown={keyDownEnterGuardedHandler(0)}
            onChange={fields.city.onChange as any}
            value={fields.city.value}
          >
            {cities?.map((elem, index) => (
              <Select.Option key={index} value={elem}>
                {elem}
              </Select.Option>
            ))}
          </Select>
          <AutoComplete
            small
            onBlur={onFindHandler}
            placeholder="Улица"
            ref={streetRef}
            value={fields.street.value}
            onFocus={() => {
              fields.street.onChange('');
              fields.house.onChange('');
            }}
            onChange={fields.street.onChange}
            onKeyDown={(e) => {
              fromEnter(() => fields.street.onChange(streetMatch))(e);
              keyDownEnterGuardedHandler(1)(e);
            }}
            options={options}
            onSelect={() => fields.street.onChange(streetMatch)}
          />
          <AutoComplete
            small
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
          {isHousingStockHasCorpuses && (
            <AutoComplete
              small
              onBlur={onFindHandler}
              placeholder="Корпус"
              value={fields.corpus.value}
              onChange={fields.corpus.onChange}
              ref={corpusRef}
              onClick={() => fields.corpus.onChange('')}
              onKeyDown={(e) => {
                fromEnter(onSendHandler)(e);
                keyDownEnterGuardedHandler(3)(e);
              }}
            />
          )}
        </Grid>
      </>
    </ExtendedSearch>
  );

  return <Wrapper>{baseSearch}</Wrapper>;
};

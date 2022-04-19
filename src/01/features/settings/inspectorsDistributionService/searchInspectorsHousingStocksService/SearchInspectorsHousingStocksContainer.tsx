import { $existingCities } from '01/features/housingStocks/displayHousingStockCities/models';
import { $existingStreets } from '01/features/housingStocks/displayHousingStockStreets/model';
import { useForm } from 'effector-forms/dist';
import { useStore } from 'effector-react';
import React from 'react';
import { searchInspectorsHousingStockService } from './searchInspectorsHousingStockService.models';
import { SearchInspectorsHousingStocks } from './views/SearchInspectorsHousingStocks';
import { ExistingStreetsGate } from '01/features/housingStocks/displayHousingStockStreets/model';
import { ExistingCitiesGate } from '01/features/housingStocks/displayHousingStockCities/models';

export const SearchInspectorsHousingStocksContainer = () => {
  const form = useForm(searchInspectorsHousingStockService.forms.searchForm);

  const cities = useStore($existingCities);
  const existingStreets = useStore($existingStreets);

  return (
    <>
      <ExistingCitiesGate />
      <ExistingStreetsGate City={form.fields.City.value} />
      <SearchInspectorsHousingStocks
        form={form}
        cities={cities}
        existingStreets={existingStreets}
      />
    </>
  );
};

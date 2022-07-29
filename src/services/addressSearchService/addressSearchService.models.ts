import { $existingCities } from "../../01/features/housingStocks/displayHousingStockCities/models";
import { $existingStreets } from "../../01/features/housingStocks/displayHousingStockStreets/model";

export const addressSearchService = {
  outputs: {
    cities: $existingCities,
    streets: $existingStreets,
  },
};

import {
  BuildingWithCoordinatesResponse,
  BuildingWithCoordinatesResponsePagedList,
} from 'api/types';

export type SearchAddressesProps = {
  existingHousingStocks: BuildingWithCoordinatesResponsePagedList | null;
  handleSelect: (building: BuildingWithCoordinatesResponse) => void;
};

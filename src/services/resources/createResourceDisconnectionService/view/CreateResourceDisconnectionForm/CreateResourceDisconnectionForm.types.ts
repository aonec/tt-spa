import {
  EResourceDisconnectingType,
  EResourceType,
  HeatingStationResponse,
  HousingStockShortResponse,
  ResourceDisconnectingCreateRequest,
} from 'myApi';
import { ExistingStreetWithHousingStocks } from '../CreateResourceDisconnectionModal/CreateResourceDisconnectionModal.types';

export type CreateResourceDisconnectionFormProps = {
  cities: string[] | null;
  addressesFromHeatingStation: HousingStockShortResponse[];
  heatingStations: HeatingStationResponse[];
  existingHousingStocks: ExistingStreetWithHousingStocks[];
  selectedCity: string;
  formId: string;
  handleSubmit: (payload: ResourceDisconnectingCreateRequest) => void;
  handleSelectCity: (city: string) => void;
  handleSelectHeatingStation: (id: string) => void;
};

export type CreateResourceDisconnectionFormTypes = {
  resource: EResourceType | null;
  disconnectingType: EResourceDisconnectingType | null;
  sender: string;

  heatingStationId?: string | null;
  housingStockIds: number[];

  startDate: string;
  startHour: string;

  endDate: string;
  endHour: string;
};

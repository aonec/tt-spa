import {
  EIndividualDeviceReportOption,
  EResourceType,
  HouseManagementResponse,
  HouseManagementWithStreetsResponse,
} from 'myApi';

export type ReportFiltrationFormProps = {
  existingCities: string[] | null;
  houseManagements: HouseManagementResponse[] | null;
  addressesWithHouseManagements: HouseManagementWithStreetsResponse[];
  filtrationValues: ReportFiltrationFormValues;
  formId: string;
  setFiltrationValues: (payload: ReportFiltrationFormValues) => void;
};

export type Address = {
  id: number;
  addressString: string;
};

export enum ReportDatePeriod {
  LastDay = 'LastDay',
  LastSevenDays = 'LastSevenDays',
  FromStartOfMonth = 'FromStartOfMonth',
  PreviousMonth = 'PreviousMonth',
  AnyPeriod = 'AnyPeriod',
}

export type ReportFiltrationFormValues = {
  city: null | string;
  houseManagement: null | string;
  housingStockId: null | number;
  resource: null | EResourceType;
  reportOption: null | EIndividualDeviceReportOption;
  from: null | moment.Moment;
  to: null | moment.Moment;
};

import {
  ResourceShortNamesDictionary,
  ReportOptionsDictionary,
} from 'dictionaries';
import {
  HouseManagementResponse,
  EResourceType,
  HouseManagementWithStreetsResponse,
} from 'myApi';
import { ReportPeriodDictionary } from './ReportFiltrationForm/ReportFiltrationForm.constants';
import {
  ReportDatePeriod,
  ReportFiltrationFormValues,
} from '../../reportViewService.types';
import { getAddresses } from './ReportFiltrationForm/ReportFiltrationForm.utils';

const getResourcesText = (resourcesList: EResourceType[]) => {
  return resourcesList
    .map((resource) => ResourceShortNamesDictionary[resource])
    .join(', ');
};

const getPeriodText = (
  reportDatePeriod: ReportDatePeriod | null,
  from: moment.Moment | null,
  to: moment.Moment | null,
) => {
  if (!reportDatePeriod) return null;

  if (reportDatePeriod !== ReportDatePeriod.AnyPeriod) {
    return ReportPeriodDictionary[reportDatePeriod];
  }

  if (!from || !to) return null;

  return `${from.format('DD.MM.YYYY')} — ${to.format('DD.MM.YYYY')}`;
};

export const getFiltersList = (
  filtrationValues: ReportFiltrationFormValues,
  houseManagements: HouseManagementResponse[] | null,
  addressesWithHouseManagements: HouseManagementWithStreetsResponse[],
) => {
  const resourcesText = getResourcesText(filtrationValues.resources);

  const addresses = getAddresses(addressesWithHouseManagements);

  const selectedAddress =
    filtrationValues.housingStockId &&
    addresses.find((address) => address.id === filtrationValues.housingStockId);

  const houseManagement = houseManagements?.find(
    (houseManagement) =>
      houseManagement.id === filtrationValues.houseManagement,
  );

  const period = getPeriodText(
    filtrationValues.reportDatePeriod,
    filtrationValues.from,
    filtrationValues.to,
  );

  const reportOption =
    filtrationValues.reportOption &&
    ReportOptionsDictionary[filtrationValues.reportOption];

  return [
    filtrationValues.city,
    !selectedAddress ? houseManagement?.name : null,
    selectedAddress && selectedAddress.addressString,
    resourcesText,
    period,
    reportOption,
  ].filter(Boolean);
};

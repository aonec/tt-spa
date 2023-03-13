import {
  ResourceShortNamesDictionary,
  ReportOptionsDictionary,
} from 'dictionaries';
import { HouseManagementResponse, EResourceType } from 'myApi';
import {
  addressesCountTexts,
  ReportPeriodDictionary,
  selectedCountTexts,
} from './ReportFiltrationForm/ReportFiltrationForm.constants';
import {
  ReportDatePeriod,
  ReportFiltrationFormValues,
} from '../../reportViewService.types';
import { getCountText } from 'utils/getCountText';

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
) => {
  const resourcesText = getResourcesText(filtrationValues.resources);

  const selectedAddress = filtrationValues.housingStockIds.length
    ? `${getCountText(
        filtrationValues.housingStockIds.length,
        selectedCountTexts,
      )} ${filtrationValues.housingStockIds.length} ${getCountText(
        filtrationValues.housingStockIds.length,
        addressesCountTexts,
      )}`
    : null;

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
    houseManagement?.name || null,
    selectedAddress,
    resourcesText,
    period,
    reportOption,
  ].filter(Boolean);
};

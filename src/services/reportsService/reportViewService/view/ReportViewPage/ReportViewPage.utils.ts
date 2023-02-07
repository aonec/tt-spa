import {
  ResourceShortNamesDictionary,
  ReportOptionsDictionary,
} from 'dictionaries';
import {
  ReportDatePeriod,
  ReportFiltrationFormValues,
} from './ReportFiltrationForm/ReportFiltrationForm.types';
import { HouseManagementResponse, EResourceType } from 'myApi';
import { ReportPeriodDictionary } from './ReportFiltrationForm/ReportFiltrationForm.constants';

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
    houseManagement?.name,
    resourcesText,
    period,
    reportOption,
  ].filter(Boolean);
};

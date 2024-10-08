import {
  EIndividualDeviceReportOption,
  EResourceType,
  HouseManagementWithStreetsResponse,
  StreetWithBuildingNumbersResponse,
} from 'api/types';
import { getAddressSearchData } from 'services/resources/resourceConsumptionService/resourceConsumptionService.utils';
import { Address } from './ReportFiltrationForm.types';
import { ReportType } from 'services/reportsService/view/ReportsPage/ReportsPage.types';
import { ReportDatePeriod } from 'services/reportsService/reportViewService/reportViewService.types';

export const getAddresses = (
  houseManagements: HouseManagementWithStreetsResponse[],
  selectedHouseManagement?: string | null,
): Address[] => {
  if (!selectedHouseManagement) {
    const streets = houseManagements.reduce(
      (acc, houseManagement) => [...acc, ...(houseManagement.streets || [])],
      [] as StreetWithBuildingNumbersResponse[],
    );

    return getAddressSearchData(streets);
  }

  const requiredHouseManagements = houseManagements.find(
    (houseManagement) => houseManagement.id === selectedHouseManagement,
  );

  return getAddressSearchData(requiredHouseManagements?.streets || []);
};

export const prepareAddressesTreeData = (
  addressesWithHouseManagements: HouseManagementWithStreetsResponse[],
  selectedHouseManagementId: string | null,
) => {
  const addressesTreeData = addressesWithHouseManagements
    .filter((houseManagement) =>
      selectedHouseManagementId
        ? houseManagement.id === selectedHouseManagementId
        : true,
    )
    .map((houseManagement) => ({
      value: houseManagement.id,
      title: houseManagement.name,
      key: houseManagement.id,
      selectable: false,
      children:
        houseManagement.streets?.map((street) => ({
          selectable: false,
          value: `${street.street} ${houseManagement.id}`,
          title: street.street || '',
          key: `${street.street} ${houseManagement.id}`,
          children:
            street.addresses?.map((address) => ({
              value: address.buildingId,
              key: address.buildingId,
              title: address.number
                ? `${street.street}, ${address.number}`
                : '',
            })) || [],
        })) || [],
    }));

  return addressesTreeData;
};

export const getAvailableResource = (reportType: ReportType) => {
  if (reportType === ReportType.HousingDevices) {
    return [EResourceType.Electricity];
  }

  return Object.values(EResourceType);
};

export const getAvailableReportDatePeriod = (
  reportOption: EIndividualDeviceReportOption | null,
) => {
  if (
    reportOption === EIndividualDeviceReportOption.DeviceCheckingDateExpiration
  ) {
    return [
      ReportDatePeriod.Expired,
      ReportDatePeriod.ExpiresInNextMonth,
      ReportDatePeriod.ExpiresInNextTwoMonth,
      ReportDatePeriod.AnyPeriod,
    ];
  }

  return [
    ReportDatePeriod.LastDay,
    ReportDatePeriod.LastSevenDays,
    ReportDatePeriod.FromStartOfMonth,
    ReportDatePeriod.PreviousMonth,
    ReportDatePeriod.AnyPeriod,
  ];
};

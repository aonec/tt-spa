import {
  IndividualDeviceReportRequestPaload,
  ReportFiltrationFormValues,
} from './reportViewService.types';

export const prepareIndividualDevicesReportData = (
  values: ReportFiltrationFormValues,
): IndividualDeviceReportRequestPaload | null => {
  if (!values.reportOption) return null;

  return {
    HousingStockId: values.housingStockId || undefined,
    HouseManagementId: values.housingStockId
      ? undefined
      : values.houseManagement || undefined,
    ReportOption: values.reportOption,
    Resources: values.resources,
    From: values.from?.format('YYYY-MM-DD'),
    To: values.to?.format('YYYY-MM-DD'),
    ClosingReasons: values.closingReasons,
  };
};

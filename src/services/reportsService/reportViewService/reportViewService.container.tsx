import React from 'react';
import { useParams } from 'react-router-dom';
import { ReportType } from '../view/ReportsPage/ReportsPage.types';
import { ReportViewPage } from './view/ReportViewPage';
import { reportViewService } from './reportViewService.model';
import { useUnit } from 'effector-react';
import {
  organizationsService,
  organizationsQuery,
} from 'services/organizations';

const { inputs, outputs, gates } = reportViewService;
const {
  ExistingCitiesGate,
  AddressesWithHouseManagementsGate,
  ReportViewGate,
} = gates;
const {
  gates: { OrganizationsGate },
} = organizationsService;

export const ReportViewContainer = () => {
  const { reportType } = useParams<{ reportType: ReportType }>();
  const {
    actJournalReportData,
    addressesWithHouseManagements,
    clearFiltrationValues,
    downloadReport,
    emloyeeReportData,
    existingCities,
    filtrationValues,
    homeownersReportData,
    houseManagements,
    housingMeteringDevicesReportData,
    individualDevicesReportData,
    isLoadingReport,
    isReportFileDownloading,
    setFiltrationValues,
    organizations,
  } = useUnit({
    setFiltrationValues: inputs.setFiltrationValues,
    downloadReport: inputs.downloadReport,
    clearFiltrationValues: inputs.clearFiltrationValues,
    existingCities: outputs.$existingCities,
    houseManagements: outputs.$houseManagements,
    addressesWithHouseManagements: outputs.$addressesWithHouseManagements,
    filtrationValues: outputs.$filtrationValues,
    isLoadingReport: outputs.$isReportLoading,
    individualDevicesReportData: outputs.$individualDevicesReportData,
    actJournalReportData: outputs.$actJournalReportData,
    housingMeteringDevicesReportData: outputs.$housingMeteringDevicesReportData,
    homeownersReportData: outputs.$homeownersReportData,
    emloyeeReportData: outputs.$emloyeeReportData,
    isReportFileDownloading: outputs.$isReportFileDownloading,
    organizations: organizationsQuery.$data,
  });

  if (!reportType) return null;

  return (
    <>
      <OrganizationsGate />
      <ReportViewGate reportType={reportType} />
      <AddressesWithHouseManagementsGate />
      <ExistingCitiesGate />
      <ReportViewPage
        reportType={reportType}
        existingCities={existingCities}
        houseManagements={houseManagements}
        addressesWithHouseManagements={addressesWithHouseManagements}
        filtrationValues={filtrationValues}
        setFiltrationValues={setFiltrationValues}
        isLoadingReport={isLoadingReport}
        individualDevicesReportData={individualDevicesReportData}
        actJournalReportData={actJournalReportData}
        housingMeteringDevicesReportData={housingMeteringDevicesReportData}
        homeownersReportData={homeownersReportData}
        emloyeeReportData={emloyeeReportData}
        isReportFileDownloading={isReportFileDownloading}
        downloadReport={() => downloadReport()}
        clearFiltrationValues={() => clearFiltrationValues()}
        organizations={organizations}
      />
    </>
  );
};

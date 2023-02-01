import React from 'react';
import { useParams } from 'react-router-dom';
import { ReportType } from '../view/ReportsPage/ReportsPage.types';
import { ReportViewPage } from './view/ReportViewPage';
import { reportViewService } from './reportViewService.model';
import { useStore } from 'effector-react';

const { outputs, gates } = reportViewService;
const { ExistingCitiesGate, AddressesWithHouseManagementsGate } = gates;

export const ReportViewContainer = () => {
  const { reportType } = useParams<{ reportType: ReportType }>();

  const existingCities = useStore(outputs.$existingCities);
  const houseManagements = useStore(outputs.$houseManagements);
  const addressesWithHouseManagements = useStore(
    outputs.$addressesWithHouseManagements
  );

  if (!reportType) return null;

  return (
    <>
      <AddressesWithHouseManagementsGate />
      <ExistingCitiesGate />
      <ReportViewPage
        reportType={reportType}
        existingCities={existingCities}
        houseManagements={houseManagements}
        addressesWithHouseManagements={addressesWithHouseManagements}
      />
    </>
  );
};

import { useUnit } from 'effector-react';
import React from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { groupReportFormId } from './groupReportService.constants';
import { groupReportService } from './groupReportService.model';
import { SendReportToEmailContainer } from './sendReportToEmailService';
import { GroupReportForm } from './view/GroupReportForm';
import {
  organizationsQuery,
  organizationsService,
} from 'services/organizations';
import { houseManagementsService } from '../houseManagementsService';
import { reportViewService } from 'services/reportsService/reportViewService';

const { inputs, outputs, gates } = groupReportService;
const { GroupReportGate } = gates;

const {
  gates: { AddressesWithHouseManagementsGate, HouseManagementsGate },
} = reportViewService;

const {
  gates: { OrganizationsGate },
} = organizationsService;

export const GroupReportContainer = () => {
  const {
    downloadReport,
    handleCloseModal,
    isDownloading,
    isFiltersLoading,
    isOpen,
    reportFilters,
    organizations,
    houseManagements,
    addressesWithHouseManagements,
    setRegularUpload,
  } = useUnit({
    isOpen: outputs.$isOpen,
    reportFilters: outputs.$reportFilters,
    isFiltersLoading: outputs.$isFiltersLoading,
    isDownloading: outputs.$isDownloading,
    handleCloseModal: inputs.closeModal,
    downloadReport: inputs.setGroupReportPayload,
    organizations: organizationsQuery.$data,
    houseManagements: houseManagementsService.outputs.$houseManagements,
    addressesWithHouseManagements:
      reportViewService.outputs.$addressesWithHouseManagements,
    setRegularUpload: inputs.setRegularUpload,
  });

  return (
    <>
      <AddressesWithHouseManagementsGate />
      <HouseManagementsGate />
      <OrganizationsGate />
      <GroupReportGate />
      <SendReportToEmailContainer />
      <FormModal
        title="Выгрузить групповой отчёт"
        formId={groupReportFormId}
        visible={isOpen}
        submitBtnText="Выгрузить отчёт"
        onCancel={() => handleCloseModal()}
        loading={isDownloading}
        form={
          <WithLoader isLoading={isFiltersLoading}>
            {reportFilters && (
              <GroupReportForm
                formId={groupReportFormId}
                handleDownload={downloadReport}
                reportFilters={reportFilters}
                organizations={organizations}
                houseManagements={houseManagements}
                addressesWithHouseManagements={addressesWithHouseManagements}
                setRegularUpload={setRegularUpload}
              />
            )}
          </WithLoader>
        }
      />
    </>
  );
};

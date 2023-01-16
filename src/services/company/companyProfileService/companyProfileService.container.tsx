import React from 'react';
import { CompanyProfile } from './view/CompanyProfile';
import { companyProfileService } from './companyProfileService.model';
import { useEvent, useStore } from 'effector-react';

const { inputs, outputs, gates } = companyProfileService;
const { FetchingCurrentManagingFirmGate } = gates;

export const CompanyProfileContainer = () => {
  const currentManagingFirm = useStore(outputs.$currentManagingFirm);
  const fetchStaffPending = useStore(outputs.$fetchStaffPending);
  const staffList = useStore(outputs.$staffList);

  const handleOpenStatusChangeModal = useEvent(
    inputs.handleOpenStatusChangeModal
  );
  const handleOpenDeleteModal = useEvent(inputs.handleOpenDeleteModal);
  const handleCatchEmployeeStatusData = useEvent(
    inputs.handleCatchEmployeeStatusData
  );
  const handleCatchEmployeeId = useEvent(inputs.handleCatchEmployeeId);

  return (
    <>
      <FetchingCurrentManagingFirmGate />
      <CompanyProfile
        currentManagingFirm={currentManagingFirm}
        staffList={staffList}
        fetchStaffPending={fetchStaffPending}
        handleOpenStatusChangeModal={() => handleOpenStatusChangeModal()}
        handleOpenDeleteModal={() => handleOpenDeleteModal()}
        handleCatchEmployeeStatusData={handleCatchEmployeeStatusData}
        handleCatchEmployeeId={handleCatchEmployeeId}
      />
    </>
  );
};

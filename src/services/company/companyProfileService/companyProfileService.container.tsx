import React from 'react';
import { CompanyProfile } from './view/CompanyProfile';
import { companyProfileService } from './companyProfileService.model';
import { useEvent, useStore } from 'effector-react';

const { inputs, outputs, gates } = companyProfileService;
const { FetchingCurrentManagingFirmGate } = gates;

export const CompanyProfileContainer = () => {
  const currentManagingFirm = useStore(outputs.$currentManagingFirm);
  const isLoadingStaff = useStore(outputs.$fetchStaffPending);
  const staffList = useStore(outputs.$staffList);
  const conractorsList = useStore(outputs.$contractorsList);
  const isLoadingContractors = useStore(outputs.$isLoadingContractors);

  const handleOpenStatusChangeModal = useEvent(
    inputs.handleOpenStatusChangeModal
  );
  const handleOpenDeleteModal = useEvent(inputs.handleOpenDeleteModal);
  const handleCatchEmployeeStatusData = useEvent(
    inputs.handleCatchEmployeeStatusData
  );
  const handleCatchEmployeeId = useEvent(inputs.handleCatchEmployeeId);
  const handleOpenCreateEmployeeModal = useEvent(
    inputs.handleOpenCreateEmployeeModal
  );
  const handleOpenAddContractorModal = useEvent(
    inputs.handleOpenAddContractorModal
  );
  const catchContractorId = useEvent(inputs.catchContractorId);
  const handleOpenEditContractorModal = useEvent(
    inputs.handleOpenEditContractorModal
  );
  const catchContractorData = useEvent(inputs.catchContractorData);

  return (
    <>
      <FetchingCurrentManagingFirmGate />
      <CompanyProfile
        currentManagingFirm={currentManagingFirm}
        staffList={staffList}
        isLoadingStaff={isLoadingStaff}
        handleOpenStatusChangeModal={() => handleOpenStatusChangeModal()}
        handleOpenDeleteModal={() => handleOpenDeleteModal()}
        handleCatchEmployeeStatusData={handleCatchEmployeeStatusData}
        handleCatchEmployeeId={handleCatchEmployeeId}
        handleOpenCreateEmployeeModal={() => handleOpenCreateEmployeeModal()}
        conractorsList={conractorsList}
        isLoadingContractors={isLoadingContractors}
        handleOpenAddContractorModal={() => handleOpenAddContractorModal()}
        catchContractorId={catchContractorId}
        handleOpenEditContractorModal={() => handleOpenEditContractorModal()}
        catchContractorData={catchContractorData}
      />
    </>
  );
};

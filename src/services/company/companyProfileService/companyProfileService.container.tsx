import React from 'react';
import { CompanyProfile } from './view/CompanyProfile';
import { companyProfileService } from './companyProfileService.model';
import { useUnit } from 'effector-react';

const { inputs, outputs, gates } = companyProfileService;
const { FetchingCurrentManagingFirmGate } = gates;

export const CompanyProfileContainer = () => {
  const {
    catchContractorData,
    catchContractorId,
    conractorsList,
    currentManagingFirm,
    handleCatchEmployeeId,
    handleCatchEmployeeStatusData,
    handleOpenAddContractorModal,
    handleOpenCreateEmployeeModal,
    handleOpenDeleteModal,
    handleOpenEditContractorModal,
    handleOpenStatusChangeModal,
    isLoadingContractors,
    isLoadingStaff,
    staffList,
  } = useUnit({
    currentManagingFirm: outputs.$currentManagingFirm,
    isLoadingStaff: outputs.$fetchStaffPending,
    staffList: outputs.$staffList,
    conractorsList: outputs.$contractorsList,
    isLoadingContractors: outputs.$isLoadingContractors,
    handleOpenStatusChangeModal: inputs.handleOpenStatusChangeModal,
    handleOpenDeleteModal: inputs.handleOpenDeleteModal,
    handleCatchEmployeeStatusData: inputs.handleCatchEmployeeStatusData,
    handleCatchEmployeeId: inputs.handleCatchEmployeeId,
    handleOpenCreateEmployeeModal: inputs.handleOpenCreateEmployeeModal,
    handleOpenAddContractorModal: inputs.handleOpenAddContractorModal,
    catchContractorId: inputs.catchContractorId,
    handleOpenEditContractorModal: inputs.handleOpenEditContractorModal,
    catchContractorData: inputs.catchContractorData,
  });

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

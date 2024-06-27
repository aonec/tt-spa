import React from 'react';
import { CompanyProfile } from './view/CompanyProfile';
import { companyProfileService } from './companyProfileService.model';
import { useUnit } from 'effector-react';
import { currentUserService } from 'services/currentUser/currentUserService';

const { inputs, outputs } = companyProfileService;
const {
  gates: { FetchingCurrentManagingFirmGate },
} = companyProfileService;

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
    currentUser,
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
    currentUser: currentUserService.outputs.$currentUser,
  });

  return (
    <>
      <FetchingCurrentManagingFirmGate />

      <CompanyProfile
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
        currentManagingFirm={currentManagingFirm}
        currentUserId={currentUser?.id || null}
      />
    </>
  );
};

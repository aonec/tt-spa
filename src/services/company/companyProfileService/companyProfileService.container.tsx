import React from 'react';
import { CompanyProfile } from './view/CompanyProfile';
import { companyProfileService } from './companyProfileService.model';
import { useEvent, useStore } from 'effector-react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { CommonInfoTab } from './view/CompanyProfile/Tabs/CommonInfoTab';
import { Staff } from './view/CompanyProfile/Tabs/Staff';
import { Contractors } from './view/CompanyProfile/Tabs/Contractors';

const { inputs, outputs } = companyProfileService;
const {
  gates: { FetchingCurrentManagingFirmGate },
} = companyProfileService;

export const CompanyProfileContainer = () => {
  const currentManagingFirm = useStore(outputs.$currentManagingFirm);
  const isLoadingStaff = useStore(outputs.$fetchStaffPending);
  const staffList = useStore(outputs.$staffList);
  const conractorsList = useStore(outputs.$contractorsList);
  const isLoadingContractors = useStore(outputs.$isLoadingContractors);

  const handleOpenStatusChangeModal = useEvent(
    inputs.handleOpenStatusChangeModal,
  );
  const handleOpenDeleteModal = useEvent(inputs.handleOpenDeleteModal);
  const handleCatchEmployeeStatusData = useEvent(
    inputs.handleCatchEmployeeStatusData,
  );
  const handleCatchEmployeeId = useEvent(inputs.handleCatchEmployeeId);
  const handleOpenCreateEmployeeModal = useEvent(
    inputs.handleOpenCreateEmployeeModal,
  );
  const handleOpenAddContractorModal = useEvent(
    inputs.handleOpenAddContractorModal,
  );
  const catchContractorId = useEvent(inputs.catchContractorId);
  const handleOpenEditContractorModal = useEvent(
    inputs.handleOpenEditContractorModal,
  );
  const catchContractorData = useEvent(inputs.catchContractorData);

  return (
    <Route
      element={
        <>
          {/* <FetchingCurrentManagingFirmGate /> */}

          <CompanyProfile
            staffList={staffList}
            isLoadingStaff={isLoadingStaff}
            handleOpenStatusChangeModal={() => handleOpenStatusChangeModal()}
            handleOpenDeleteModal={() => handleOpenDeleteModal()}
            handleCatchEmployeeStatusData={handleCatchEmployeeStatusData}
            handleCatchEmployeeId={handleCatchEmployeeId}
            handleOpenCreateEmployeeModal={() =>
              handleOpenCreateEmployeeModal()
            }
            conractorsList={conractorsList}
            isLoadingContractors={isLoadingContractors}
            handleOpenAddContractorModal={() => handleOpenAddContractorModal()}
            catchContractorId={catchContractorId}
            handleOpenEditContractorModal={() =>
              handleOpenEditContractorModal()
            }
            catchContractorData={catchContractorData}
          />
          <Outlet />
        </>
      }
    >
      <Route
        path="/companyProfile/commonInfo"
        element={<CommonInfoTab currentManagingFirm={currentManagingFirm} />}
      />
      <Route
        path="/companyProfile/staff"
        element={
          <Staff
            staffList={staffList}
            isLoadingStaff={isLoadingStaff}
            handleOpenStatusChangeModal={handleOpenStatusChangeModal}
            handleCatchEmployeeStatusData={handleCatchEmployeeStatusData}
            handleOpenDeleteModal={handleOpenDeleteModal}
            handleCatchEmployeeId={handleCatchEmployeeId}
          />
        }
      />
      <Route
        path="/companyProfile/contractors"
        element={
          <Contractors
            conractorsList={conractorsList}
            isLoadingContractors={isLoadingContractors}
            catchContractorId={catchContractorId}
            handleOpenEditContractorModal={handleOpenEditContractorModal}
            catchContractorData={catchContractorData}
          />
        }
      />
    </Route>
  );
};

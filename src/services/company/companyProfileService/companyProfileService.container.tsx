import React from 'react';
import { CompanyProfile } from './view/CompanyProfile';
import { companyProfileService } from './companyProfileService.model';
import { useStore } from 'effector-react';

const { inputs, outputs, gates } = companyProfileService;
const { FetchingCurrentManagingFirmGate } = gates;

export const CompanyProfileContainer = () => {
  const currentManagingFirm = useStore(outputs.$currentManagingFirm);
  const fetchStaffPending = useStore(outputs.$fetchStaffPending);
  const staffList = useStore(outputs.$staffList);

  return (
    <>
      <FetchingCurrentManagingFirmGate />
      <CompanyProfile
        currentManagingFirm={currentManagingFirm}
        staffList={staffList}
        fetchStaffPending={fetchStaffPending}
      />
    </>
  );
};

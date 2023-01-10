import React, { FC } from 'react';
import { StaffProps } from './Staff.types';
import { StaffItem } from './StaffItem';
import { companyProfileService } from 'services/company/companyProfileService/companyProfileService.model';

const { gates } = companyProfileService;
const { FetchingStaffGate } = gates;

export const Staff: FC<StaffProps> = ({ staffList }) => {
  return (
    <>
      <FetchingStaffGate />
      {staffList?.items?.map((staff) => (
        <StaffItem staff={staff} />
      ))}
    </>
  );
};

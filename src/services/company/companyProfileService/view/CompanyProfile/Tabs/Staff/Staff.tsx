import React, { FC } from 'react';
import { StaffProps } from './Staff.types';
import { StaffItem } from './StaffItem';
import { companyProfileService } from 'services/company/companyProfileService/companyProfileService.model';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
import { LoaderWrapper } from '../../CompanyProfile.styled';
import { ChangeStatusEmployeeContainer } from 'services/employee/changeStatusEmployeeService';
import { DeleteEmployeeContainer } from 'services/employee/deleteEmployeeService';
import { CreateEmployeeContainer } from 'services/employee/createEmployeeService';

const { gates } = companyProfileService;
const { FetchingStaffGate } = gates;

export const Staff: FC<StaffProps> = ({
  staffList,
  fetchStaffPending,
  handleOpenStatusChangeModal,
  handleCatchEmployeeStatusData,
  handleOpenDeleteModal,
  handleCatchEmployeeId,
}) => {
  return (
    <>
      <FetchingStaffGate />
      <LoaderWrapper>
        <WithLoader isLoading={fetchStaffPending} />
      </LoaderWrapper>
      {!fetchStaffPending &&
        staffList?.items?.map((staff) => (
          <StaffItem
            staff={staff}
            handleOpenStatusChangeModal={handleOpenStatusChangeModal}
            handleCatchEmployeeStatusData={handleCatchEmployeeStatusData}
            handleOpenDeleteModal={handleOpenDeleteModal}
            handleCatchEmployeeId={handleCatchEmployeeId}
          />
        ))}
      <ChangeStatusEmployeeContainer />
      <DeleteEmployeeContainer />
      <CreateEmployeeContainer />
    </>
  );
};

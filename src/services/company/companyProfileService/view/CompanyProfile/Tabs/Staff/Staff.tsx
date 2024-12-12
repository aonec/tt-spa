import React, { FC } from 'react';
import { StaffProps } from './Staff.types';
import { StaffItem } from './StaffItem';
import { companyProfileService } from 'services/company/companyProfileService/companyProfileService.model';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { LoaderWrapper } from '../../CompanyProfile.styled';
import { ChangeStatusEmployeeContainer } from 'services/employee/changeStatusEmployeeService';
import { DeleteEmployeeContainer } from 'services/employee/deleteEmployeeService';
import { CreateEmployeeContainer } from 'services/employee/createEmployeeService';

const { gates } = companyProfileService;
const { FetchingStaffGate } = gates;

export const Staff: FC<StaffProps> = ({
  staffList,
  isLoadingStaff,
  handleOpenStatusChangeModal,
  handleCatchEmployeeStatusData,
  handleOpenDeleteModal,
  handleCatchEmployeeId,
  currentUserId,
}) => {
  return (
    <>
      <FetchingStaffGate />
      <LoaderWrapper>
        <WithLoader isLoading={isLoadingStaff} />
      </LoaderWrapper>
      {!isLoadingStaff &&
        staffList?.items?.map((staff) => (
          <StaffItem
            key={staff.id}
            staff={staff}
            handleOpenStatusChangeModal={handleOpenStatusChangeModal}
            handleCatchEmployeeStatusData={handleCatchEmployeeStatusData}
            handleOpenDeleteModal={handleOpenDeleteModal}
            handleCatchEmployeeId={handleCatchEmployeeId}
            currentUserId={currentUserId}
          />
        ))}
      <ChangeStatusEmployeeContainer />
      <DeleteEmployeeContainer />
      <CreateEmployeeContainer />
    </>
  );
};

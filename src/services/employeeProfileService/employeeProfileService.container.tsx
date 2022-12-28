import { useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { employeeProfileService } from './employeeProfileService.model';
import { EmployeeProfile } from './view/EmployeeProfile';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
import { LoaderWrapper } from './view/EmployeeProfile/EmployeeProfile.styled';

export const EmployeeProfileContainer = () => {
  const { id } = useParams<{ id: string }>();
  const { inputs, outputs, gates } = employeeProfileService;

  const { FetchUserDataGate } = gates;
  const userData = useStore(outputs.$userData);

  const employeeDataPending = useStore(outputs.$employeeDataPending);

  return (
    <>
      <FetchUserDataGate id={id} />
      <LoaderWrapper>
        <WithLoader isLoading={employeeDataPending} />
      </LoaderWrapper>
      {!employeeDataPending && <EmployeeProfile userData={userData} />}
    </>
  );
};

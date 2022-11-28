import { useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { employeeProfileService } from './employeeProfileService.model';
import { EmployeeProfile } from './view/EmployeeProfile';

export const EmployeeProfileContainer = () => {
  const { id } = useParams<{ id: string }>();
  const { inputs, outputs, gates } = employeeProfileService;

  const { FetchUserDataGate } = gates;
  const userData = useStore(outputs.$userData);
  console.log(userData);

  return (
    <>
      <FetchUserDataGate id={id} />
      <EmployeeProfile userData={userData} />
    </>
  );
};

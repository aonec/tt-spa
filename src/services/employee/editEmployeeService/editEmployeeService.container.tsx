import React, { useEffect } from 'react';
import { EditEmployee } from './view/EditEmployee';
import { editEmployeeService } from './editEmployeeService.model';
import { useUnit } from 'effector-react';
import { useNavigate, useParams } from 'react-router-dom';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { LoaderWrapper } from './view/EditEmployee/EditEmployee.styled';

const { inputs, outputs, gates } = editEmployeeService;
const { CompetencesGate, UserRolesGate, FetchEmployeeDataGate } = gates;

export const EditEmployeeContainer = () => {
  const navigate = useNavigate();

  const {
    competences,
    employeeData,
    employeeDataPending,
    handleSubmit,
    isPending,
    userRoles,
  } = useUnit({
    isPending: outputs.$pending,
    competences: outputs.$competencesCatalog,
    userRoles: outputs.$userRoles,
    employeeData: outputs.$employeeData,
    employeeDataPending: outputs.$employeeDataPending,
    handleSubmit: inputs.handleSubmit,
  });

  const multipleSelectionCompetences = competences?.map((elem) => ({
    label: elem.title,
    value: elem.id,
  }));

  const multipleSelectionUserRoles = userRoles?.map((elem) => ({
    label: elem.value,
    value: elem.key,
  }));

  const params = useParams<{ id: string }>();
  const userId = params.id;

  useEffect(() => {
    return inputs.successUpdate.watch(() => {
      navigate(`/userProfile/${userId}`);
    }).unsubscribe;
  }, [navigate, userId]);

  if (!userId) return null;

  return (
    <>
      <CompetencesGate />
      <UserRolesGate />
      <FetchEmployeeDataGate id={userId} />
      <LoaderWrapper>
        <WithLoader isLoading={employeeDataPending} />
      </LoaderWrapper>
      {!employeeDataPending && (
        <EditEmployee
          isPending={isPending}
          submitHandler={handleSubmit}
          multipleSelectionCompetences={multipleSelectionCompetences}
          multipleSelectionUserRoles={multipleSelectionUserRoles}
          employeeData={employeeData}
        />
      )}
    </>
  );
};

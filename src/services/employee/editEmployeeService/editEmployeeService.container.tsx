import React, { useEffect } from 'react';
import { EditEmployee } from './view/EditEmployee';
import { editEmployeeService } from './editEmployeeService.model';
import { useEvent, useStore } from 'effector-react';
import { useHistory, useParams } from 'react-router-dom';
import { WithLoader } from 'ui-kit/sharedComponents/WithLoader';
import { LoaderWrapper } from './view/EditEmployee/EditEmployee.styled';

const { inputs, outputs, gates } = editEmployeeService;
const { CompetencesGate, UserRolesGate, FetchEmployeeDataGate } = gates;

export const EditEmployeeContainer = () => {
  const history = useHistory();
  const isPending = useStore(outputs.$pending);
  const competences = useStore(outputs.$competencesCatalog);
  const userRoles = useStore(outputs.$userRoles);
  const employeeData = useStore(outputs.$employeeData);
  const employeeDataPending = useStore(outputs.$employeeDataPending);

  const handleSubmit = useEvent(inputs.handleSubmit);

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
      history.push(`/userProfile/${userId}`);
    }).unsubscribe;
  }, [history, userId]);

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

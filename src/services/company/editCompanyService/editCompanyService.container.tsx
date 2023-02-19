import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
import { editCompanyService } from './editCompanyService.model';
import { EditCompanyForm } from './view/EditCompanyForm';

const { inputs, outputs, gates } = editCompanyService;
const { EditCompanyGate } = gates;

export const EditCompanyContainer = () => {
  const currentManagingFirm = useStore(outputs.$currentManagingFirm);
  const isOrganizationLoading = useStore(outputs.$isOrganizationLoading);

  const handleUpdateOrganization = useEvent(inputs.updateOrganization);

  return (
    <>
      <EditCompanyGate />
      <WithLoader isLoading={isOrganizationLoading}>
        <>
          <GoBack />
          {currentManagingFirm && (
            <EditCompanyForm
              currentManagingFirm={currentManagingFirm}
              handleUpdateOrganization={handleUpdateOrganization}
            />
          )}
        </>
      </WithLoader>
    </>
  );
};

import { useStore } from 'effector-react';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { editCompanyService } from './editCompanyService.model';
import { EditCompanyPage } from './view/EditCompanyPage';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';

const { inputs, outputs, gates, forms } = editCompanyService;
const { EditCompanyGate } = gates;
const organizationUpdated = inputs.organizationUpdated;
const { ExistingCitiesGate } = addressSearchService.gates;

export const EditCompanyContainer = () => {
  const history = useHistory();

  const currentManagingFirm = useStore(outputs.$currentManagingFirm);
  const isOrganizationLoading = useStore(outputs.$isOrganizationLoading);
  const isUpdating = useStore(outputs.$isUpdating);
  const existingCities = useStore(addressSearchService.outputs.$existingCities);

  useEffect(() => {
    return organizationUpdated.watch(() => history.goBack()).unsubscribe;
  }, [history]);

  return (
    <>
      <EditCompanyGate />
      <ExistingCitiesGate />
      <WithLoader isLoading={isOrganizationLoading}>
        <EditCompanyPage
          currentManagingFirm={currentManagingFirm}
          form={forms.editCompanyForm}
          existingCities={existingCities || []}
          isUpdating={isUpdating}
        />
      </WithLoader>
    </>
  );
};

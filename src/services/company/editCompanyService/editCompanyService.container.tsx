import {
  $existingCities,
  ExistingCitiesGate,
} from '01/features/housingStocks/displayHousingStockCities/models';
import { useEvent, useStore } from 'effector-react';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
import { editCompanyService } from './editCompanyService.model';
import { EditCompanyPage } from './view/EditCompanyPage';

const { inputs, outputs, gates } = editCompanyService;
const { EditCompanyGate } = gates;
const organizationUpdated = inputs.organizationUpdated;

export const EditCompanyContainer = () => {
  const history = useHistory();

  const currentManagingFirm = useStore(outputs.$currentManagingFirm);
  const isOrganizationLoading = useStore(outputs.$isOrganizationLoading);
  const isUpdating = useStore(outputs.$isUpdating);
  const existingCities = useStore($existingCities);

  const handleUpdateOrganization = useEvent(inputs.updateOrganization);

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
          handleUpdateOrganization={handleUpdateOrganization}
          existingCities={existingCities || []}
          isUpdating={isUpdating}
        />
      </WithLoader>
    </>
  );
};
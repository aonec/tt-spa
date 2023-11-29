import { useEvent, useStore } from 'effector-react';
import React, { useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { editCompanyService } from './editCompanyService.model';
import { EditCompanyPage } from './view/EditCompanyPage';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';

const { inputs, outputs, gates } = editCompanyService;
const { EditCompanyGate } = gates;
const organizationUpdated = inputs.organizationUpdated;
const { ExistingCitiesGate } = addressSearchService.gates;

export const EditCompanyContainer = () => {
  const history =  useNavigate();

  const currentManagingFirm = useStore(outputs.$currentManagingFirm);
  const isOrganizationLoading = useStore(outputs.$isOrganizationLoading);
  const isUpdating = useStore(outputs.$isUpdating);
  const existingCities = useStore(addressSearchService.outputs.$existingCities);

  const handleUpdateOrganization = useEvent(inputs.updateOrganization);

  useEffect(() => {
    return organizationUpdated.watch(() => history(-1)).unsubscribe;
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

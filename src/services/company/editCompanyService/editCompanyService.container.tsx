import { useUnit } from 'effector-react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { editCompanyService } from './editCompanyService.model';
import { EditCompanyPage } from './view/EditCompanyPage';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';

const { inputs, outputs, gates } = editCompanyService;
const { EditCompanyGate } = gates;
const organizationUpdated = inputs.organizationUpdated;
const { ExistingCitiesGate } = addressSearchService.gates;

export const EditCompanyContainer = () => {
  const navigate = useNavigate();

  const {
    currentManagingFirm,
    existingCities,
    handleUpdateOrganization,
    isOrganizationLoading,
    isUpdating,
  } = useUnit({
    currentManagingFirm: outputs.$currentManagingFirm,
    isOrganizationLoading: outputs.$isOrganizationLoading,
    isUpdating: outputs.$isUpdating,
    existingCities: addressSearchService.outputs.$existingCities,
    handleUpdateOrganization: inputs.updateOrganization,
  });

  useEffect(() => {
    return organizationUpdated.watch(() => navigate(-1)).unsubscribe;
  }, [navigate]);

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

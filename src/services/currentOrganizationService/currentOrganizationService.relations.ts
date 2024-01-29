import { currentOrganizationService } from 'services/currentOrganizationService';
import { sample } from 'effector';
import { OrganizationResponse } from 'api/types';
import { prepareFeatureToggles } from 'services/developmentSettings/developmentSettings.utils';
import { developmentSettingsService } from 'services/developmentSettings/developmentSettings.models';

sample({
  source: currentOrganizationService.outputs.$currentManagingFirm,
  filter: (managementFirm): managementFirm is OrganizationResponse =>
    Boolean(managementFirm),
  fn: (managementFirm) => {
    const toggles = managementFirm?.platformConfiguration?.featureToggles;

    if (!toggles) return null;

    return prepareFeatureToggles(toggles);
  },
  target: developmentSettingsService.inputs.setFeatureToggles,
});

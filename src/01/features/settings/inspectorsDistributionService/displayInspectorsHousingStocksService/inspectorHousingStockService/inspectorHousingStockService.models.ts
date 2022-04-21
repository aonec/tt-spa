import { displayInspectorsService } from '01/features/Inspectors/displayInspectors/displayInspectorsService.models';
import { range } from '01/shared/utils/range';
import { createDomain } from 'effector';

const inspectorHousingStockServiceDomain = createDomain(
  'inspectorHousingStockService'
);

const days = range(15, 25, 1);

export const inspectorHousingStockService = {
  outputs: {
    $inspectors: displayInspectorsService.outputs.$inspectorsList,
    days,
  },
};

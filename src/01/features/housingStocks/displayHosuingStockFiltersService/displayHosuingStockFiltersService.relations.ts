import { forward } from 'effector';
import { displayHousingStockFiltersService } from './displayHosuingStockFiltersService.models';

displayHousingStockFiltersService.outputs.$hosuingStockfilters
  .on(
    displayHousingStockFiltersService.inputs.fetchHosuingStockFiltersFx
      .doneData,
    (_, filters) => filters
  )
  .reset(
    displayHousingStockFiltersService.inputs.HousingStockFiltersGate.close
  );

forward({
  from: displayHousingStockFiltersService.inputs.HousingStockFiltersGate.open,
  to: displayHousingStockFiltersService.inputs.fetchHosuingStockFiltersFx,
});

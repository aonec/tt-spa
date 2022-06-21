import { forward } from 'effector';
import { sortBy } from 'lodash';
import { displayInspectorsService } from './displayInspectorsService.models';

displayInspectorsService.outputs.$inspectorsList
  .on(
    displayInspectorsService.inputs.fetchInspectorsListFx.doneData,
    (_, inspectors) => {
      if (!inspectors) return null;

      const filteredInspectors = sortBy(inspectors, 'fullName');

      return filteredInspectors;
    }
  )
  .reset(displayInspectorsService.inputs.InspectorsGate.close);

forward({
  from: displayInspectorsService.inputs.InspectorsGate.open,
  to: displayInspectorsService.inputs.fetchInspectorsListFx,
});

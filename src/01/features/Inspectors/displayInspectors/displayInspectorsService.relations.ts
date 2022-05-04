import { forward } from 'effector';
import { displayInspectorsService } from './displayInspectorsService.models';
import { sortInspectorsByAlphabet } from './utils';

displayInspectorsService.outputs.$inspectorsList
  .on(
    displayInspectorsService.inputs.fetchInspectorsListFx.doneData,
    (_, inspectors) => inspectors && sortInspectorsByAlphabet(inspectors)
  )
  .reset(displayInspectorsService.inputs.InspectorsGate.close);

forward({
  from: displayInspectorsService.inputs.InspectorsGate.open,
  to: displayInspectorsService.inputs.fetchInspectorsListFx,
});

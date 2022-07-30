import { forward } from 'effector';
import { $inspector, fetchInspectorFx, InspectorGate } from '.';
import { getInspector } from '../../../_api/inspectors';

fetchInspectorFx.use(getInspector);

$inspector
  .on(fetchInspectorFx.doneData, (_, inspector) => inspector)
  .reset(InspectorGate.close);

forward({
  from: InspectorGate.state.map(({ id }) => id),
  to: fetchInspectorFx,
});

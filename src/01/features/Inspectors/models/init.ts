import { getInspector } from '01/_api/inspectors';
import { forward } from 'effector';
import { $inspector, fetchInspectorFx, InspectorGate } from '.';

fetchInspectorFx.use(getInspector);

$inspector
  .on(fetchInspectorFx.doneData, (_, inspector) => inspector)
  .reset(InspectorGate.close);

forward({
  from: InspectorGate.state.map(({ id }) => id),
  to: fetchInspectorFx,
});

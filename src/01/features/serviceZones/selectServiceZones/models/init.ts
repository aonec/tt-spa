import { $serviceZones, PageGate, requestServiceZonesFx } from './index';
import { forward } from 'effector';
import './index';
import { getServiceZones } from '../../../../_api/service_zones';

requestServiceZonesFx.use(getServiceZones);

$serviceZones.on(requestServiceZonesFx.doneData, (s, a) => {
  let result = [...s];

  if (a.nodeServiceZones !== null) {
    result = [...result, ...a.nodeServiceZones];
  }

  return result;
});

forward({
  from: PageGate.open,
  to: requestServiceZonesFx,
});

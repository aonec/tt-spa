import { $serviceZones, PageGate, requestServiceZonesFx } from './index';
import { forward } from 'effector';
import './index';
import { getServiceZones } from '../../../../_api/service_zones';

requestServiceZonesFx.use(getServiceZones);

$serviceZones.on(requestServiceZonesFx.doneData, (s, a) => {
  if (a.nodeServiceZones !== null) {
    return [...s, ...a.nodeServiceZones];
  } else {
    return s;
  }
});

$serviceZones.watch((state) => console.log(JSON.stringify(state)));

forward({
  from: PageGate.open,
  to: requestServiceZonesFx,
});

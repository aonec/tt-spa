import {
  $chosenInput,
  $requestServiceZonesStatus,
  $serviceZones,
  PageGate,
  requestServiceZonesFx,
  setChosenInput,
} from './index';
import { forward, sample } from 'effector';
import './index';
import { getServiceZones } from '../../../../_api/service_zones';
import { NodeServiceZoneResponse } from '../../../../../myApi';

requestServiceZonesFx.use(getServiceZones);

$serviceZones.on(requestServiceZonesFx.doneData, (s, a) => {
  let result = [...s];

  if (a.nodeServiceZones !== null) {
    result = [...result, ...a.nodeServiceZones];
  }

  return result;
});

sample({
  clock: setChosenInput /* 1 */,
  source: $serviceZones /* 2 */,
  fn: (serviceZones, chosenInputId) =>
    serviceZones.find((el) => el.id === chosenInputId)! /* 3 */,
  target: $chosenInput /* 4 */,
});

forward({
  from: PageGate.open,
  to: requestServiceZonesFx,
});

// forward({
//   from: PageGate.close,
//   to: $serviceZones.reset,
// });

$serviceZones.reset(PageGate.close);

$requestServiceZonesStatus
  .on(requestServiceZonesFx, () => 'loading')
  .on(requestServiceZonesFx.done, () => 'done')
  .on(requestServiceZonesFx.fail, () => 'error');

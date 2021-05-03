import {
  $readings,
  HousingMeteringDeviceReadingsGate,
  requestReadingsFx,
  updateReadingsFx,
} from './index';
import {
  requestReadings,
  updateReadings,
} from '../../../_api/housing_metering_device_readings';
import { forward } from 'effector';

requestReadingsFx.use(requestReadings);

updateReadingsFx.use(updateReadings);

$readings.on(requestReadingsFx.doneData, (state, payload) => ({
  ...state,
  items: payload.items,
}));

forward({
  from: HousingMeteringDeviceReadingsGate.open,
  to: requestReadingsFx,
});

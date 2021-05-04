import {
  $readings,
  HousingMeteringDeviceReadingsGate,
  requestReadingsFx,
  postReadingFx,
  updateReadingFx,
} from './index';
import {
  requestReadings,
  postReading,
  updateReading,
} from '../../../_api/housing_metering_device_readings';
import { forward } from 'effector';

requestReadingsFx.use(requestReadings);

postReadingFx.use(postReading);

updateReadingFx.use(updateReading);

$readings.on(requestReadingsFx.doneData, (state, payload) => ({
  ...state,
  items: payload.items,
}));

forward({
  from: HousingMeteringDeviceReadingsGate.state,
  to: requestReadingsFx,
});

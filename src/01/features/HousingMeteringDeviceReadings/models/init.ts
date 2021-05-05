import {
  $readings,
  HousingMeteringDeviceReadingsGate,
  requestReadingsFx,
  postReadingFx,
  updateReadingFx,
  readingChanged,
  $latestSuccessReadings,
} from './index';
import {
  requestReadings,
  postReading,
  updateReading,
} from '../../../_api/housing_metering_device_readings';
import { forward, sample } from 'effector';
import { GetHousingMeteringDeviceReadingsResponse } from '../../../../myApi';

requestReadingsFx.use(requestReadings);

postReadingFx.use(postReading);

updateReadingFx.use(updateReading);

const addReadingsReducer = (
  state: GetHousingMeteringDeviceReadingsResponse,
  payload: GetHousingMeteringDeviceReadingsResponse
) => ({
  ...state,
  items: payload.items,
});

$readings.on(requestReadingsFx.doneData, addReadingsReducer);
$latestSuccessReadings.on(requestReadingsFx.doneData, addReadingsReducer);

// forward({
//   from: requestReadingsFx.doneData.map(addReadingsReducer),
//   to: [$readings, $latestSuccessReadings],
// });

// sample({
//   clock: requestReadingsFx.doneData,
//   fn:
// })

// forward({
//   from: requestReadingsFx.doneData,
//   to: [$readings, $latestSuccessReadings],
// });

$readings.on(readingChanged, (readings, payload) => {
  return {
    ...readings,
    items: readings.items!.map((reading) => {
      const { deviceId, month, year, value } = payload;
      if (
        reading.deviceId === deviceId &&
        reading.month === month &&
        reading.year === year
      )
        return { ...reading, value };
      return reading;
    }),
  };
});

forward({
  from: HousingMeteringDeviceReadingsGate.state,
  to: requestReadingsFx,
});

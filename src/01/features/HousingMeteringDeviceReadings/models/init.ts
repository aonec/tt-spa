import {
  $readings,
  HousingMeteringDeviceReadingsGate,
  requestReadingsFx,
  postReadingFx,
  readingChanged,
  $latestSuccessReadings,
  inputBlur,
  PostDataType,
} from './index';
import {
  requestReadings,
  postReading,
} from '../../../_api/housing_metering_device_readings';
import { forward, sample } from 'effector';
import { GetHousingMeteringDeviceReadingsResponse } from '../../../../myApi';

//TODO
// 1. Если ничего не изменилось в инпуте, то не отправлять

requestReadingsFx.use(requestReadings);

postReadingFx.use((data) => {
  const { value, deviceId } = data.inputEvent;
  return postReading({ value, deviceId });
});

const addReadingsReducer = (
  state: GetHousingMeteringDeviceReadingsResponse,
  payload: GetHousingMeteringDeviceReadingsResponse
) => ({
  ...state,
  items: payload.items,
});

$readings.on(requestReadingsFx.doneData, addReadingsReducer);
$latestSuccessReadings.on(requestReadingsFx.doneData, addReadingsReducer);

sample({
  clock: [postReadingFx.done],
  source: $readings,
  target: $latestSuccessReadings,
});

sample({
  clock: [postReadingFx.fail],
  source: $latestSuccessReadings,
  target: $readings,
});

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

const postData = sample({
  source: $latestSuccessReadings,
  clock: inputBlur,
  fn: (latestSuccessReadings, inputEvent) =>
    ({
      inputEvent,
      latestSuccessReadings,
    } as PostDataType) /* 3 */,
});

forward({
  from: postData,
  to: postReadingFx,
});

forward({
  from: HousingMeteringDeviceReadingsGate.state,
  to: requestReadingsFx,
});

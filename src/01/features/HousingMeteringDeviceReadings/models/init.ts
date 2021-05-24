import {
  $readings,
  HousingMeteringDeviceReadingsGate,
  requestReadingsFx,
  postReadingFx,
  readingChanged,
  $latestSuccessReadings,
  inputBlur,
  InputPayloadType,
  $postReadingsErrorMessage,
} from './index';
import {
  requestReadings,
  postReading,
} from '../../../_api/housing_metering_device_readings';
import { forward, guard, sample } from 'effector';
import { GetHousingMeteringDeviceReadingsResponse } from '../../../../myApi';

requestReadingsFx.use(requestReadings);

postReadingFx.use((data) => {
  const { value, deviceId } = data;

  // return new Promise((resolve, reject) => {
  // setTimeout(() => {
  //   reject({ message: 'Ошибка' });
  // }, 2000);
  return postReading({ value, deviceId });
  // });
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

const readingFilterFn = (
  readings: GetHousingMeteringDeviceReadingsResponse,
  inputPayload: InputPayloadType
) => {
  const isNewValue = readings.items?.some((reading) =>
    reading.id === inputPayload.id
      ? reading.value !== inputPayload.value
      : false
  );
  return isNewValue!;
};

sample({
  clock: guard({
    source: $latestSuccessReadings,
    clock: inputBlur,
    filter: readingFilterFn,
  }),
  source: inputBlur,
  target: postReadingFx,
});

forward({
  from: HousingMeteringDeviceReadingsGate.state,
  to: requestReadingsFx,
});

$postReadingsErrorMessage
  .on(postReadingFx.failData, (_, error) => error.message)
  .reset(postReadingFx);

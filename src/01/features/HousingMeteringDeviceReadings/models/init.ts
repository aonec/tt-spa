import {
  $readings,
  HousingMeteringDeviceReadingsGate,
  requestReadingsFx,
  postReadingFx,
  updateReadingFx,
  readingChanged,
  $latestSuccessReadings,
  inputBlur,
  PostDataType,
} from './index';
import {
  requestReadings,
  postReading,
  updateReading,
} from '../../../_api/housing_metering_device_readings';
import { forward, sample, split } from 'effector';
import { GetHousingMeteringDeviceReadingsResponse } from '../../../../myApi';

//TODO
// 1. Если ничего не изменилось в инпуте, то не отправлять

requestReadingsFx.use(requestReadings);

postReadingFx.use((data) => {
  const { value, deviceId } = data.inputEvent;
  return postReading({ value, deviceId });
});

updateReadingFx.use((data) => {
  const { value } = data.inputEvent;
  const id = data.inputEvent.id!;
  return updateReading({ id, value });
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
  clock: [postReadingFx.done, updateReadingFx.done],
  source: $readings,
  target: $latestSuccessReadings,
});

sample({
  clock: [postReadingFx.fail, updateReadingFx.fail],
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

const postOrPutReading = (payload: PostDataType): 'put' | 'post' => {
  const { deviceId, year, month } = payload.inputEvent;

  const elementBeforeChanging = payload.latestSuccessReadings.items?.find(
    (el) => el.deviceId === deviceId && el.year === year && el.month === month
  );
  const valueBeforeChanging = elementBeforeChanging?.value;

  return valueBeforeChanging ? 'put' : 'post';
};

// split({
//   source: Unit<T>
//       // case store
//       match: Store<'first' | 'second'>,
//     cases: {
//   first: Unit<T>,
//       second: Unit<T>,
//       __?: Unit<T>
// }
// })

split({
  source: postData,
  match: {
    post: (postData) => postOrPutReading(postData) === 'post',
    put: (postData) => postOrPutReading(postData) === 'put',
  },
  cases: {
    post: postReadingFx,
    put: updateReadingFx,
  },
});

forward({
  from: HousingMeteringDeviceReadingsGate.state,
  to: requestReadingsFx,
});

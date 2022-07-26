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
  $chosenInputId,
  $requestReadingsErrorMessage,
  ResourceGate,
  $resource,
} from './index';
import {
  requestReadings,
  postReading,
} from '../../../_api/housing_metering_device_readings';
import { forward, guard, sample } from 'effector';
import { GetHousingMeteringDeviceReadingsResponse } from '../.../../api/types';
import moment from 'moment';
import { formatDate } from '01/utils/dates';

requestReadingsFx.use(requestReadings);

postReadingFx.use((data) => {
  const { value, deviceId } = data;
  return postReading({ value, deviceId, readingDate: formatDate(moment()) });
});

const addReadingsReducer = (
  state: GetHousingMeteringDeviceReadingsResponse,
  payload: GetHousingMeteringDeviceReadingsResponse
) => ({
  ...state,
  items: payload.items,
});

$readings
  .on(requestReadingsFx.doneData, addReadingsReducer)
  .reset(HousingMeteringDeviceReadingsGate.close);

$latestSuccessReadings
  .on(requestReadingsFx.doneData, addReadingsReducer)
  .reset(HousingMeteringDeviceReadingsGate.close);

$chosenInputId
  .on(inputBlur, (_, inputPayload) => {
    return inputPayload.deviceId;
  })
  .reset([postReadingFx.doneData, postReadingFx.failData]);

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

//lodash-fp
//частичное применение readingFilterFn

const readingFilterFn = (
  readings: GetHousingMeteringDeviceReadingsResponse,
  inputPayload: InputPayloadType
) => {
  const isNewValue = readings.items?.some((reading) => {
    const isEqualId = reading.id === inputPayload.id;
    const isValueChanged = reading.value !== inputPayload.value;
    return isEqualId && isValueChanged;
  });
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
  from: HousingMeteringDeviceReadingsGate.state.updates,
  to: requestReadingsFx,
});

guard({
  clock: [
    HousingMeteringDeviceReadingsGate.open,
    HousingMeteringDeviceReadingsGate.state,
  ],
  filter: HousingMeteringDeviceReadingsGate.status,
  target: requestReadingsFx,
});

$postReadingsErrorMessage
  .on(postReadingFx.failData, (_, error) => error.message)
  .reset(postReadingFx);

$requestReadingsErrorMessage
  .on(requestReadingsFx.failData, (_, error) => error.message)
  .reset(requestReadingsFx);

forward({
  from: ResourceGate.state.updates,
  to: $resource,
});

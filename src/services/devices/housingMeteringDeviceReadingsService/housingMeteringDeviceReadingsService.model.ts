import { message } from 'antd';
import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import moment from 'moment';
import {
  CreateHousingMeteringDeviceReadingsRequest,
  EResourceType,
  GetHousingMeteringDeviceReadingsResponse,
  HousingMeteringDeviceReadingsIncludingPlacementResponse,
} from 'myApi';
import { EffectFailDataAxiosError } from 'types';
import {
  createHousingMeteringDeviceReading,
  fetchHousingMeteringDeviceReadings,
} from './housingMeteringDeviceReadingsService.api';
import { PreparedMeteringDeviceReading } from './housingMeteringDeviceReadingsService.types';
import { groupWithEmptyReadings } from './housingMeteringDeviceReadingsService.utils';

const domain = createDomain('housingMeteringDeviceReadingsService');

const getHousingMeteringDeviceReadingsFx = domain.createEffect<
  number,
  GetHousingMeteringDeviceReadingsResponse
>(fetchHousingMeteringDeviceReadings);

const createReading = domain.createEvent<CreateHousingMeteringDeviceReadingsRequest>();
const createReadingFx = domain.createEffect<
  CreateHousingMeteringDeviceReadingsRequest,
  HousingMeteringDeviceReadingsIncludingPlacementResponse,
  EffectFailDataAxiosError
>(createHousingMeteringDeviceReading);

const $readings = domain
  .createStore<PreparedMeteringDeviceReading[]>([])
  .on(getHousingMeteringDeviceReadingsFx.doneData, (_, response) =>
    groupWithEmptyReadings(response.items || [])
  )
  .on(createReadingFx.doneData, (readings, newReading) =>
    readings.map((year) => {
      if (Number(year.year) === newReading.year) {
        const newYearReadings = year.readings.map((month) => {
          if (month.month === newReading.month) {
            const newMonthReadings = month.readings.map((reading) =>
              reading.deviceId === newReading.deviceId ? newReading : reading
            );
            return { month: month.month, readings: newMonthReadings };
          }
          return month;
        });
        return { year: year.year, readings: newYearReadings };
      }
      return year;
    })
  );

const setResource = domain.createEvent<EResourceType>();
const $isColdWater = domain
  .createStore(false)
  .on(setResource, (_, resource) => resource === EResourceType.ColdWaterSupply);

const $isLoading = getHousingMeteringDeviceReadingsFx.pending;

const NodeIdGate = createGate<{ nodeId: number }>();
const NodeResourceGate = createGate<{ resource: EResourceType }>();

forward({
  from: NodeIdGate.state.map(({ nodeId }) => nodeId),
  to: getHousingMeteringDeviceReadingsFx,
});

forward({
  from: NodeResourceGate.state.map(({ resource }) => resource),
  to: setResource,
});

forward({
  from: createReading,
  to: createReadingFx,
});

createReadingFx.failData.watch((error) =>
  message.error(error.response.data.error.Text)
);

createReadingFx.done.watch(({ params }) =>
  message.success(
    `Показание за ${moment(params.readingDate).format('MMMM YYYY')} сохранено!`
  )
);

export const housingMeteringDeviceReadingsService = {
  inputs: { createReading },
  outputs: {
    $readings,
    $isColdWater,
    $isLoading,
  },
  gates: {
    NodeIdGate,
    NodeResourceGate,
  },
};

import _ from 'lodash';
import dayjs from 'api/dayjs';
import {
  EHousingMeteringDeviceType,
  EMagistralType,
  HousingMeteringDeviceReadingsIncludingPlacementResponse,
  PipeNodeResponse,
} from 'api/types';
import { getFilledArray } from 'utils/getFilledArray';
import { SortedMeteringDeviceReading } from './housingMeteringDeviceReadingsService.types';

export const groupWithEmptyReadings = (
  allReadings: HousingMeteringDeviceReadingsIncludingPlacementResponse[],
  deviceIds: { [key in EMagistralType]: number | null },
) => {
  const sortedReadingsDictionary = _.groupBy(allReadings, (reading) => {
    const readingDate = dayjs(reading.readingDate);
    return `${readingDate.format('YYYY')} ${readingDate.format('MMMM')}`;
  });

  const sortedReadingsDates = Object.keys(sortedReadingsDictionary).sort(
    (first, second) =>
      dayjs(first, 'YYYY MMMM').diff(dayjs(second, 'YYYY MMMM'), 'month'),
  );

  const { FeedBackFlow: feedBackFlowId, FeedFlow: feedFlowId } = deviceIds;

  if (!feedFlowId) {
    return [];
  }

  let firstReadingDate = dayjs(sortedReadingsDates[0], 'YYYY MMMM');

  if (!firstReadingDate.isValid()) {
    firstReadingDate = dayjs().add(1, 'month');
  }

  const diff = dayjs(firstReadingDate, 'YYYY MMMM').diff(
    dayjs().add(1, 'month'),
    'month',
  );

  const readingsWithEmpty = getFilledArray(Math.abs(diff) + 1, (index) => {
    const date = dayjs().add(diff + index + 1, 'month');
    const year = date.format('YYYY');
    const month = date.format('MMMM');

    const dateString = `${year} ${month}`;

    const readings: SortedMeteringDeviceReading[] =
      sortedReadingsDictionary[dateString] || [];

    if (readings.length === 0) {
      readings.push({
        value: null,
        previousReadingsId: null,
        magistralType: EMagistralType.FeedFlow,
        id: null,
        deviceId: feedFlowId,
      });
    }

    if (feedBackFlowId && readings.length === 1) {
      const isFeedBackFlowExist =
        readings[0].magistralType === EMagistralType.FeedBackFlow;

      const magistralType = isFeedBackFlowExist
        ? EMagistralType.FeedFlow
        : EMagistralType.FeedBackFlow;
      const deviceId = isFeedBackFlowExist ? feedFlowId : feedBackFlowId;

      readings.push({
        value: null,
        magistralType,
        previousReadingsId: null,
        id: null,
        deviceId,
      });
    }
    return { year, month, readings };
  });
  const groupedReadings = groupReadings(readingsWithEmpty);

  return groupedReadings;
};

const groupReadings = (
  yearReadings: {
    year: string;
    month: string;
    readings: SortedMeteringDeviceReading[];
  }[],
) => {
  const groupedReadingsByYear = _.groupBy(
    yearReadings,
    (readings) => readings.year,
  );

  const groupedReadingsByMonth = Object.entries(groupedReadingsByYear).map(
    ([year, yearReadings]) => ({
      year,
      readings: _.reverse(yearReadings),
    }),
  );

  return _.reverse(groupedReadingsByMonth);
};

export const getDeviceIds = (node: PipeNodeResponse) => {
  const pipes = node.communicationPipes || [];

  const feedFlowDevices =
    pipes.find((pipe) => pipe.magistral === EMagistralType.FeedFlow)?.devices ||
    [];
  const feedBackFlowDevices =
    pipes.find((pipe) => pipe.magistral === EMagistralType.FeedBackFlow)
      ?.devices || [];

  const feedFlowDevice = feedFlowDevices.find(
    (device) =>
      device.housingMeteringDeviceType === EHousingMeteringDeviceType.FlowMeter,
  );
  const feedBackFlowDevice = feedBackFlowDevices.find(
    (device) =>
      device.housingMeteringDeviceType === EHousingMeteringDeviceType.FlowMeter,
  );

  return {
    [EMagistralType.FeedBackFlow]: feedBackFlowDevice?.id || null,
    [EMagistralType.FeedFlow]: feedFlowDevice?.id || null,
    [EMagistralType.Recharge]: null,
  };
};

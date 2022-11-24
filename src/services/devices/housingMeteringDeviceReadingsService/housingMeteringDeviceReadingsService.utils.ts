import _ from 'lodash';
import moment from 'moment';
import {
  EHousingMeteringDeviceType,
  EMagistralType,
  HousingMeteringDeviceReadingsIncludingPlacementResponse,
  PipeNodeResponse,
} from 'myApi';
import { getFilledArray } from 'utils/getFilledArray';
import { MeteringDeviceReadingWithEmpties } from './housingMeteringDeviceReadingsService.types';

export const groupWithEmptyReadings = (
  allReadings: HousingMeteringDeviceReadingsIncludingPlacementResponse[],
  deviceIds: { [key in EMagistralType]: number | null }
) => {
  const sortedReadingsDictionary = _.groupBy(
    allReadings,
    (reading) => `${reading.year} ${reading.month}`
  );

  const sortedReadingsDates = Object.keys(
    sortedReadingsDictionary
  ).sort((first, second) =>
    moment(first, 'YYYY MMMM').diff(moment(second, 'YYYY MMMM'), 'month')
  );

  const { FeedBackFlow: feedBackFlowId, FeedFlow: feedFlowId } = deviceIds;

  if (!feedFlowId) {
    return [];
  }

  let firstReadingDate = moment(sortedReadingsDates[0], 'YYYY MMMM');

  if (!firstReadingDate.isValid()) {
    firstReadingDate = moment();
  }

  const diff = moment(firstReadingDate, 'YYYY MMMM').diff(moment(), 'month');

  const readingsWithEmpty = getFilledArray(Math.abs(diff) + 1, (index) => {
    const year = moment()
      .add(diff + index, 'month')
      .format('YYYY');
    const month = moment()
      .add(diff + index, 'month')
      .format('MMMM');
    const date = `${year} ${month}`;

    const readings: MeteringDeviceReadingWithEmpties[] =
      sortedReadingsDictionary[date] || [];

    if (readings.length === 0) {
      readings.push({
        value: null,
        previousReadingsId: null,
        magistralType: EMagistralType.FeedFlow,
        id: null,
        deviceId: feedFlowId,
        year,
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
        year,
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
    readings: MeteringDeviceReadingWithEmpties[];
  }[]
) => {
  const groupedReadingsByYear = _.groupBy(
    yearReadings,
    (readings) => readings.year
  );

  const groupedReadingsByMonth = Object.entries(groupedReadingsByYear).map(
    ([year, yearReadings]) => ({
      year,
      readings: _.reverse(yearReadings),
    })
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
      device.housingMeteringDeviceType === EHousingMeteringDeviceType.FlowMeter
  );
  const feedBackFlowDevice = feedBackFlowDevices.find(
    (device) =>
      device.housingMeteringDeviceType === EHousingMeteringDeviceType.FlowMeter
  );

  return {
    [EMagistralType.FeedBackFlow]: feedBackFlowDevice?.id || null,
    [EMagistralType.FeedFlow]: feedFlowDevice?.id || null,
    [EMagistralType.Recharge]: null,
  };
};

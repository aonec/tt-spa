import moment from 'moment';
import { SwitchIndividualDeviceReadingsCreateRequest } from 'myApi';

export const getPreparedReadingsOfIndividualDevice = (
  item: SwitchIndividualDeviceReadingsCreateRequest & {
    id?: number;
  },
) => {
  const { readingDate, value1, value2, value3, value4 } = item;

  return {
    readingDate: moment(readingDate)
      .add(1, 'month')
      .utcOffset(0, true)
      .toISOString(),
    value1: Number(value1),
    value2: Number(value2) || null,
    value3: Number(value3) || null,
    value4: Number(value4) || null,
  };
};

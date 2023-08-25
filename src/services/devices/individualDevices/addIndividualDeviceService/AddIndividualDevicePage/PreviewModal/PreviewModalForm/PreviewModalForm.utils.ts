import moment from 'moment';
import { IndividualDeviceMountPlaceListResponse } from 'api/types';

export const getMountPlaceById = (
  id: number | null,
  places: IndividualDeviceMountPlaceListResponse[] | null,
): string | null => {
  if (!id || !places) return null;

  return places.find((elem) => elem.id === id)?.description || null;
};

export const getDate = (dateString: string | null) => {
  if (!dateString) return null;

  const date = moment(dateString);

  if (!date.isValid) return null;

  return date.format('DD.MM.YYYY');
};

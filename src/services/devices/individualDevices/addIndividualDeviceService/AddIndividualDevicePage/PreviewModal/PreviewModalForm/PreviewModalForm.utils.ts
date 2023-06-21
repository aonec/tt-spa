import moment from 'moment';
import { IndividualDeviceMountPlaceListResponse } from 'myApi';

export function getMountPlaceById(
  id: number | null,
  places: IndividualDeviceMountPlaceListResponse[] | null,
): string | null {
  if (!id || !places) return null;

  return places.find((elem) => elem.id === id)?.description || null;
}

export function toArray<T>(
  obj: object,
  setName: boolean = true,
): (T & { __name__?: string })[] {
  const arr = Object.keys(obj).map((name) => {
    const value = (obj as any)[name];
    if (!setName) return value;

    const res = {
      ...value,
    };

    if (setName) {
      res.__name__ = name;
    }

    return res;
  });

  return arr;
}

export const getDate = (dateString: string | null) => {
  if (!dateString) return null;

  const date = moment(dateString);

  if (!date.isValid) return null;

  return date.format('DD.MM.YYYY');
};

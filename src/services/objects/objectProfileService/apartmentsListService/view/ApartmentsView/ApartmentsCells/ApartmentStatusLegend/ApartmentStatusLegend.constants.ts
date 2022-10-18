import { ApartmentTaskStatus } from './ApartmentStatusLegend.types';

export const ApartmentTaskStatusColosLookup: {
  [key in ApartmentTaskStatus]: string;
} = {
  Performed: '#17B45A',
  Overdue: '#FF8C68',
};

export const ApartmentTaskStatusNamesLookup: {
  [key in ApartmentTaskStatus]: string;
} = {
  Performed: 'Квартира с активной задачей',
  Overdue: 'Квартира с просроченной задачей',
};

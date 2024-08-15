import { NodeStatusType } from 'api/mvitu.types';

export const NodeIntegrationStatusNamesLookup: {
  [key in keyof typeof NodeStatusType]: string;
} = {
  [NodeStatusType.Active]: 'Активно',
  [NodeStatusType.Paused]: 'На паузе',
};

// export const NodeIntegrationStatusIconsLookup: {
//   [key in keyof typeof NodeStatusType]: string;
// } = {
//   [NodeStatusType.Active]: <ChevronIc,
//   [NodeStatusType.Paused]: 'На паузе',
// };

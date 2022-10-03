import { ActionComponentProps } from './../TaskActionsPanel.types';

export type InputReadingsProps = ActionComponentProps;

export type Reading = {
  value1?: number | null;
  value2?: number | null;
  value3?: number | null;
  value4?: number | null;
  deviceId: number;
  readingDate: string;
};

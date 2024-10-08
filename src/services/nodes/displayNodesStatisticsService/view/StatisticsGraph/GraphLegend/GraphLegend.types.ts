export type GraphLegendProps = {
  graphParam: string;
  isTasksExist: boolean;
  deltaMassAccuracy?: number | null;
  averageDeltaMass?: number | null;
  resource?: string | null;
  withFault: boolean;
  setWithFault: (withFault: boolean) => void;
};

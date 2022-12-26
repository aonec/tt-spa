export type TaskPointProps = {
  datum?: {
    x: number;
    y: number;
    isEmergency: boolean;
    isAllActive: boolean;
  };
  scale?: {
    y: (y: number) => number;
    x: (x: number) => number;
  };
};

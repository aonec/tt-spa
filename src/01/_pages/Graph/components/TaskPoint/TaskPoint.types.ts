export type TaskPointProps = {
  datum?: {
    x: number;
    y: number;
    isEmergency: boolean;
  };
  scale?: {
    y: (y: number) => number;
    x: (x: number) => number;
  };
};

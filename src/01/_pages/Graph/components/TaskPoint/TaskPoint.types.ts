export type TaskPointProps = {
  datum?: {
    x: number;
    y: number;
    isEmergency: boolean;
    isAllActive: boolean;
    amount: number;
    tasksInfo: { id: number; title: string }[];
  };
  scale?: {
    y: (y: number) => number;
    x: (x: number) => number;
  };
};

export type TaskPointProps = {
  datum?: {
    x: number;
    y: number;
    isEmergency: boolean;
    isAllActive: boolean;
    amount: number;
    tasksInfo: NodeStatisticTaskInfo[];
  };
  scale?: {
    y: (y: number) => number;
    x: (x: number) => number;
  };
};

export type NodeStatisticTaskInfo = {
  id: number;
  title: string | null;
};

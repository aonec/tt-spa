export type TimeLineProps = {
  timeline: Timeline;
  isShowInfo?: boolean;
};

export type Timeline = {
  deadlineDate: string;
  remainingTime: string;
  timelineStyle: {
    color: string;
    width: string;
  };
  isFailed?: boolean;
};

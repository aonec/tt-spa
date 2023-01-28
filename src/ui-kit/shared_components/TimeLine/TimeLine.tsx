import React, { FC } from 'react';
import { Line, TimeLineSC, TimeLineWrapper, TimeWrapper } from './TimeLine.styled';
import { TimeLineProps } from './TimeLine.types';

export const TimeLine: FC<TimeLineProps> = ({timeline}) => {
  return (
    <TimeLineWrapper>
      <TimeLineSC>
        <Line
          width={timeline.timelineStyle.width}
          background={timeline.timelineStyle.color}
        />
      </TimeLineSC>
      <TimeWrapper fail={timeline.isFailed}>
        {timeline.remainingTime}
      </TimeWrapper>
      <TimeWrapper>{timeline.deadlineDate}</TimeWrapper>
    </TimeLineWrapper>
  );
};

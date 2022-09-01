import React, { FC } from 'react';
import { IconLookup } from './Timer.constants';
import { TimeWrapper, Wrapper } from './Timer.styled';
import { TimerClosingStatus, TimerProps } from './Timer.types';

export const Timer: FC<TimerProps> = ({ timer }) => {
  const Icon = IconLookup.find((elem) => elem.icon === timer?.icon)?.element;
  const taskIsFailed = timer?.closingStatus === TimerClosingStatus.Overdue;

  return (
    <Wrapper>
      {Icon && <Icon />}
      <TimeWrapper className="status" fail={taskIsFailed}>
        {timer.statusDescription}
      </TimeWrapper>
      {!taskIsFailed && (
        <TimeWrapper fail={timer.stage?.isFailed}>
          {timer.stage?.remainingTime || timer?.executionTime}
        </TimeWrapper>
      )}
      <TimeWrapper fail={taskIsFailed}>
        {timer.stage?.deadlineDate || timer?.diffTime}
      </TimeWrapper>
    </Wrapper>
  );
};

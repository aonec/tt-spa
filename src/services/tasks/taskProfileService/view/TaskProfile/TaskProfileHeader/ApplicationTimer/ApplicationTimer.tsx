import React, { FC } from 'react';
import { TimeWrapper, Wrapper } from './ApplicationTimer.styled';
import { ApplicationTimerProps } from './ApplicationTimer.types';
import { IconLookup } from 'ui-kit/shared/Timer/Timer.constants';
import { TimerClosingStatus } from 'ui-kit/shared/Timer/Timer.types';

export const ApplicationTimer: FC<ApplicationTimerProps> = ({ timer }) => {
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

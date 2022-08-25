import React, { FC } from 'react';
import { IconLookup } from './Timer.constants';
import { TimeWrapper, Wrapper } from './Timer.styled';
import { TimerProps } from './Timer.types';

export const Timer: FC<TimerProps> = ({ timer }) => {
  const Icon = IconLookup.find((elem) => elem.icon === timer?.icon)?.element;

  return (
    <Wrapper>
      {Icon && <Icon />}
      <TimeWrapper className="status" fail={timer?.isFailed}>
        {timer.statusDescription}
      </TimeWrapper>
      {!timer?.isFailed && (
        <TimeWrapper fail={timer.stage?.isFailed}>
          {timer.stage?.remainingTime || timer?.executionTime}
        </TimeWrapper>
      )}
      <TimeWrapper fail={timer?.isFailed}>
        {timer.stage?.deadlineDate || timer?.diffTime}
      </TimeWrapper>
    </Wrapper>
  );
};

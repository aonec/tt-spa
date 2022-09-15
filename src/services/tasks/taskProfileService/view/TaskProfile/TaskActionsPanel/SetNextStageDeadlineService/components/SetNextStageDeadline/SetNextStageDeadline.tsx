import React, { FC } from 'react';
import { Wrapper } from './SetNextStageDeadline.styled';
import { SetNextStageDeadlineProps } from './SetNextStageDeadline.types';

export const SetNextStageDeadline: FC<SetNextStageDeadlineProps> = ({
  deniedPermissionsCount,
}) => {
  return (
    <Wrapper>
      <div>Переназначение даты проверки</div>
      <div>Количество недопусков: {deniedPermissionsCount}</div>
    </Wrapper>
  );
};
